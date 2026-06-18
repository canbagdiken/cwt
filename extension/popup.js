const statusDiv = document.getElementById('status');
const chatListDiv = document.getElementById('chatList');
const searchBox = document.getElementById('searchBox');
let allChats = [];

// Popup açıldığında kayıtlı chatler'i yükle
chrome.storage.local.get(['cachedChats'], (result) => {
    if (result.cachedChats && result.cachedChats.length > 0) {
        allChats = result.cachedChats;
        searchBox.style.display = 'block';
        renderChats(allChats);
        statusDiv.textContent = `${allChats.length} cached chats loaded.`;
    }
});

document.getElementById('btnGet').addEventListener('click', () => {
    statusDiv.innerHTML = "Loading chats... <br><small>(Check F12 Console for details)</small>";
    sendMessageToContent({ request: "getChats" });
});

function sendMessageToContent(msg) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, msg).catch(err => {
                statusDiv.textContent = "Error: Please refresh the page and try again.";
                console.error(err);
            });
        }
    });
}

function renderChats(chats, isFiltered = false) {
    chatListDiv.innerHTML = "";
    if (chats.length === 0) {
        statusDiv.textContent = isFiltered ? "No matching chats." : "No chats found.";
        return;
    }

    chats.forEach(chat => {
        const div = document.createElement('div');
        div.className = 'chat-item';
        div.innerHTML = `
            <div class="chat-info">
                <span class="chat-name">${chat.name}</span>
                <span class="chat-id">${chat.phone}</span>
            </div>
            <button class="download-btn">EXPORT</button>
        `;

        div.addEventListener('click', () => {
            statusDiv.textContent = `⏳ Preparing ${chat.name}...`;
            const allItems = document.querySelectorAll('.chat-item');
            allItems.forEach(i => i.classList.remove('active'));
            div.classList.add('active');

            sendMessageToContent({ request: "downloadChat", chatId: chat.id });
        });

        chatListDiv.appendChild(div);
    });
    
    if (!isFiltered) {
        statusDiv.textContent = `${chats.length} chats listed.`;
    } else {
        statusDiv.textContent = `${chats.length} of ${allChats.length} chats shown.`;
    }
}

searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
        renderChats(allChats);
        return;
    }
    const filtered = allChats.filter(chat => 
        chat.name.toLowerCase().includes(query) || 
        chat.phone.toLowerCase().includes(query)
    );
    renderChats(filtered, true);
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.request === "getChats") {
        allChats = message.data;
        
        // Açık olan chat'i en üste taşı
        if (message.activeChatId) {
            const activeIndex = allChats.findIndex(chat => chat.id === message.activeChatId);
            if (activeIndex > 0) {
                const activeChat = allChats.splice(activeIndex, 1)[0];
                allChats.unshift(activeChat);
            }
        }
        
        searchBox.style.display = allChats.length > 0 ? 'block' : 'none';
        searchBox.value = '';
        renderChats(allChats);
        // Chatler'i storage'a kaydet
        chrome.storage.local.set({ cachedChats: allChats });
    } else if (message.request === "statusUpdate") {
        statusDiv.textContent = message.data;
    }
});