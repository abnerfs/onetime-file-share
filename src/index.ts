import { input } from "./input";
import { server } from "./server";

const fshare = (async () => {
    process.argv[2] = 'D:\\teste.txt';
    const filePath = await input.getFilePath();
    await server.startDownloadFileServer(filePath);
});


fshare();