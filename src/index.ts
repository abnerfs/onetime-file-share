import { input } from "./input";
import { server } from "./server";

export const fshare = (async () => {
    const filePath = await input.getFilePath();
    await server.startDownloadFileServer(filePath);
});


// fshare();