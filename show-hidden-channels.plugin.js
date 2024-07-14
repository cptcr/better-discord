/**
 * @name ShowHiddenChannels
 * @version 1.0.0
 * @description Show hidden channels in the server list.
 * @author cptcr
 */
module.exports = class ShowHiddenChannels {
    load() {}
    start() {
        BdApi.showToast("Show Hidden Channels Plugin Loaded", { type: "info" });
        this.patchChannelList();
    }
    stop() {
        BdApi.showToast("Show Hidden Channels Plugin Unloaded", { type: "info" });
        this.unpatchChannelList();
    }
    patchChannelList() {
        const ChannelItem = BdApi.findModule(m => m.default && m.default.displayName === "ChannelItem");
        BdApi.Patcher.after("ShowHiddenChannels", ChannelItem, "default", (_, [props], ret) => {
            if (props.channel) {
                props.channel.hidden = false;
                props.channel.locked = true;
            }
            return ret;
        });
    }
    unpatchChannelList() {
        BdApi.Patcher.unpatchAll("ShowHiddenChannels");
    }
};
