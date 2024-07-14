// Plugin: Channel Activity Logger Plugin
/**
 * @name ChannelActivityLogger
 * @version 1.0.0
 * @description Logs all messages sent in a specific channel to a text file.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

const fs = require('fs');
const path = require('path');

module.exports = class ChannelActivityLogger {
    start() {
        BdApi.showToast("ChannelActivityLogger Plugin Loaded", { type: "info" });
        this.logChannelActivity();
    }

    stop() {
        BdApi.showToast("ChannelActivityLogger Plugin Unloaded", { type: "info" });
    }

    logChannelActivity() {
        const channelId = "YOUR_CHANNEL_ID"; // Replace with your channel ID
        const logFilePath = path.join(BdApi.Plugins.folder, 'channel_activity_log.txt');

        BdApi.Patcher.after("ChannelActivityLogger", BdApi.Webpack.getModule(m => m.receiveMessage), "receiveMessage", (thisObject, [channel, message], returnValue) => {
            if (channel.id === channelId) {
                const logEntry = `${new Date().toISOString()} - ${message.author.username}: ${message.content}\n`;
                fs.appendFile(logFilePath, logEntry, (err) => {
                    if (err) BdApi.showToast("Failed to log message", { type: "error" });
                });
            }
        });
    }
};
