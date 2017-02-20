/**
 * Created by mwald on 2/16/2017.
 */
// built with instructions from https://memz.co/typescript-nodejs-intellij-idea-webstorm/
var fileStuff;
(function (fileStuff) {
    var fs = require('fs');
    var printDir = function (results) {
        console.log(results.length + " results: ");
        results.forEach(function (f) {
            fs.stat(f, function (err, results) {
                if (err) {
                    console.log("error with file stat on " + results + " " + err.message);
                }
                console.log((results.isDirectory() ? " DIR  " : " FILE ") + f);
            });
        });
    };
    fs.readdir(".", function (err, results) {
        if (err) {
            console.log(err.message);
            return;
        }
        printDir(results); // on success callback
    });
})(fileStuff || (fileStuff = {}));
//# sourceMappingURL=stat.js.map