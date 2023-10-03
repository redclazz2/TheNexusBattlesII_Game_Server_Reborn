/**
 * COLYSEUS CLOUD WARNING:
 * ----------------------
 * PLEASE DO NOT UPDATE THIS FILE MANUALLY AS IT MAY CAUSE DEPLOYMENT ISSUES
;*/

const os = require('os');
module.exports = {
    apps: [{
        port        : 3000,
        name        : "TheNexusBattlesIIServer",
        script      : "./build/index.js", // your entrypoint file
        watch       : true,           // optional
        instances   : 1,
        exec_mode   : 'fork',         // IMPORTANT: do not use cluster mode.
        env: {
            DEBUG: "colyseus:errors",
            NODE_ENV: "development"
        }
    }]
}
