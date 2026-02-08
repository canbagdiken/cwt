window.WAExporter = class WAExporter {
    constructor() {
        this.zipFiles = {};
    }

    addFile(name, content) {
        if (content instanceof Uint8Array) {
            this.zipFiles[name] = content;
        } else {
            this.zipFiles[name] = new TextEncoder().encode(content);
        }
    }

    async saveAsZip(fileName) {
        if (typeof window.UZIP === 'undefined') return console.error("UZIP missing!");
        const zipBuffer = window.UZIP.encode(this.zipFiles);
        const blob = new Blob([zipBuffer], { type: 'application/zip' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    getHtmlTemplate(title, body) {
        return `<!DOCTYPE html><html lang="tr"><head><meta charset="UTF-8"><title>${title}</title><style>
            body{font-family:-apple-system,system-ui,Roboto,sans-serif;background-color:#efe7dd;margin:0;padding:20px}
            .container{max-width:800px;margin:0 auto;display:flex;flex-direction:column;width:100%}
            .header{text-align:center;padding:15px;background-color:#f0f2f5;border-radius:10px;margin-bottom:20px;border:1px solid #d1d7db;color:#54656f}
            .msg{padding:6px 10px;margin-bottom:4px;border-radius:8px;position:relative;max-width:80%;width:fit-content;word-wrap:break-word;box-shadow:0 1px .5px rgba(11,20,26,.13);font-size:14.2px;line-height:19px;color:#111b21}
            .msg.me{align-self:flex-end;margin-left:auto;background-color:#d9fdd3;border-top-right-radius:0}
            .msg.other{align-self:flex-start;margin-right:auto;background-color:#fff;border-top-left-radius:0}
            .sender-name{font-size:12.5px;font-weight:bold;color:#e542a3;margin-bottom:2px;display:block}
            .time{font-size:11px;color:#667781;float:right;margin-left:8px;margin-top:4px;user-select:none}
            .media-box img,.media-box video{max-width:100%;border-radius:6px;margin-top:4px;display:block}
            .sticker{max-width:128px!important}
            .file-link{display:flex;align-items:center;background:#f7f8fa;padding:10px;border-radius:6px;text-decoration:none;color:#333;margin-top:5px;font-size:13px;border:1px solid #ddd}
            .clear{clear:both}</style></head><body><div class="container"><div class="header"><h2>${title}</h2><small>${new Date().toLocaleString()}</small></div>${body}</div></body></html>`;
    }
};