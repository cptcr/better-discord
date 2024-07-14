/**
 * @name MessageLogger
 * @version 1.0.0
 * @description Log all messages sent in a server to a local file.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher } = BdApi;
const fs = require('fs');
const path = require('path');

module.exports = class MessageLogger {
    start() {
        const MessageCreate = WebpackModules.getModule(m => m.default?.displayName === "Message");
        Patcher.after(MessageCreate, "default", (thisObject, [props]) => {
            const message = props.message;
            const logFilePath = path.join(__dirname, 'messageLog.txt');
            const logMessage = `[${new Date().toISOString()}] ${message.author.username}: ${message.content}\n`;
            fs.appendFileSync(logFilePath, logMessage);
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
