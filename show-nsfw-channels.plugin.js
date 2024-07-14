/**
 * @name ShowNSFWChannels
 * @version 1.0.0
 * @description Show NSFW channels even if the user doesn't have access.
 * @author cptcr
 */
module.exports = class ShowNSFWChannels {
    load() {}
    start() {
        BdApi.showToast("Show NSFW Channels Plugin Loaded", { type: "info" });
        this.patchChannelList();
    }
    stop() {
        BdApi.showToast("Show NSFW Channels Plugin Unloaded", { type: "info" });
        this.unpatchChannelList();
    }
    patchChannelList() {
        const ChannelItem = BdApi.findModule(m => m.default && m.default.displayName === "ChannelItem");
        BdApi.Patcher.after("ShowNSFWChannels", ChannelItem, "default", (_, [props], ret) => {
            if (props.channel && props.channel.nsfw) {
                props.channel.hidden = false;
            }
            return ret;
        });
    }
    unpatchChannelList() {
        BdApi.Patcher.unpatchAll("ShowNSFWChannels");
    }
};
