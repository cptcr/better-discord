// Plugin: Custom Notification Sounds Plugin
/**
 * @name CustomNotificationSounds
 * @version 1.0.0
 * @description Allows users to set custom notification sounds for specific events.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class CustomNotificationSounds {
    start() {
        BdApi.showToast("CustomNotificationSounds Plugin Loaded", { type: "info" });
        this.setupNotificationSounds();
    }

    stop() {
        BdApi.showToast("CustomNotificationSounds Plugin Unloaded", { type: "info" });
    }

    setupNotificationSounds() {
        const notificationSounds = {
            message: "https://example.com/message.mp3",
            mention: "https://example.com/mention.mp3"
        };

        BdApi.Patcher.after("CustomNotificationSounds", BdApi.Webpack.getModule(m => m.receiveMessage), "receiveMessage", (thisObject, [channelId, message], returnValue) => {
            const audio = new Audio(notificationSounds.message);
            audio.play();
        });

        BdApi.Patcher.after("CustomNotificationSounds", BdApi.Webpack.getModule(m => m.showMention), "showMention", (thisObject, [mention], returnValue) => {
            const audio = new Audio(notificationSounds.mention);
            audio.play();
        });
    }
};
