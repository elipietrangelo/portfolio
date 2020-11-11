const path = require("path");
const config = require("config");

let cssPath   = path.join(config.stylesFolder);
let jsPath    = path.join(config.scriptsFolder);
let mediaPath = path.join(config.mediaFolder);

module.exports = {
    cssPath: "/"+cssPath,
    jsPath: "/"+jsPath,
    mediaPath: "/"+mediaPath
};