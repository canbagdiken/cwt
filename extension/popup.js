const statusDiv = document.getElementById('status');
const chatListDiv = document.getElementById('chatList');

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

function renderChats(chats) {
    chatListDiv.innerHTML = "";
    if (chats.length === 0) {
        statusDiv.textContent = "No chats found.";
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
    statusDiv.textContent = `${chats.length} chats listed.`;
}

chrome.runtime.onMessage.addListener((message) => {
    if (message.request === "getChats") {
        renderChats(message.data);
    } else if (message.request === "statusUpdate") {
        statusDiv.textContent = message.data;
    }
});