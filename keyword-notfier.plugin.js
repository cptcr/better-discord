/**
 * @name KeywordNotifier
 * @version 1.0.0
 * @description Notifies you when a specific keyword is mentioned in any channel.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class KeywordNotifier {
    start() {
        BdApi.showToast("KeywordNotifier Plugin Loaded", { type: "info" });
        this.watchKeywords();
    }

    stop() {
        BdApi.showToast("KeywordNotifier Plugin Unloaded", { type: "info" });
    }

    watchKeywords() {
        const keyword = "YOUR_KEYWORD"; // Replace with the keyword you want to watch for

        BdApi.Patcher.after("KeywordNotifier", BdApi.Webpack.getModule(m => m.receiveMessage), "receiveMessage", (thisObject, [channelId, message], returnValue) => {
            if (message.content.includes(keyword)) {
                BdApi.showToast(`Keyword "${keyword}" mentioned in ${channelId}`, { type: "info" });
            }
        });
    }
};
