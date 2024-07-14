/**
 * @name CustomSoundboard
 * @version 1.0.0
 * @description Adds a custom soundboard to play sound effects in voice channels.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class CustomSoundboard {
    start() {
        BdApi.showToast("CustomSoundboard Plugin Loaded", { type: "info" });
        this.addSoundboardUI();
    }

    stop() {
        BdApi.showToast("CustomSoundboard Plugin Unloaded", { type: "info" });
    }

    addSoundboardUI() {
        const voiceControls = document.querySelector(".buttons-3JBrkn");
        if (voiceControls) {
            const soundboardButton = document.createElement("button");
            soundboardButton.textContent = "Soundboard";
            soundboardButton.onclick = () => {
                this.showSoundboardModal();
            };
            voiceControls.appendChild(soundboardButton);
        }
    }

    showSoundboardModal() {
        const modal = document.createElement("div");
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Soundboard</h2>
                    <div class="soundboard-buttons">
                        <button class="sound-button" data-sound="sound1.mp3">Sound 1</button>
                        <button class="sound-button" data-sound="sound2.mp3">Sound 2</button>
                        <button class="sound-button" data-sound="sound3.mp3">Sound 3</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector(".close");
        closeButton.onclick = () => {
            modal.remove();
        };

        const soundButtons = modal.querySelectorAll(".sound-button");
        soundButtons.forEach(button => {
            button.onclick = () => {
                this.playSound(button.dataset.sound);
            };
        });
    }

    playSound(sound) {
        const audio = new Audio(`path/to/sounds/${sound}`);
        audio.play();
    }
};
