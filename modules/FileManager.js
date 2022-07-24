const fs = require("fs");
const path = require("path");

class FileManager {
    load(folder, callback) {
        const _path = path.join(__dirname, `../${folder}`);
        const files = fs.readdirSync(_path);
        for (const file of files) {
            const filePath = path.join(_path, file);
            const instance = require(filePath);
            callback(instance);
        }
    }
}

module.exports = FileManager;