// Plugin 4: Auto Reactor Plugin
/**
 * @name AutoReactor
 * @version 1.0.0
 * @description Automatically reacts to new messages with a specified emoji.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class AutoReactor {
    start() {
        BdApi.showToast("AutoReactor Plugin Loaded", { type: "info" });
        this.reactToMessages();
    }

    stop() {
        BdApi.showToast("AutoReactor Plugin Unloaded", { type: "info" });
    }

    reactToMessages() {
        const emoji = "👍"; // Replace with your desired emoji

        BdApi.Patcher.after("AutoReactor", BdApi.Webpack.getModule(m => m.receiveMessage), "receiveMessage", (thisObject, [channelId, message], returnValue) => {
            BdApi.Webpack.getModule(m => m.addReaction).addReaction(channelId, message.id, emoji);
        });
    }
};
