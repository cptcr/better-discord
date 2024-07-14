// Plugin: User Activity Tracker Plugin
/**
 * @name UserActivityTracker
 * @version 1.0.0
 * @description Tracks and logs user activities such as joining/leaving voice channels.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class UserActivityTracker {
    start() {
        BdApi.showToast("UserActivityTracker Plugin Loaded", { type: "info" });
        this.trackUserActivities();
    }

    stop() {
        BdApi.showToast("UserActivityTracker Plugin Unloaded", { type: "info" });
    }

    trackUserActivities() {
        BdApi.Patcher.after("UserActivityTracker", BdApi.Webpack.getModule(m => m.default?.displayName === "VoiceUser"), "default", (thisObject, [props], returnValue) => {
            console.log(`${props.user.username} joined a voice channel`);
        });

        BdApi.Patcher.before("UserActivityTracker", BdApi.Webpack.getModule(m => m.default?.displayName === "VoiceUser"), "componentWillUnmount", (thisObject, [props]) => {
            console.log(`${props.user.username} left a voice channel`);
        });
    }
};
