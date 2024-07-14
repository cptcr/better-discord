/**
 * @name QuickMention
 * @version 1.0.0
 * @description Quickly mention someone by typing a shortcut.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher } = BdApi;

module.exports = class QuickMention {
    start() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if (event.ctrlKey && event.key === 'm') {
            const userId = "USER_ID_HERE"; // Replace with the desired user ID
            const textarea = document.querySelector("textarea");
            if (textarea) {
                textarea.value += `<@${userId}> `;
                const event = new Event('input', { bubbles: true });
                textarea.dispatchEvent(event);
            }
        }
    }

    stop() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }
};
