(function() {
    if (window.SimpleBridgeLoaded) return;
    window.SimpleBridgeLoaded = true;

    class SimpleBridge {
        constructor() {
            this.waitForWPP();
        }

        waitForWPP() {
            let attempt = 0;
            const maxAttempts = 60;
            
            const interval = setInterval(async () => {
                attempt++;
                
                if (window.WPP && window.WPP.isReady) {
                    clearInterval(interval);
                    this.waitForComponents();
                    return;
                }
                
                if (attempt >= maxAttempts) {
                    clearInterval(interval);
                    console.error('[CWT] WPP not ready after 60 seconds');
                }
            }, 1000);
        }

        waitForComponents() {
            const uzipReady = typeof window.UZIP !== 'undefined';
            const exporterReady = typeof window.WAExporter !== 'undefined';
            const wppChatReady = typeof window.WPP.chat !== 'undefined';

            if (uzipReady && exporterReady && wppChatReady) {
                this.init();
            } else {
                setTimeout(() => this.waitForComponents(), 500);
            }
        }

        init() {
            window.addEventListener("message", async (event) => {
                if (event.source !== window || event.data.type !== "WACB_FROM_CONTENT_SCRIPT") return;
                
                const payload = event.data.message || {};
                const { request, chatId } = payload;

                if (request === "getChats") await this.handleGetChats();
                else if (request === "downloadChat") await this.handleDownloadChat(chatId);
            });
        }

        async handleGetChats() {
            try {
                const chats = await WPP.chat.list();
                
                // Açık olan chat'i tespit et
                let activeChatId = null;
                try {
                    const activeChat = await WPP.chat.getActiveChat();
                    if (activeChat && activeChat.id) {
                        activeChatId = activeChat.id._serialized || activeChat.id;
                    }
                } catch (e) {
                    console.log('[CWT] No active chat detected');
                }

                const processedChats = chats.map(c => {
                    const contact = c.contact || {};
                    let name = contact.name || contact.formattedName || contact.pushname || c.name;
                    let rawId = c.id._serialized || c.id;
                    let phone = rawId.split('@')[0];
                    if (!name) name = phone;
                    return { name: name, id: rawId, phone: phone };
                });
                
                this.sendBack({ request: "getChats", data: processedChats, activeChatId: activeChatId });
                
            } catch (e) {
                console.error("Sohbet listesi hatası:", e);
                this.sendBack({ request: "statusUpdate", data: "Liste alınamadı: " + e.message });
            }
        }

        async handleDownloadChat(chatId) {
            this.sendBack({ request: "statusUpdate", data: "Preparing..." });

            try {
                const chat = WPP.chat.get(chatId);
                const contact = WPP.contact.get(chatId);
                
                let chatTitle = chat.formattedTitle || contact?.name || contact?.formattedName || "WhatsApp Chat";
                if (chatTitle.includes('@lid') || chatTitle.includes('@c.us')) chatTitle = "Unknown Chat";

                const safeFileName = chatTitle.replace(/[^a-z0-9çğıöşüÇĞİÖŞÜ \-]/gi, '').trim() || "Yedek";
                const msgs = await WPP.chat.getMessages(chatId, { count: -1 });
                const isGroup = chat.isGroup;
                
                const exporter = new window.WAExporter();
                const totalMedia = msgs.filter(m => m && ['image', 'video', 'audio', 'document', 'sticker', 'ptt'].includes(m.type)).length;
                const cleanMessages = [];
                
                let txtContent = `Sohbet: ${chatTitle}\nTarih: ${new Date().toLocaleString()}\n------------------------------------------------\n\n`;
                let htmlBodyContent = "";
                let mediaCount = 0;

                for (const msg of msgs) {
                    try {
                        if (!msg || !msg.id) continue;
                        if (['e2e_notification', 'ciphertext', 'protocol', 'gp2', 'revoked'].includes(msg.type)) continue;

                        const idStr = (typeof msg.id === 'object') ? msg.id._serialized : msg.id;
                        const isMe = idStr.startsWith("true_") || msg.fromMe;
                        
                        let senderName = "Unknown";
                        if (isMe) senderName = "Me";
                        else {
                            if (!isGroup) senderName = chatTitle; 
                            else {
                                if (msg.pushname) senderName = msg.pushname;
                                else {
                                    const authorId = msg.author || msg.from;
                                    if (authorId) {
                                        try {
                                            const authorContact = WPP.contact.get(authorId);
                                            senderName = authorContact?.name || authorContact?.pushname || authorContact?.formattedName || "Member";
                                        } catch (err) { senderName = "Member"; }
                                    }
                                }
                            }
                        }

                        const timeStr = new Date(msg.t * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        let msgBody = msg.body || "";
                        let mediaHtml = "";
                        let mediaTxt = "";
                        let localMediaFileName = null;

                        if (['image', 'video', 'audio', 'document', 'sticker', 'ptt'].includes(msg.type)) {
                            mediaCount++;
                            if (mediaCount % 10 === 0) this.sendBack({ request: "statusUpdate", data: `Media: ${mediaCount}/${totalMedia}` });

                            try {
                                const blob = await this.downloadMedia(idStr);
                                if (blob) {
                                    let ext = (blob.type || "").split('/')[1]?.split(';')[0] || 'bin';
                                    if (msg.type === 'sticker') ext = 'webp';
                                    const simpleName = `${mediaCount}.${ext}`;
                                    localMediaFileName = `media/${simpleName}`;
                                    
                                    exporter.addFile(localMediaFileName, new Uint8Array(await blob.arrayBuffer()));
                                    mediaTxt = ` [File: ${simpleName}]`;

                                    if (['jpg', 'jpeg', 'png'].includes(ext)) 
                                        mediaHtml = `<div class="media-box"><img src="${localMediaFileName}" loading="lazy"></div>`;
                                    else if (ext === 'webp') 
                                        mediaHtml = `<div class="media-box"><img src="${localMediaFileName}" class="sticker" loading="lazy"></div>`;
                                    else if (ext === 'mp4') 
                                        mediaHtml = `<div class="media-box"><video controls src="${localMediaFileName}"></video></div>`;
                                    else 
                                        mediaHtml = `<a href="${localMediaFileName}" target="_blank" class="file-link">📁 File: ${simpleName}</a>`;
                                }
                            } catch {
                                mediaTxt = " [Media Error]";
                            }
                        }

                        txtContent += `[${timeStr}] ${senderName}: ${msgBody}${mediaTxt}\n`;

                        const showNameInBubble = isGroup && !isMe;
                        const nameHtml = showNameInBubble ? `<span class="sender-name">${senderName}</span>` : '';
                        
                        htmlBodyContent += `
                            <div class="msg ${isMe ? 'me' : 'other'}">
                                ${nameHtml}
                                <span>${msgBody.replace(/\n/g, '<br>')}</span>
                                ${mediaHtml}
                                <span class="time">${timeStr}</span>
                                <div class="clear"></div>
                            </div>`;
                        
                        let replyId = null;
                        try { replyId = msg.quotedMsgId; } catch(e) {}

                        cleanMessages.push({
                            id: idStr,
                            timestamp: msg.t,
                            date: new Date(msg.t * 1000).toISOString(),
                            type: msg.type,
                            fromMe: isMe,
                            senderName: senderName,
                            content: msgBody,
                            attachment: localMediaFileName,
                            replyTo: replyId
                        });

                    } catch (loopErr) {
                        console.error("Message error:", loopErr);
                    }
                    
                    await this.sleep(1);
                }

                exporter.addFile(`${safeFileName}.txt`, txtContent);
                exporter.addFile(`${safeFileName}.html`, exporter.getHtmlTemplate(chatTitle, htmlBodyContent));
                exporter.addFile(`messages.json`, JSON.stringify(cleanMessages, null, 2));
                exporter.addFile(`info.json`, JSON.stringify({
                    id: chatId,
                    name: chatTitle,
                    isGroup: isGroup,
                    exportDate: new Date().toISOString(),
                    totalMessages: msgs.length,
                    totalMedia: totalMedia
                }, null, 2));

                this.sendBack({ request: "statusUpdate", data: "Packaging..." });
                await exporter.saveAsZip(`${safeFileName}_cwtbackup.zip`);
                this.sendBack({ request: "statusUpdate", data: "Export Complete!" });

            } catch (e) {
                console.error("Critical Error:", e);
                this.sendBack({ request: "statusUpdate", data: "General Error: " + e.message });
            }
        }

        async downloadMedia(messageId) {
            try {
                return await Promise.race([
                    WPP.chat.downloadMedia(messageId),
                    new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 5000))
                ]);
            } catch { return null; }
        }

        sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

        sendBack(payload) { window.postMessage({ type: "WACB_FROM_WEB_RESOURCE", message: payload }, "*"); }
    }

    new SimpleBridge();

})();