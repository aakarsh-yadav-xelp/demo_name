var path		= require('path');


const opts = {
    errorEventName:'error',
    logDirectory:path.join(path.dirname(require.main.filename), '/test'), // NOTE: folder must exist and be writable...
    fileNamePattern:'roll-<DATE>.log',
    dateFormat:'YYYY.MM.DD'
};

const log = require('simple-node-logger').createRollingFileLogger( opts );

module.exports = log;

