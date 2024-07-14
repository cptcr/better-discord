/**
 * @name AutoMute
 * @version 1.0.0
 * @description Automatically mutes you when joining a voice channel.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
module.exports = class AutoMute {
    start() {
        BdApi.showToast("AutoMute Plugin Loaded", { type: "info" });
        this.observeVoiceChannelJoin();
    }

    stop() {
        BdApi.showToast("AutoMute Plugin Unloaded", { type: "info" });
    }

    observeVoiceChannelJoin() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length) {
                    const voiceChannel = mutation.addedNodes[0].querySelector("[aria-label='Voice Connected']");
                    if (voiceChannel) {
                        this.muteSelf();
                    }
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    muteSelf() {
        const muteButton = document.querySelector("[aria-label='Mute']");
        if (muteButton && !muteButton.classList.contains("muted")) {
            muteButton.click();
        }
    }
};
