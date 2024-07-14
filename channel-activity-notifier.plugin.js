// Plugin: Channel Activity Notifier Plugin
/**
 * @name ChannelActivityNotifier
 * @version 1.0.0
 * @description Notifies you when there is activity in specific channels.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class ChannelActivityNotifier {
    start() {
        BdApi.showToast("ChannelActivityNotifier Plugin Loaded", { type: "info" });
        this.watchChannelActivity();
    }

    stop() {
        BdApi.showToast("ChannelActivityNotifier Plugin Unloaded", { type: "info" });
    }

    watchChannelActivity() {
        const watchedChannels = ["CHANNEL_ID_1", "CHANNEL_ID_2"]; // Replace with your channel IDs

        BdApi.Patcher.after("ChannelActivityNotifier", BdApi.Webpack.getModule(m => m.receiveMessage), "receiveMessage", (thisObject, [channelId, message], returnValue) => {
            if (watchedChannels.includes(channelId)) {
                BdApi.showToast(`New message in ${channelId}`, { type: "info" });
            }
        });
    }
};
