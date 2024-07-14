/**
 * @name AutoReply
 * @version 1.0.0
 * @description Automatically replies to specific messages with predefined responses.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class AutoReply {
    start() {
        BdApi.showToast("AutoReply Plugin Loaded", { type: "info" });
        this.setupAutoReplies();
    }

    stop() {
        BdApi.showToast("AutoReply Plugin Unloaded", { type: "info" });
    }

    setupAutoReplies() {
        const replies = {
            "hello": "Hi there!",
            "how are you": "I'm good, thank you!"
        };

        BdApi.Patcher.after("AutoReply", BdApi.Webpack.getModule(m => m.receiveMessage), "receiveMessage", (thisObject, [channelId, message], returnValue) => {
            const content = message.content.toLowerCase();
            if (replies[content]) {
                BdApi.Webpack.getModule(m => m.sendMessage).sendMessage(channelId, { content: replies[content] });
            }
        });
    }
};
