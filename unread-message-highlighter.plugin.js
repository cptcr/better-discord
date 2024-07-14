/**
 * @name UnreadMessageHighlighter
 * @version 1.0.0
 * @description Highlight channels with unread messages more prominently.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { Patcher, WebpackModules } = BdApi;

module.exports = class UnreadMessageHighlighter {
    start() {
        const ChannelItem = WebpackModules.getModule(m => m.default?.displayName === "ChannelItem");
        Patcher.after(ChannelItem, "default", (thisObject, [props], returnValue) => {
            if (props.channel.hasUnread) {
                returnValue.props.style = { backgroundColor: "#FFEB3B" };
            }
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
