const path = require('path');

module.exports = {
    paths: function (paths, env) {        
        paths.appIndexJs = path.resolve(__dirname, 'mysrc/client.js');
        paths.appSrc = path.resolve(__dirname, 'mysrc');
        return paths;
    },
}