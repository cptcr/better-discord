/**
 * @name CustomFonts
 * @version 1.0.0
 * @description Allows users to change the font of Discord.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class CustomFonts {
    start() {
        BdApi.showToast("CustomFonts Plugin Loaded", { type: "info" });
        this.applyCustomFonts();
    }

    stop() {
        BdApi.showToast("CustomFonts Plugin Unloaded", { type: "info" });
    }

    applyCustomFonts() {
        const fontFamily = "Comic Sans MS"; // Replace with desired font family
        const style = document.createElement('style');
        style.innerHTML = `* { font-family: '${fontFamily}' !important; }`;
        document.head.appendChild(style);
    }
};
