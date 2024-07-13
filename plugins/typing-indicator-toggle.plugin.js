/**
 * @name TypingIndicatorToggle
 * @version 1.0.0
 * @description Toggle the visibility of typing indicators.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher } = BdApi;

module.exports = class TypingIndicatorToggle {
    start() {
        const TypingModule = WebpackModules.getByProps("startTyping");
        const originalStartTyping = TypingModule.startTyping;
        TypingModule.startTyping = function (channelId) {
            if (!localStorage.getItem("hideTypingIndicator")) {
                return originalStartTyping.apply(this, arguments);
            }
        };

        BdApi.injectCSS("typingIndicatorToggleCSS", `
            #toggleTypingIndicator {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #7289da;
                color: white;
                padding: 10px;
                border-radius: 5px;
                cursor: pointer;
                z-index: 1000;
            }
        `);

        const button = document.createElement("div");
        button.id = "toggleTypingIndicator";
        button.innerText = "Toggle Typing Indicator";
        button.onclick = () => {
            const isHidden = localStorage.getItem("hideTypingIndicator");
            if (isHidden) {
                localStorage.removeItem("hideTypingIndicator");
                button.style.backgroundColor = "#7289da";
            } else {
                localStorage.setItem("hideTypingIndicator", "true");
                button.style.backgroundColor = "#ff4d4d";
            }
        };
        document.body.appendChild(button);
    }

    stop() {
        Patcher.unpatchAll();
        BdApi.clearCSS("typingIndicatorToggleCSS");
        document.getElementById("toggleTypingIndicator").remove();
    }
};
