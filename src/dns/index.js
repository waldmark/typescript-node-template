/**
 * Created by mwald on 2/16/2017.
 */
// built with instructions from https://memz.co/typescript-nodejs-intellij-idea-webstorm/
var dnsStuff;
(function (dnsStuff) {
    var fs = require('fs');
    var dns = require('dns');
    var inputFile = fs.readFileSync('./data.json');
    var inputData = JSON.parse(inputFile.toString());
    var keys = Object.keys(inputData);
    keys.forEach(function (entry) {
        return dns.lookup(inputData[entry], function (err, addresses) {
            return console.log(inputData[entry] + '  addresses:', addresses);
        });
    });
})(dnsStuff || (dnsStuff = {}));
//# sourceMappingURL=index.js.map