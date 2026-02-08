# CWT Testing Guide

## Pre-Installation Testing Checklist

### File Validation
- [x] manifest.json is valid JSON
- [x] All JavaScript files have valid syntax (content.js, popup.js, background.js)
- [x] HTML file is well-formed
- [x] All required icon files present (16px, 48px, 128px)

### Security Validation
- [x] CodeQL security scan passed (0 alerts)
- [x] URL validation uses proper startsWith checks
- [x] Error handling for download failures
- [x] No external API calls or tracking
- [x] All processing is local

## Manual Testing Checklist

### Installation
- [ ] Extension loads without errors in chrome://extensions/
- [ ] Extension icon appears in toolbar
- [ ] No console errors on extension load

### WhatsApp Web Integration
- [ ] Navigate to web.whatsapp.com
- [ ] Open a chat conversation
- [ ] Verify "📥 Export" button appears in chat header
- [ ] Button styling matches WhatsApp's design
- [ ] Button is clickable

### Export Functionality - HTML Format
- [ ] Select HTML format in popup
- [ ] Click "Export Current Chat"
- [ ] Loading indicator appears
- [ ] File download dialog appears
- [ ] Exported HTML file opens in browser
- [ ] Messages are properly formatted
- [ ] Timestamps are present
- [ ] Sender names are correct
- [ ] Text content is accurate
- [ ] Media placeholders are present

### Export Functionality - TXT Format
- [ ] Select TXT format in popup
- [ ] Click "Export Current Chat"
- [ ] File download dialog appears
- [ ] Exported TXT file opens in text editor
- [ ] Messages are in chronological order
- [ ] Timestamps are readable
- [ ] Sender names are included
- [ ] Text content is plain and clean

### Export Functionality - JSON Format
- [ ] Select JSON format in popup
- [ ] Click "Export Current Chat"
- [ ] File download dialog appears
- [ ] Exported JSON file is valid JSON
- [ ] Contains chatName field
- [ ] Contains exportDate field
- [ ] Contains messages array
- [ ] Each message has proper structure

### Different Chat Types
- [ ] Test with individual chat
- [ ] Test with group chat
- [ ] Test with chat containing only text
- [ ] Test with chat containing media
- [ ] Test with empty/minimal chat
- [ ] Test with long chat (100+ messages)

### Error Handling
- [ ] Try export without opening a chat - shows error
- [ ] Try export on non-WhatsApp tab - shows info message
- [ ] Cancel download - handles gracefully
- [ ] Test with slow internet - loads properly

### Performance
- [ ] Extension doesn't slow down WhatsApp Web
- [ ] Export completes in reasonable time
- [ ] No memory leaks (check Task Manager)
- [ ] Scrolling during extraction is smooth

### UI/UX
- [ ] Popup design is clean and professional
- [ ] Format buttons are clearly labeled
- [ ] Selected format is highlighted
- [ ] Loading state is visible
- [ ] Success message appears after export
- [ ] Error messages are clear and helpful

### Privacy & Security
- [ ] No network requests to external servers (check Network tab)
- [ ] No data stored in localStorage or cookies
- [ ] Extension only active on WhatsApp Web
- [ ] Permissions match manifest.json
- [ ] No console warnings about permissions

## Browser Compatibility

### Chrome/Chromium
- [ ] Works on Chrome stable
- [ ] Works on Chrome beta
- [ ] Works on Chromium

### Edge
- [ ] Works on Microsoft Edge (Chromium-based)

## Regression Testing

After any code changes:
- [ ] Re-run security scan (CodeQL)
- [ ] Re-run syntax validation
- [ ] Re-test core export functionality
- [ ] Verify no new console errors

## Performance Benchmarks

Record these metrics:
- Extension load time: _____ ms
- Time to add export button: _____ ms
- Export time (10 messages): _____ seconds
- Export time (100 messages): _____ seconds
- Export time (500 messages): _____ seconds
- Memory usage (idle): _____ MB
- Memory usage (during export): _____ MB

## Known Limitations

Document any discovered limitations:
- Media files use blob URLs which may expire
- Very large chats (1000+ messages) may take time to scroll
- Some WhatsApp Web UI changes may affect button placement
- Deleted messages won't appear in export
- Media not yet downloaded won't be included

## Test Data

Suggested test scenarios:
1. Chat with 5 text messages
2. Chat with 10 messages including 3 images
3. Group chat with 20 messages from 5 different senders
4. Chat with emojis and special characters
5. Chat with links and formatted text
6. Chat with videos and audio messages

## Report Template

```
Test Date: ___________
Chrome Version: ___________
OS: ___________
CWT Version: 1.0.0

Results:
- Installation: ✅ / ❌
- HTML Export: ✅ / ❌
- TXT Export: ✅ / ❌
- JSON Export: ✅ / ❌
- Performance: ✅ / ❌
- Security: ✅ / ❌

Issues Found:
1. _______________________
2. _______________________

Notes:
_______________________
```

---

**Testing Tips:**
- Use Chrome DevTools (F12) to monitor console and network
- Test with real WhatsApp conversations for best results
- Clear browser cache between major tests
- Document any unexpected behavior
