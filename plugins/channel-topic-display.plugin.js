/**
 * @name ChannelTopicDisplay
 * @version 1.0.0
 * @description Display the channel topic at the top of the chat area.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher, React } = BdApi;

module.exports = class ChannelTopicDisplay {
    start() {
        const ChatComponent = WebpackModules.getModule(m => m.default?.displayName === "Chat");
        Patcher.after(ChatComponent, "default", (thisObject, [props], returnValue) => {
            const channel = props.channel;
            if (channel.topic) {
                const topicElement = React.createElement('div', { style: { padding: '10px', backgroundColor: '#2f3136', color: '#ffffff' } }, `Topic: ${channel.topic}`);
                returnValue.props.children.unshift(topicElement);
            }
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
