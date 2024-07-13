/**
 * @name CustomEmojiShortcuts
 * @version 1.0.0
 * @description Define shortcuts for frequently used emojis.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher } = BdApi;
const shortcuts = {
    ":smile:": "😊",
    ":thumbsup:": "👍",
    ":heart:": "❤️",
};

module.exports = class CustomEmojiShortcuts {
    start() {
        const TextAreaComponent = WebpackModules.getModule(m => m.default?.displayName === "ChannelTextArea");
        Patcher.after(TextAreaComponent, "default", (thisObject, [props], returnValue) => {
            const originalHandleSend = props.handleSend;
            props.handleSend = function (message) {
                for (const [shortcut, emoji] of Object.entries(shortcuts)) {
                    message.content = message.content.replace(new RegExp(shortcut, 'g'), emoji);
                }
                return originalHandleSend.apply(this, [message]);
            };
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
