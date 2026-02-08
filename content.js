// CWT Content Script - Runs on WhatsApp Web
(function() {
  'use strict';

  console.log('CWT: Content script loaded');

  // Export functionality
  class WhatsAppExporter {
    constructor() {
      this.messages = [];
      this.mediaFiles = [];
      this.chatName = '';
    }

    // Extract chat name
    getChatName() {
      const headerTitle = document.querySelector('header [data-testid="conversation-info-header"]');
      if (headerTitle) {
        const nameElement = headerTitle.querySelector('span[dir="auto"]');
        return nameElement ? nameElement.textContent.trim() : 'Unknown Chat';
      }
      return 'Unknown Chat';
    }

    // Extract all messages from the current chat
    async extractMessages() {
      this.chatName = this.getChatName();
      this.messages = [];
      this.mediaFiles = [];

      const messageContainer = document.querySelector('[data-testid="conversation-panel-messages"]');
      if (!messageContainer) {
        throw new Error('No active chat found. Please open a chat first.');
      }

      // Scroll to load all messages
      await this.scrollToLoadAll(messageContainer);

      // Get all message elements
      const messageElements = messageContainer.querySelectorAll('[data-testid="msg-container"]');
      
      for (const msgEl of messageElements) {
        const message = this.parseMessage(msgEl);
        if (message) {
          this.messages.push(message);
        }
      }

      return {
        chatName: this.chatName,
        messages: this.messages,
        mediaFiles: this.mediaFiles
      };
    }

    // Scroll to load all messages
    async scrollToLoadAll(container) {
      const scrollableElement = container.closest('[data-testid="conversation-panel-body"]');
      if (!scrollableElement) return;

      let previousHeight = 0;
      let currentHeight = scrollableElement.scrollHeight;
      let attempts = 0;
      const maxAttempts = 50;
      let noChangeCount = 0;

      while (previousHeight !== currentHeight && attempts < maxAttempts) {
        previousHeight = currentHeight;
        scrollableElement.scrollTop = 0;
        
        // Dynamic delay: longer if content is loading, shorter if no change
        const delay = noChangeCount > 2 ? 300 : 500;
        await new Promise(resolve => setTimeout(resolve, delay));
        
        currentHeight = scrollableElement.scrollHeight;
        
        // Track consecutive no-change iterations for early exit
        if (currentHeight === previousHeight) {
          noChangeCount++;
          if (noChangeCount >= 3) break; // Exit early if no change for 3 iterations
        } else {
          noChangeCount = 0;
        }
        
        attempts++;
      }
    }

    // Parse individual message
    parseMessage(msgEl) {
      const message = {
        sender: this.getSender(msgEl),
        timestamp: this.getTimestamp(msgEl),
        text: this.getMessageText(msgEl),
        type: 'text',
        media: null
      };

      // Check for media
      const media = this.getMedia(msgEl);
      if (media) {
        message.type = media.type;
        message.media = media;
        this.mediaFiles.push(media);
      }

      return message;
    }

    // Get sender name
    getSender(msgEl) {
      const isOutgoing = msgEl.classList.contains('message-out') || 
                        msgEl.closest('.message-out');
      
      if (isOutgoing) {
        return 'You';
      }

      const senderElement = msgEl.querySelector('[data-testid="msg-meta"] span[dir="auto"]') ||
                           msgEl.querySelector('._11JPr');
      
      return senderElement ? senderElement.textContent.trim() : 'Unknown';
    }

    // Get timestamp
    getTimestamp(msgEl) {
      const timeElement = msgEl.querySelector('[data-testid="msg-meta"] span[aria-label]');
      return timeElement ? timeElement.getAttribute('aria-label') : new Date().toISOString();
    }

    // Get message text
    getMessageText(msgEl) {
      const textElements = msgEl.querySelectorAll('span.selectable-text');
      let text = '';
      
      for (const el of textElements) {
        const content = el.textContent.trim();
        if (content) {
          text += content + ' ';
        }
      }

      return text.trim();
    }

    // Get media from message
    getMedia(msgEl) {
      // Check for image
      const img = msgEl.querySelector('img[src*="blob:"]');
      if (img) {
        return {
          type: 'image',
          src: img.src,
          alt: img.alt || 'Image'
        };
      }

      // Check for video
      const video = msgEl.querySelector('video[src*="blob:"]');
      if (video) {
        return {
          type: 'video',
          src: video.src,
          poster: video.poster || ''
        };
      }

      // Check for audio
      const audio = msgEl.querySelector('audio[src*="blob:"]');
      if (audio) {
        return {
          type: 'audio',
          src: audio.src
        };
      }

      // Check for document
      const docLink = msgEl.querySelector('[data-testid="media-download"]');
      if (docLink) {
        return {
          type: 'document',
          name: msgEl.querySelector('span[title]')?.title || 'Document'
        };
      }

      return null;
    }

    // Export to HTML format
    exportToHTML() {
      let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.chatName} - WhatsApp Export</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: #e5ddd5; }
    .header { text-align: center; margin-bottom: 30px; }
    .message { margin: 10px 0; padding: 10px; border-radius: 8px; max-width: 70%; }
    .message-out { background: #dcf8c6; margin-left: auto; }
    .message-in { background: white; margin-right: auto; }
    .sender { font-weight: bold; color: #075e54; margin-bottom: 5px; }
    .timestamp { font-size: 0.8em; color: #667781; margin-top: 5px; }
    .text { margin: 5px 0; word-wrap: break-word; }
    .media { margin: 10px 0; max-width: 100%; }
    .media img, .media video { max-width: 100%; border-radius: 5px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${this.chatName}</h1>
    <p>Exported with CWT - Can's WhatsApp Tool</p>
    <p>Total Messages: ${this.messages.length}</p>
  </div>
  <div class="messages">`;

      for (const msg of this.messages) {
        const messageClass = msg.sender === 'You' ? 'message-out' : 'message-in';
        html += `
    <div class="message ${messageClass}">
      <div class="sender">${msg.sender}</div>
      <div class="text">${this.escapeHtml(msg.text)}</div>`;

        if (msg.media) {
          html += `<div class="media">`;
          if (msg.media.type === 'image') {
            html += `<img src="${msg.media.src}" alt="${msg.media.alt}">`;
          } else if (msg.media.type === 'video') {
            html += `<video controls src="${msg.media.src}" poster="${msg.media.poster}"></video>`;
          } else if (msg.media.type === 'audio') {
            html += `<audio controls src="${msg.media.src}"></audio>`;
          } else if (msg.media.type === 'document') {
            html += `<p>📎 ${msg.media.name}</p>`;
          }
          html += `</div>`;
        }

        html += `
      <div class="timestamp">${msg.timestamp}</div>
    </div>`;
      }

      html += `
  </div>
</body>
</html>`;

      return html;
    }

    // Export to TXT format
    exportToTXT() {
      let txt = `${this.chatName}\n`;
      txt += `Exported with CWT - Can's WhatsApp Tool\n`;
      txt += `Total Messages: ${this.messages.length}\n`;
      txt += `${'='.repeat(50)}\n\n`;

      for (const msg of this.messages) {
        txt += `[${msg.timestamp}] ${msg.sender}:\n`;
        txt += `${msg.text}\n`;
        
        if (msg.media) {
          txt += `[${msg.media.type.toUpperCase()}`;
          if (msg.media.name) txt += `: ${msg.media.name}`;
          txt += `]\n`;
        }
        
        txt += `\n`;
      }

      return txt;
    }

    // Export to JSON format
    exportToJSON() {
      return JSON.stringify({
        chatName: this.chatName,
        exportDate: new Date().toISOString(),
        totalMessages: this.messages.length,
        messages: this.messages.map(msg => ({
          sender: msg.sender,
          timestamp: msg.timestamp,
          text: msg.text,
          type: msg.type,
          media: msg.media ? {
            type: msg.media.type,
            name: msg.media.name,
            alt: msg.media.alt
          } : null
        }))
      }, null, 2);
    }

    // Escape HTML special characters
    escapeHtml(text) {
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }
  }

  // Listen for export requests
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'export') {
      const exporter = new WhatsAppExporter();
      
      exporter.extractMessages()
        .then(data => {
          let content = '';
          let filename = `${data.chatName.replace(/[^a-z0-9]/gi, '_')}_export`;
          let mimeType = 'text/plain';

          if (request.format === 'html') {
            content = exporter.exportToHTML();
            filename += '.html';
            mimeType = 'text/html';
          } else if (request.format === 'txt') {
            content = exporter.exportToTXT();
            filename += '.txt';
            mimeType = 'text/plain';
          } else if (request.format === 'json') {
            content = exporter.exportToJSON();
            filename += '.json';
            mimeType = 'application/json';
          }

          sendResponse({
            success: true,
            content: content,
            filename: filename,
            mimeType: mimeType,
            messageCount: data.messages.length
          });
        })
        .catch(error => {
          sendResponse({
            success: false,
            error: error.message
          });
        });

      return true; // Keep channel open for async response
    }
  });

  // Add export button to WhatsApp Web UI
  function addExportButton() {
    const header = document.querySelector('header[data-testid="conversation-header"]');
    if (!header || document.getElementById('cwt-export-btn')) return;

    const button = document.createElement('button');
    button.id = 'cwt-export-btn';
    button.textContent = '📥 Export';
    button.style.cssText = `
      padding: 8px 12px;
      margin: 0 10px;
      background: #00a884;
      color: white;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    `;
    
    button.addEventListener('click', () => {
      chrome.runtime.sendMessage({ action: 'openPopup' });
    });

    header.appendChild(button);
  }

  // Throttle function to limit call frequency
  let addButtonTimeout = null;
  function throttledAddExportButton() {
    if (addButtonTimeout) return;
    addButtonTimeout = setTimeout(() => {
      addExportButton();
      addButtonTimeout = null;
    }, 1000); // Only check once per second
  }

  // Wait for WhatsApp to load and add button - observe specific header area
  const targetNode = document.querySelector('div[id="app"]') || document.body;
  const observer = new MutationObserver(() => {
    throttledAddExportButton();
  });

  observer.observe(targetNode, {
    childList: true,
    subtree: true
  });

  // Try to add button immediately
  setTimeout(addExportButton, 2000);
})();
