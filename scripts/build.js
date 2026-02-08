const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const ROOT_DIR = path.resolve(__dirname, '..');
const EXTENSION_DIR = path.join(ROOT_DIR, 'extension');
const OUTPUT_FILE = path.join(ROOT_DIR, 'cwt-extension.zip');

async function build() {
    console.log('Building extension for Chrome Web Store...\n');

    // Check if extension directory exists
    if (!fs.existsSync(EXTENSION_DIR)) {
        console.error('Error: Extension directory not found!');
        console.error('\nRun "npm run bundle" first to create extension files.\n');
        process.exit(1);
    }

    // Check for bundled files
    const requiredFiles = ['UZIP.js', 'wppconnect-wa.js', 'manifest.json'];
    const missing = requiredFiles.filter(f => !fs.existsSync(path.join(EXTENSION_DIR, f)));
    
    if (missing.length > 0) {
        console.error('Error: Missing required files in extension/:');
        missing.forEach(f => console.error(`   - ${f}`));
        console.error('\nRun "npm run bundle" first to create bundles.\n');
        process.exit(1);
    }

    // Remove old build
    if (fs.existsSync(OUTPUT_FILE)) {
        fs.unlinkSync(OUTPUT_FILE);
        console.log('Removed old build');
    }

    // Create ZIP
    const output = fs.createWriteStream(OUTPUT_FILE);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        const sizeKB = (archive.pointer() / 1024).toFixed(2);
        console.log(`\nBuild complete: cwt-extension.zip (${sizeKB} KB)`);
        console.log('Ready for Chrome Web Store upload!\n');
    });

    archive.on('error', (err) => {
        console.error('Build failed:', err);
        process.exit(1);
    });

    archive.pipe(output);

    // Add entire extension directory
    console.log('Packaging extension/ directory...');
    archive.directory(EXTENSION_DIR, false);

    await archive.finalize();
}

build().catch(err => {
    console.error('Build error:', err);
    process.exit(1);
});
