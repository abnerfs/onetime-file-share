import getport from 'get-port';
import express from 'express';
import path from 'path';
import { createReadStream } from 'fs';
const ngrok = require('ngrok');
const qrcode = require('qrcode-terminal');

const startDownloadFileServer = async (filePath: string, oneTime: boolean = true) => {
    const PORT = await getport();
    const app = express();

    let fileDownloaded = false;
    
    const killserver = () => {
        console.log('File downloaded, closing server.');
        server.close(() => {
            process.exit();
        });
    }

    
    app.use(function ({ }, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    app.get('/', ({ }, res) => {
        if (fileDownloaded)
            res.status(404).send({
                msg: 'Already being downloaded...'
            })
        else {
            fileDownloaded = true;
            res.download(filePath);
            res.on('finish', () => {                
                killserver();                
            });
            
        }
    });

    const server = app.listen(PORT, async () => {
        const url = await ngrok.connect(PORT);
        console.log(`One time download link : ${url}`);
        qrcode.generate(url, { small: true });
    })
}


export const server = {
    startDownloadFileServer
}