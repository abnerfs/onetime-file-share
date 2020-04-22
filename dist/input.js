"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var getFilePath = function () {
    var filePath = process.argv[2];
    if (!filePath)
        throw new Error('fshare <file path>');
    if (!fs_1.default.existsSync(filePath))
        throw new Error("File not found: " + filePath);
    var fileStats = fs_1.default.statSync(filePath);
    if (fileStats.isDirectory())
        throw new Error("Send directory not supported yet");
    return filePath;
};
exports.input = {
    getFilePath: getFilePath
};
