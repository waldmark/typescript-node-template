/**
 * Created by mwald on 2/16/2017.
 */

// built with instructions from https://memz.co/typescript-nodejs-intellij-idea-webstorm/

namespace dnsStuff {
    let fs = require('fs');
    let dns = require('dns');

    let inputFile = fs.readFileSync('./data.json');
    let inputData = JSON.parse(inputFile.toString());

    let keys = Object.keys(inputData);
    keys.forEach(entry => {
        return dns.lookup(inputData[entry], (err, addresses) =>
            console.log(inputData[entry] + '  addresses:', addresses)
        );
    });
}

