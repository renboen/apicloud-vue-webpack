const fs = require('fs');
const path = require("path");
let r = [];
// 读取page文件夹下的所有文件夹,该文件夹必须包含同名的js和html,文件否则会被忽略.
function getAllFiles(filePath) {
    let _r = {};
    let files = fs.readdirSync(filePath);
    for (let item of files) {
        let _path = path.join(filePath, item);
        let stats = fs.statSync(_path);
        //判断是否是文件。
        if (stats.isDirectory()) {
            //判断文件夹中是否能有同名的文件夹。比如home文件夹中必须含有home.js和home.html.否则忽略
            if (fs.existsSync(path.join(filePath, item, item + ".js"))) {
                _r[item] = "./" + path.relative(path.join(__dirname, '../../'), path.join(filePath, item, item + ".js")).split(path.sep).join("/");
                r.push(_r)
                getAllFiles(_path)
            } else {
                continue
            }
        } else {
            continue;
        }
    }
    return r
}
getAllFiles(path.resolve(__dirname))

console.log(r)
module.exports = r;