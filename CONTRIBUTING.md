# Contributing to CWT

Thank you for your interest in contributing to CWT (Can's WhatsApp Tool)! We welcome contributions from the community.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How Can I Contribute?

### Reporting Bugs

If you find a bug, please open an issue on GitHub with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior vs. actual behavior
- Screenshots if applicable
- Your Chrome version and operating system

### Suggesting Enhancements

We welcome feature requests! Please open an issue with:
- A clear description of the feature
- Why this feature would be useful
- Possible implementation approaches (if you have ideas)

### Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/canbagdiken/cwt.git
   cd cwt
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Test your changes thoroughly
   - Update documentation if needed

4. **Test the Extension**
   - Load the unpacked extension in Chrome
   - Test on WhatsApp Web with different chat types
   - Ensure all export formats work correctly

5. **Commit Your Changes**
   ```bash
   git add .
   git commit -m "Add: Brief description of your changes"
   ```

6. **Push and Create Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then open a pull request on GitHub.

## Development Guidelines

### Code Style

- Use clear, descriptive variable names
- Add comments for complex logic
- Follow JavaScript best practices
- Use consistent indentation (2 spaces)

### Privacy First

Any contribution must maintain our privacy-first approach:
- ✅ All processing must be local
- ✅ No external API calls
- ✅ No tracking or analytics
- ✅ No data collection

### Testing

Before submitting:
- Test on multiple WhatsApp chats (individual, group)
- Test all export formats (HTML, TXT, JSON)
- Test with different media types
- Check for console errors
- Verify memory usage is reasonable

### File Structure

```
cwt/
├── manifest.json       # Extension configuration
├── background.js       # Background service worker
├── content.js         # Content script for WhatsApp Web
├── popup.html         # Extension popup UI
├── popup.js           # Popup functionality
├── icons/             # Extension icons
├── README.md          # Main documentation
├── INSTALLATION.md    # Installation guide
├── CONTRIBUTING.md    # This file
└── LICENSE            # MIT License
```

## Areas for Contribution

### High Priority
- Better media handling (download actual files)
- Support for stickers and GIFs
- Export customization options
- Multiple chat selection
- Dark mode for HTML exports

### Medium Priority
- Export to more formats (PDF, CSV)
- Search/filter messages before export
- Encryption for exported files
- Batch export functionality

### Low Priority
- Cloud storage integration (while maintaining privacy)
- Advanced formatting options
- Custom themes for HTML exports

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the "question" label
- Check existing issues and pull requests
- Review the README and documentation

## Recognition

Contributors will be recognized in the README. Thank you for helping make CWT better!

---

**Remember**: Every contribution, no matter how small, is valuable. We appreciate your help!
