import fs from 'fs';

const getFilePath = () => {
    const filePath = process.argv[2];
    if (!filePath)
        throw new Error('Usage: fshare <file path>');

    if (!fs.existsSync(filePath))
        throw new Error(`File not found: ${filePath}`)

    const fileStats = fs.statSync(filePath);
    if (fileStats.isDirectory())
        throw new Error(`Send directory not supported yet`);

    return filePath;
};

export const input = {
    getFilePath
}