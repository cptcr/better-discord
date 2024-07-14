// Plugin: Custom Join/Leave Sounds Plugin
/**
 * @name CustomJoinLeaveSounds
 * @version 1.0.0
 * @description Plays custom sounds when users join or leave voice channels.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class CustomJoinLeaveSounds {
    start() {
        BdApi.showToast("CustomJoinLeaveSounds Plugin Loaded", { type: "info" });
        this.setupSounds();
    }

    stop() {
        BdApi.showToast("CustomJoinLeaveSounds Plugin Unloaded", { type: "info" });
    }

    setupSounds() {
        const joinSound = new Audio("https://example.com/join.mp3");
        const leaveSound = new Audio("https://example.com/leave.mp3");

        BdApi.Patcher.after("CustomJoinLeaveSounds", BdApi.Webpack.getModule(m => m.default?.displayName === "VoiceUser"), "default", (thisObject, [props], returnValue) => {
            joinSound.play();
        });

        BdApi.Patcher.before("CustomJoinLeaveSounds", BdApi.Webpack.getModule(m => m.default?.displayName === "VoiceUser"), "componentWillUnmount", (thisObject, [props]) => {
            leaveSound.play();
        });
    }
};
