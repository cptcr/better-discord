// Plugin: Emoji Tracker Plugin
/**
 * @name EmojiTracker
 * @version 1.0.0
 * @description Tracks and displays the usage count of emojis in a server.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class EmojiTracker {
    constructor() {
        this.emojiCounts = {};
    }

    start() {
        BdApi.showToast("EmojiTracker Plugin Loaded", { type: "info" });
        this.trackEmojis();
    }

    stop() {
        BdApi.showToast("EmojiTracker Plugin Unloaded", { type: "info" });
    }

    trackEmojis() {
        BdApi.Patcher.after("EmojiTracker", BdApi.Webpack.getModule(m => m.receiveMessage), "receiveMessage", (thisObject, [channelId, message], returnValue) => {
            const emojis = message.content.match(/<a?:\w+:\d+>/g);
            if (emojis) {
                emojis.forEach(emoji => {
                    this.emojiCounts[emoji] = (this.emojiCounts[emoji] || 0) + 1;
                });
                this.displayEmojiCounts();
            }
        });
    }

    displayEmojiCounts() {
        console.log("Emoji Usage Counts:", this.emojiCounts);
    }
};
