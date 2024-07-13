/**
 * @name MessageHighlighter
 * @version 1.0.0
 * @description Highlights messages containing specific keywords.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class MessageHighlighter {
    start() {
        BdApi.showToast("MessageHighlighter Plugin Loaded", { type: "info" });
        this.highlightMessages();
    }

    stop() {
        BdApi.showToast("MessageHighlighter Plugin Unloaded", { type: "info" });
    }

    highlightMessages() {
        const keywords = ["urgent", "important"]; // Replace with your desired keywords
        const highlightColor = "#FFD700"; // Replace with your desired highlight color

        BdApi.Patcher.after("MessageHighlighter", BdApi.Webpack.getModule(m => m.receiveMessage), "receiveMessage", (thisObject, [channelId, message], returnValue) => {
            keywords.forEach(keyword => {
                if (message.content.includes(keyword)) {
                    message.style = { backgroundColor: highlightColor };
                }
            });
        });
    }
};
