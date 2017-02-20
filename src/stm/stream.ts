/**
 * Created by mwald on 2/16/2017.
 */

// built with instructions from https://memz.co/typescript-nodejs-intellij-idea-webstorm/

namespace streamStuff {
    let fs = require('fs');
    let http = require('http');
    let path = require('path');

    function handle_in_req(req, res) {
        if(req.method.toLowerCase() ==  'get' && req.url.substring(0,9) == '/content/') {
            serve_static_file(req.url.substring(1),res);
        } else {
            send_error(res, req.url+" not found");
        }
    }

    function serve_static_file(file, res) {
        let rs = fs.createReadStream(file);
        let ct = content_type_for_path(file);

        res.writeHead(200,{"Content-Type":ct});

        rs.on('readable', () => {
            let data = rs.read();
            
            if(typeof data == 'string') {
                if(!res.write(data)) {
                    rs.pause();
                }
            } else if(typeof data == 'object' && data instanceof Buffer) {
                if(!res.write(data.toString('utf8'))){
                    rs.pause();
                }
            }
        });

        rs.on('drain', () => {
            rs.resume();
        });

        rs.on('end', () => {
            console.log("file sent");
            res.end();
        });

        rs.on('error', (e) => {
            console.log(e);
            send_error(res, e.message);
        })
    }

    function content_type_for_path(file) {
        let ext = path.extname(file);
        switch(ext.toLowerCase()) {
            case 'html': return 'text/html';
            case 'js'  : return 'text/javascript';
            default    : return 'text/plain';
        }
    }

    function send_error(res, errorMessage) {
        res.writeHead(404, {"Content-Type":"application/json"});
        let out = { error:"not_found", message: errorMessage};
        res.end(JSON.stringify(out) + "\n");
    }

    let s = http.createServer(handle_in_req);
    s.listen(9191);
}
