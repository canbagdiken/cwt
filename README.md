# CWT - Can's WhatsApp Backup Tool

<p align="center">
  <img src="assets/logo.png" alt="CWT" width="128" height="128">
</p>

<p align="center">
  <strong>Export your WhatsApp Web conversations with full media support</strong>
</p>

### From Chrome Web Store
*Coming soon...*

### Manual Installation (Developer Mode)

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run bundle` to bundle dependencies for local development
4. Load unpacked extension from folder

### Build for Chrome Web Store

```bash
npm run build
```
Creates `cwt-extension.zip` ready for store upload.

## Development Scripts

- `npm run build` - Create production ZIP for Chrome Web Store
- `npm run bundle` - Bundle dependencies only (webpack)
- `npm run package` - Package extension into ZIP
- `npm run clean` - Remove build artifacts

### Tech Stack

- **WPP Connect** - WhatsApp Web API wrapper (bundled from npm)
- **UZIP** - Client-side ZIP compression (bundled from npm)
- **Webpack** - Module bundler
- **Manifest V3** - Modern extension API

## Export Format

Each export contains:

**HTML Format**: Styled chat view with inline media  
**TXT Format**: Plain text transcript with media references  
**JSON Format**: Complete message objects with metadata  
**Media Folder**: Original quality files with numbered filenames  



## Privacy & Security

- ✅ **100% Local Processing**: No data sent to external servers
- ✅ **No Analytics**: We don't track your usage
- ✅ **No Permissions Abuse**: Only requests necessary permissions
- ✅ **Open Source**: Full transparency, audit the code yourself

## License

MIT License - see [LICENSE](LICENSE) file for details

## Disclaimer

This project is not affiliated with, authorized, maintained, sponsored or endorsed by WhatsApp or any of its affiliates or subsidiaries. This is an independent and unofficial project. Use at your own risk.

