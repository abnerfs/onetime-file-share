import { input } from "./input";
import { server } from "./server";

export const fshare = (async () => {    
    // process.argv[2] = "D:\\ffmpeg.zip";
    const filePath = await input.getFilePath();
    await server.startDownloadFileServer(filePath);
});

fshare()
    .catch((err: Error) => {
        console.log(`Error: ${err.message}`)
    })