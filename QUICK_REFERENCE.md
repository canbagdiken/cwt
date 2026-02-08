# CWT Quick Reference Guide

## Installation

```bash
# Clone and install
git clone https://github.com/canbagdiken/cwt.git
cd cwt

# Load in Chrome
1. Go to chrome://extensions/
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select the cwt directory
```

## Usage

1. Open [web.whatsapp.com](https://web.whatsapp.com)
2. Select a chat
3. Click "📥 Export" button or extension icon
4. Choose format (HTML/TXT/JSON)
5. Click "Export Current Chat"
6. Save the file

## Export Formats

| Format | Best For | Size | Features |
|--------|----------|------|----------|
| **HTML** | Viewing, archiving | Medium | Styled, embedded media |
| **TXT** | Reading, searching | Small | Plain text, portable |
| **JSON** | Processing, analysis | Small | Structured data |

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Open extension | Click icon or Alt+Shift+E (customize in chrome://extensions/shortcuts) |

## Troubleshooting

### Export button not visible
```
1. Refresh WhatsApp Web (F5)
2. Wait 2-3 seconds for page to load
3. Check console for errors (F12)
```

### Export fails
```
1. Ensure chat is open and visible
2. Try scrolling to load all messages
3. Check file system permissions
```

### Media not exporting
```
1. Scroll through chat to load media
2. Wait for media to fully load
3. Some media may use blob URLs that expire
```

## File Structure

```
exported_chat.html     # Styled export with embedded media
exported_chat.txt      # Plain text with message structure
exported_chat.json     # JSON with full metadata
```

## Privacy Checklist

- ✅ All processing is local
- ✅ No external server communication
- ✅ No data collection
- ✅ No tracking
- ✅ Open source code

## Support

- **Issues**: https://github.com/canbagdiken/cwt/issues
- **Docs**: https://github.com/canbagdiken/cwt/blob/main/README.md
- **Privacy**: https://github.com/canbagdiken/cwt/blob/main/PRIVACY.md

## Version

Current version: **1.0.0**

---

**Quick Tip**: Pin the extension to your toolbar for easy access!
