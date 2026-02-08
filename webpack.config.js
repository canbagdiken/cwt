const path = require('path');

module.exports = [
    {
        name: 'uzip',
        entry: './src/uzip-bundle.js',
        output: {
            filename: 'UZIP.js',
            path: path.resolve(__dirname, 'extension'),
            library: {
                name: 'UZIP',
                type: 'window',
                export: 'default'
            }
        },
        mode: 'production'
    }
];
