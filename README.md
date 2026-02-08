# CWT - Can's WhatsApp Tool

![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Privacy](https://img.shields.io/badge/privacy-100%25%20local-brightgreen.svg)

A powerful and privacy-focused Chrome extension that allows you to export your WhatsApp Web conversations in multiple formats with all media files included.

## ✨ Features

- 📥 **Export to Multiple Formats**: HTML, TXT, and JSON
- 🖼️ **Full Media Support**: Images, videos, audio files, and documents
- 🔒 **100% Privacy-Focused**: All processing happens locally in your browser
- 🚫 **No Tracking**: Zero data collection, no analytics, no external servers
- 🎨 **Beautiful HTML Export**: Styled exports that look like WhatsApp
- ⚡ **Fast & Efficient**: Optimized message extraction and export
- 🌐 **Open Source**: Fully transparent and auditable code

## 🚀 Installation

### From Chrome Web Store (Coming Soon)
1. Visit the Chrome Web Store
2. Search for "CWT - Can's WhatsApp Tool"
3. Click "Add to Chrome"

### Manual Installation (Developer Mode)
1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top right)
4. Click "Load unpacked"
5. Select the CWT directory
6. The extension is now installed!

## 📖 How to Use

1. **Open WhatsApp Web**: Navigate to [web.whatsapp.com](https://web.whatsapp.com)
2. **Select a Chat**: Open the conversation you want to export
3. **Click Export**: Either click the "📥 Export" button in the chat header or click the CWT extension icon
4. **Choose Format**: Select your preferred export format (HTML, TXT, or JSON)
5. **Export**: Click "Export Current Chat" and choose where to save the file

## 📋 Export Formats

### HTML Format
- Beautiful, styled export that looks like WhatsApp
- Includes all messages with timestamps and sender names
- Embedded media (images, videos, audio)
- Perfect for archiving and viewing

### TXT Format
- Plain text format for easy reading
- Messages with timestamps and senders
- Media files are noted with type and filename
- Great for searching and processing

### JSON Format
- Structured data format
- Complete message metadata
- Easy to parse and import into other tools
- Ideal for developers and data analysis

## 🔐 Privacy & Security

**Your privacy is our top priority:**

- ✅ All data processing happens **locally** in your browser
- ✅ **No external servers** are contacted
- ✅ **No data collection** of any kind
- ✅ **No tracking or analytics**
- ✅ **No permissions** beyond what's necessary
- ✅ **Open source** - audit the code yourself

The extension only requires:
- Access to `web.whatsapp.com` to read your chat content
- Download permission to save your exported files

## 🛠️ Technical Details

### Permissions
- `activeTab`: To access the current WhatsApp Web tab
- `downloads`: To save exported files to your computer
- `host_permissions` for `web.whatsapp.com`: To interact with WhatsApp Web

### How It Works
1. The content script runs on WhatsApp Web pages
2. When you export, it extracts messages from the DOM
3. Messages are formatted according to your chosen export format
4. The file is generated locally and downloaded to your computer
5. No data ever leaves your browser

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## ⚠️ Disclaimer

This extension is not affiliated with, endorsed by, or connected to WhatsApp Inc. or Meta Platforms, Inc. WhatsApp is a registered trademark of WhatsApp Inc.

## 🐛 Issues & Support

If you encounter any issues or have suggestions, please open an issue on GitHub.

## 🌟 Star History

If you find this tool useful, please consider giving it a star on GitHub!

---

Made with ❤️ by Can Bagdiken | 100% Privacy-Focused | No Tracking
