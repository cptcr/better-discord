// Plugin: Auto Responder Plugin
/**
 * @name AutoResponder
 * @version 1.0.0
 * @description Automatically responds to specific messages with predefined responses.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class AutoResponder {
    start() {
        BdApi.showToast("AutoResponder Plugin Loaded", { type: "info" });
        this.setupAutoResponses();
    }

    stop() {
        BdApi.showToast("AutoResponder Plugin Unloaded", { type: "info" });
    }

    setupAutoResponses() {
        const responses = {
            "hello": "Hi there!",
            "how are you": "I'm good, thank you!"
        };

        BdApi.Patcher.after("AutoResponder", BdApi.Webpack.getModule(m => m.receiveMessage), "receiveMessage", (thisObject, [channelId, message], returnValue) => {
            const content = message.content.toLowerCase();
            if (responses[content]) {
                BdApi.Webpack.getModule(m => m.sendMessage).sendMessage(channelId, { content: responses[content] });
            }
        });
    }
};
