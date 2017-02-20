/**
 * Created by mwald on 2/16/2017.
 */

// built with instructions from https://memz.co/typescript-nodejs-intellij-idea-webstorm/

namespace fileStuff {
    let fs = require('fs');

    let printDir = function (results) {
        console.log(results.length + " results: ");

        results.forEach(f => {
            fs.stat(f, (err, results) => {
                if (err) {
                    console.log("error with file stat on " + results + " " + err.message);
                }
                console.log((results.isDirectory() ? " DIR  " : " FILE ") + f);
            });
        });
    };

    fs.readdir(".", (err, results) => {
        if(err) {
            console.log(err.message);
            return;
        }
        printDir(results); // on success callback
    });
}
