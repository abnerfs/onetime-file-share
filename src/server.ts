import getport from 'get-port';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { readFileSync } from 'fs';
import { replaceAll } from './util';
const ngrok = require('ngrok');
const qrcode = require('qrcode-terminal');

const template = readFileSync(__dirname + '/../template/download.html', 'utf8');

const startDownloadFileServer = async (filePath: string) => {
    const PORT = await getport();
    const app = express();


    app.use(morgan('dev'));

    let fileDownloaded = false;

    const killserver = () => {
        console.log('File downloaded, closing server.');
        server.close(() => {
            setTimeout(() => {
                process.exit(0);
            }, 2000);
        });
    }

    let url = '';
    const fileName = path.basename(filePath);

    app.use(function ({ }, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
        next();
    });

    app.get('/', ({ }, res) => {
        if (fileDownloaded) {
            res.status(404).send({
                msg: 'Already being downloaded...'
            })
        }
        else {
            //Improve layout later
            let templateSend = replaceAll(template, '{{downloadurl}}', url);
            templateSend = replaceAll(templateSend, '{{filename}}', fileName);
            res.send(templateSend);
        }

    });

    app.get('/download', ({ }, res) => {
        if (fileDownloaded)
            res.status(404).send({
                msg: 'Already being downloaded...'
            })
        else {
            console.log('File being downloaded...')
            fileDownloaded = true;
            res.download(filePath);
            res.on('finish', () => killserver());
        }
    });

    const server = app.listen(PORT, async () => {
        url = await ngrok.connect(PORT);
        console.log(`One time download link : ${url}`);
        qrcode.generate(url, { small: true });
    })
}


export const server = {
    startDownloadFileServer
}