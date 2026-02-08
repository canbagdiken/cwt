# Installation Guide for CWT

## Prerequisites
- Google Chrome browser (version 88 or higher)
- Active WhatsApp account
- Access to WhatsApp Web

## Installation Methods

### Method 1: Chrome Web Store (Recommended - Coming Soon)

Once published to the Chrome Web Store:

1. Visit the [Chrome Web Store](https://chrome.google.com/webstore)
2. Search for "CWT - Can's WhatsApp Tool"
3. Click **Add to Chrome**
4. Confirm the installation when prompted
5. You'll see the CWT icon appear in your Chrome toolbar

### Method 2: Manual Installation (For Developers)

#### Step 1: Download the Extension

**Option A: Clone from GitHub**
```bash
git clone https://github.com/canbagdiken/cwt.git
cd cwt
```

**Option B: Download ZIP**
1. Go to https://github.com/canbagdiken/cwt
2. Click the green "Code" button
3. Select "Download ZIP"
4. Extract the ZIP file to a folder on your computer

#### Step 2: Load the Extension in Chrome

1. Open Google Chrome
2. Navigate to `chrome://extensions/`
   - Or click the three dots menu → More Tools → Extensions
3. Enable **Developer mode** (toggle switch in the top right corner)
4. Click **Load unpacked**
5. Browse to and select the CWT directory (the folder containing manifest.json)
6. The extension should now appear in your extensions list

#### Step 3: Pin the Extension (Optional)

1. Click the puzzle piece icon in your Chrome toolbar
2. Find "CWT - Can's WhatsApp Tool" in the list
3. Click the pin icon to keep it visible in your toolbar

## Verification

To verify the installation was successful:

1. Navigate to [web.whatsapp.com](https://web.whatsapp.com)
2. Open any chat conversation
3. You should see a "📥 Export" button in the chat header
4. Clicking the CWT extension icon should open the export popup

## Troubleshooting

### Extension Not Loading

**Problem**: Extension fails to load with an error
- **Solution**: Make sure you selected the correct folder (the one containing `manifest.json`)
- **Solution**: Check that all files are present and not corrupted

### Export Button Not Appearing

**Problem**: The export button doesn't show up on WhatsApp Web
- **Solution**: Refresh the WhatsApp Web page (F5 or Cmd+R)
- **Solution**: Make sure you're on `web.whatsapp.com` (not a different WhatsApp URL)
- **Solution**: Disable and re-enable the extension
- **Solution**: Check the browser console (F12) for any error messages

### Extension Icon Grayed Out

**Problem**: The CWT icon in the toolbar is grayed out
- **Solution**: This is normal - the extension only works on WhatsApp Web
- **Solution**: Navigate to `web.whatsapp.com` and open a chat

### Popup Doesn't Open

**Problem**: Clicking the extension icon does nothing
- **Solution**: Make sure you're on a WhatsApp Web tab
- **Solution**: Right-click the extension icon and select "Inspect popup" to check for errors

### Permissions Warning

**Problem**: Chrome shows warnings about permissions
- **Solution**: This is normal - the extension needs access to WhatsApp Web to export your chats
- **Solution**: Review the permissions in the README - we only request what's necessary
- **Solution**: All processing is local; no data is sent to external servers

## Updating the Extension

### Chrome Web Store Version
Updates are automatic through the Chrome Web Store.

### Manual Installation
1. Download the latest version from GitHub
2. Extract to the same folder (or a new one)
3. Go to `chrome://extensions/`
4. Click the refresh icon on the CWT extension card

## Uninstallation

If you wish to uninstall CWT:

1. Navigate to `chrome://extensions/`
2. Find "CWT - Can's WhatsApp Tool"
3. Click **Remove**
4. Confirm the removal

**Note**: Uninstalling the extension will not affect your WhatsApp account or any exported files you've already saved.

## Privacy Note

CWT processes everything locally in your browser. The extension:
- ✅ Does NOT send data to any external servers
- ✅ Does NOT collect any personal information
- ✅ Does NOT include tracking or analytics
- ✅ Only accesses WhatsApp Web when you choose to export a chat

## Support

If you encounter any issues during installation:
1. Check this troubleshooting guide
2. Review the [main README](README.md)
3. Open an issue on [GitHub](https://github.com/canbagdiken/cwt/issues)

---

**Next Steps**: After installation, check out the [Usage Guide](README.md#-how-to-use) to learn how to export your chats!
