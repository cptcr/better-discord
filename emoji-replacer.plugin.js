/**
 * @name EmojiReplacer
 * @version 1.0.0
 * @description Automatically replaces text with corresponding emojis as you type.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class EmojiReplacer {
    start() {
        BdApi.showToast("EmojiReplacer Plugin Loaded", { type: "info" });
        this.replaceTextWithEmojis();
    }

    stop() {
        BdApi.showToast("EmojiReplacer Plugin Unloaded", { type: "info" });
    }

    replaceTextWithEmojis() {
        const chatBox = document.querySelector("[aria-label='Message #general']");
        if (chatBox) {
            chatBox.addEventListener("input", (e) => {
                const value = e.target.value;
                e.target.value = this.replaceEmojis(value);
            });
        }
    }

    replaceEmojis(text) {
        const emojiMap = {
            ":smile:": "😄",
            ":laugh:": "😂",
            ":wink:": "😉",
            // Add more emoji replacements as needed
        };

        return text.replace(/:([a-zA-Z0-9_]+):/g, (match, p1) => emojiMap[p1] || match);
    }
};
