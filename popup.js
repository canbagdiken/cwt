// Popup script for CWT
(function() {
  'use strict';

  let selectedFormat = 'html';

  // Format button selection
  const formatButtons = document.querySelectorAll('.format-btn');
  formatButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      formatButtons.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedFormat = btn.dataset.format;
    });
  });

  // Export button
  const exportBtn = document.getElementById('exportBtn');
  const statusDiv = document.getElementById('status');
  const loadingDiv = document.getElementById('loading');

  exportBtn.addEventListener('click', async () => {
    try {
      // Disable button and show loading
      exportBtn.disabled = true;
      loadingDiv.style.display = 'block';
      statusDiv.style.display = 'none';

      // Get active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      // Check if we're on WhatsApp Web - use proper URL parsing
      const isWhatsAppWeb = tab.url && (
        tab.url.startsWith('https://web.whatsapp.com/') ||
        tab.url === 'https://web.whatsapp.com'
      );
      
      if (!isWhatsAppWeb) {
        showStatus('error', 'Please open WhatsApp Web first!');
        exportBtn.disabled = false;
        loadingDiv.style.display = 'none';
        return;
      }

      // Send export request to content script
      chrome.tabs.sendMessage(tab.id, {
        action: 'export',
        format: selectedFormat
      }, (response) => {
        loadingDiv.style.display = 'none';
        exportBtn.disabled = false;

        if (chrome.runtime.lastError) {
          showStatus('error', 'Error: ' + chrome.runtime.lastError.message);
          return;
        }

        if (response && response.success) {
          // Download the exported file
          downloadFile(response.content, response.filename, response.mimeType);
          showStatus('success', `✅ Successfully exported ${response.messageCount} messages!`);
        } else {
          showStatus('error', response ? response.error : 'Export failed');
        }
      });
    } catch (error) {
      loadingDiv.style.display = 'none';
      exportBtn.disabled = false;
      showStatus('error', 'Error: ' + error.message);
    }
  });

  function showStatus(type, message) {
    statusDiv.className = `status ${type}`;
    statusDiv.textContent = message;
    statusDiv.style.display = 'block';

    if (type === 'success') {
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
    }
  }

  function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    
    chrome.downloads.download({
      url: url,
      filename: filename,
      saveAs: true
    }, (downloadId) => {
      // Check for errors
      if (chrome.runtime.lastError) {
        console.error('Download failed:', chrome.runtime.lastError);
        showStatus('error', 'Download failed: ' + chrome.runtime.lastError.message);
      } else {
        console.log('Download started with ID:', downloadId);
      }
      // Revoke the blob URL to free memory
      URL.revokeObjectURL(url);
    });
  }

  // Check if we're on WhatsApp Web on load
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    const isWhatsAppWeb = tab.url && (
      tab.url.startsWith('https://web.whatsapp.com/') ||
      tab.url === 'https://web.whatsapp.com'
    );
    
    if (!isWhatsAppWeb) {
      showStatus('info', 'ℹ️ Please navigate to web.whatsapp.com to export chats');
    }
  });
})();
