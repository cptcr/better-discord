/**
 * @name ChannelMessageCounter
 * @version 1.0.0
 * @description Count the number of messages in a channel and display it.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher } = BdApi;
const MessageStore = WebpackModules.getByProps("getMessage");

module.exports = class ChannelMessageCounter {
    start() {
        const ChannelItem = WebpackModules.getModule(m => m.default?.displayName === "ChannelItem");
        Patcher.after(ChannelItem, "default", (thisObject, [props], returnValue) => {
            const channelId = props.channel.id;
            const messageCount = MessageStore.getMessageCount(channelId);
            const countElement = document.createElement('span');
            countElement.style.color = "gray";
            countElement.style.fontSize = "12px";
            countElement.textContent = ` (${messageCount})`;
            returnValue.props.children.push(countElement);
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
