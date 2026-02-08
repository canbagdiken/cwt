# Privacy Policy for CWT

**Last Updated**: February 2026

## Our Commitment to Privacy

CWT (Can's WhatsApp Tool) is built with privacy as the core principle. We believe your conversations are private and should stay that way.

## What We DO

✅ **Process Everything Locally**: All chat extraction and export happens entirely in your browser  
✅ **Open Source**: Our code is fully transparent and auditable  
✅ **Minimal Permissions**: We only request the permissions absolutely necessary  
✅ **Respect Your Data**: Your chats remain on your device

## What We DON'T Do

❌ **No Data Collection**: We do not collect, store, or transmit any of your personal data  
❌ **No External Servers**: No data is sent to our servers or any third-party servers  
❌ **No Tracking**: No analytics, no tracking pixels, no telemetry  
❌ **No Cookies**: We don't use cookies or similar tracking technologies  
❌ **No Ads**: No advertisements or monetization of your data

## Permissions Explained

### Required Permissions

**1. Access to web.whatsapp.com (`host_permissions`)**
- **Why**: To read the chat messages and media from WhatsApp Web's interface
- **What it does**: Allows the extension to access the WhatsApp Web page content
- **What it doesn't do**: Does not access any other websites or tabs

**2. Downloads (`downloads`)**
- **Why**: To save your exported chat files to your computer
- **What it does**: Creates and downloads the exported file (HTML/TXT/JSON)
- **What it doesn't do**: Does not upload any data anywhere

**3. Active Tab (`activeTab`)**
- **Why**: To know when you're on WhatsApp Web
- **What it does**: Enables the extension to work on the current active tab
- **What it doesn't do**: Does not track your browsing history

### How These Permissions Are Used

1. When you click export, the content script reads the visible messages on WhatsApp Web
2. The messages are processed in your browser's memory
3. An export file is created locally
4. The file is downloaded to your chosen location
5. Nothing is stored or transmitted elsewhere

## Data Flow

```
WhatsApp Web → Your Browser (CWT Extension) → Exported File on Your Computer
```

**That's it.** No intermediaries, no cloud storage, no external servers.

## What Data Does CWT Access?

When you choose to export a chat, CWT accesses:
- Message text content
- Sender names
- Timestamps
- Media files (images, videos, audio, documents) displayed in the chat

**This data**:
- Stays in your browser
- Is only processed when you explicitly click "Export"
- Is only saved to a file that YOU control
- Is never sent to any external server

## Third-Party Services

CWT does NOT use any third-party services, including:
- Analytics platforms (Google Analytics, etc.)
- Crash reporting tools
- Cloud storage services
- Content delivery networks (CDNs)
- Advertising networks

## Open Source Transparency

Our source code is publicly available at:
https://github.com/canbagdiken/cwt

You can:
- Review the code yourself
- Verify our privacy claims
- Audit for security issues
- Contribute improvements

## Comparison with Other Tools

| Feature | CWT | Other Tools |
|---------|-----|-------------|
| Local Processing | ✅ Yes | ❌ Often server-based |
| No Data Collection | ✅ Yes | ❌ Often collect data |
| No Tracking | ✅ Yes | ❌ Often have analytics |
| Open Source | ✅ Yes | ❌ Often closed source |
| Minimal Permissions | ✅ Yes | ❌ Often request excessive permissions |

## Your Rights and Control

- **You Control Your Data**: Only you decide what to export and where to save it
- **You Can Verify**: Inspect the source code at any time
- **You Can Uninstall**: Remove the extension without any trace left behind
- **You Own Your Exports**: The exported files are yours to keep, delete, or share

## Security

### How We Keep Your Data Secure

1. **No External Communication**: Since we don't send data anywhere, there's no risk of interception
2. **No Storage**: We don't store your data, so there's nothing to be breached
3. **Minimal Attack Surface**: Simple, focused code with minimal dependencies
4. **Regular Updates**: We update promptly if any security issues are discovered

### What You Should Do

- Only install CWT from official sources (GitHub or Chrome Web Store)
- Keep your browser updated
- Review permissions before installing
- Report any suspicious behavior

## Children's Privacy

CWT is designed for use with WhatsApp, which requires users to be at least 13 years old (16 in Europe). We do not knowingly process data from children, and we don't process any data at all - everything stays local.

## Changes to This Privacy Policy

We will update this policy if:
- We add features that require different permissions
- Privacy laws change requiring policy updates
- We need to clarify our practices

**Version History**: All changes are tracked in our GitHub repository.

## Contact

If you have privacy concerns or questions:
- Open an issue on [GitHub](https://github.com/canbagdiken/cwt/issues)
- Review our [source code](https://github.com/canbagdiken/cwt)

## Legal

This extension is not affiliated with WhatsApp Inc. or Meta Platforms, Inc.

CWT respects your privacy because **we believe your conversations are yours alone**.

---

**Bottom Line**: We don't collect, store, or transmit your data. Period.
