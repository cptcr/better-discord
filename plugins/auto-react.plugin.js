/**
 * @name AutoReact
 * @version 1.0.0
 * @description Automatically react to new messages with a specified emoji.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher } = BdApi;
const MessageActions = WebpackModules.getByProps("sendMessage");

module.exports = class AutoReact {
    start() {
        const MessageCreate = WebpackModules.getModule(m => m.default?.displayName === "Message");
        Patcher.after(MessageCreate, "default", (thisObject, [props]) => {
            const emoji = { name: "👍" }; // Replace with your desired emoji
            MessageActions.addReaction(props.channel.id, props.message.id, emoji);
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
