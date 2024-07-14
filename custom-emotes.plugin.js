/**
 * @name CustomEmotes
 * @version 1.0.0
 * @description Allows users to use custom emotes in their messages.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class CustomEmotes {
    start() {
        BdApi.showToast("CustomEmotes Plugin Loaded", { type: "info" });
        this.addCustomEmotesButton();
    }

    stop() {
        BdApi.showToast("CustomEmotes Plugin Unloaded", { type: "info" });
    }

    addCustomEmotesButton() {
        const chatBox = document.querySelector("[aria-label='Message #general']");
        if (chatBox) {
            const button = document.createElement("button");
            button.textContent = "Custom Emotes";
            button.onclick = () => {
                this.showCustomEmotes();
            };
            chatBox.parentElement.appendChild(button);
        }
    }

    showCustomEmotes() {
        const modal = document.createElement("div");
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Choose Custom Emote</h2>
                    <div class="emotes-container">
                        <!-- Add your custom emotes here -->
                        <span class="emote">:smile:</span>
                        <span class="emote">:laugh:</span>
                        <span class="emote">:wink:</span>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector(".close");
        closeButton.onclick = () => {
            modal.remove();
        };

        const emotes = modal.querySelectorAll(".emote");
        emotes.forEach(emote => {
            emote.onclick = () => {
                this.insertEmote(emote.textContent);
                modal.remove();
            };
        });
    }

    insertEmote(emote) {
        const chatBox = document.querySelector("[aria-label='Message #general']");
        if (chatBox) {
            chatBox.value += ` ${emote}`;
        }
    }
};
