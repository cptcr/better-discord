/**
 * @name ThemeSwitcher
 * @version 1.0.0
 * @description Allows users to quickly switch between different themes.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class ThemeSwitcher {
    start() {
        BdApi.showToast("ThemeSwitcher Plugin Loaded", { type: "info" });
        this.addThemeSwitcherButton();
    }

    stop() {
        BdApi.showToast("ThemeSwitcher Plugin Unloaded", { type: "info" });
    }

    addThemeSwitcherButton() {
        const settingsButton = document.querySelector("[aria-label='User Settings']");
        if (settingsButton) {
            const button = document.createElement("button");
            button.textContent = "Switch Theme";
            button.onclick = () => {
                this.showThemeSwitcher();
            };
            settingsButton.parentElement.appendChild(button);
        }
    }

    showThemeSwitcher() {
        const modal = document.createElement("div");
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Choose Theme</h2>
                    <div class="themes-container">
                        <!-- Add your themes here -->
                        <button class="theme-button" data-theme="theme1">Theme 1</button>
                        <button class="theme-button" data-theme="theme2">Theme 2</button>
                        <button class="theme-button" data-theme="theme3">Theme 3</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector(".close");
        closeButton.onclick = () => {
            modal.remove();
        };

        const themeButtons = modal.querySelectorAll(".theme-button");
        themeButtons.forEach(button => {
            button.onclick = () => {
                this.switchTheme(button.dataset.theme);
                modal.remove();
            };
        });
    }

    switchTheme(theme) {
        // Implement the logic to switch to the selected theme
        BdApi.showToast(`Switched to ${theme}`, { type: "success" });
    }
};
