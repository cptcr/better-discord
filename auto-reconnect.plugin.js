/**
 * @name AutoReconnect
 * @version 1.0.0
 * @description Automatically attempts to reconnect to voice channels on disconnect.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class AutoReconnect {
    start() {
        BdApi.showToast("AutoReconnect Plugin Loaded", { type: "info" });
        this.observeVoiceChannelDisconnect();
    }

    stop() {
        BdApi.showToast("AutoReconnect Plugin Unloaded", { type: "info" });
    }

    observeVoiceChannelDisconnect() {
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.removedNodes.length) {
                    const voiceChannel = mutation.removedNodes[0].querySelector("[aria-label='Voice Connected']");
                    if (voiceChannel) {
                        this.reconnectToVoiceChannel();
                    }
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    reconnectToVoiceChannel() {
        const reconnectButton = document.querySelector("[aria-label='Reconnect']");
        if (reconnectButton) {
            reconnectButton.click();
        }
    }
};
