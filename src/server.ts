import getport from 'get-port';
import express from 'express';
import path from 'path';
const ngrok = require('ngrok');
const qrcode = require('qrcode-terminal');

const startDownloadFileServer = async (filePath: string, oneTime: boolean = true) => {
    const PORT = await getport();
    const app = express();

    let fileDownloaded = false;

    const killserver = () => {
        process.exit(0);
    }

    app.use(function ({}, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    app.get('/', ({}, res) => {
        if(fileDownloaded)
            res.status(403);
        else {
            res.set('Content-Disposition', `attachment; filename=${path.basename(filePath)}`);

            res.sendFile(filePath);
            console.log('File downloaded, closing server.');
            if(oneTime) {
                fileDownloaded = true;
        
                setTimeout(() => {
                    killserver();
                }, 1000);
            }
        }
    })

    app.listen(PORT, async () => {
        const url = await ngrok.connect(PORT);
        console.log(`File available in link : ${url}`);
        qrcode.generate(url, { small: true });
    })
}


export const server = {
    startDownloadFileServer
}