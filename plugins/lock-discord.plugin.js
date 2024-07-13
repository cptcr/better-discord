/**
 * @name LockDiscord
 * @version 1.0.0
 * @description Lock Discord with a password or passcode.
 * @author cptcr
 */
module.exports = class LockDiscord {
    load() {}
    start() {
        BdApi.showToast("Lock Discord Plugin Loaded", { type: "info" });
        this.checkLock();
    }
    stop() {
        BdApi.showToast("Lock Discord Plugin Unloaded", { type: "info" });
    }
    checkLock() {
        const password = BdApi.loadData("LockDiscord", "password");
        if (password) {
            this.showLockScreen();
        }
    }
    showLockScreen() {
        const lockScreen = document.createElement("div");
        lockScreen.className = "lock-screen";
        lockScreen.style.position = "fixed";
        lockScreen.style.top = "0";
        lockScreen.style.left = "0";
        lockScreen.style.width = "100%";
        lockScreen.style.height = "100%";
        lockScreen.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        lockScreen.style.display = "flex";
        lockScreen.style.justifyContent = "center";
        lockScreen.style.alignItems = "center";
        lockScreen.style.zIndex = "9999";
        lockScreen.innerHTML = `
            <div style="text-align: center;">
                <h1 style="color: #FFF;">Locked</h1>
                <input type="password" id="lockPassword" placeholder="Enter password" style="padding: 10px; border-radius: 5px; border: none;">
                <button id="unlockButton" style="padding: 10px; border-radius: 5px; margin-top: 10px;">Unlock</button>
            </div>
        `;
        document.body.appendChild(lockScreen);
        document.getElementById("unlockButton").onclick = () => this.unlockDiscord();
    }
    unlockDiscord() {
        const password = BdApi.loadData("LockDiscord", "password");
        const inputPassword = document.getElementById("lockPassword").value;
        if (inputPassword === password) {
            document.querySelector(".lock-screen").remove();
        } else {
            BdApi.showToast("Incorrect Password", { type: "error" });
        }
    }
    setPassword(newPassword) {
        BdApi.saveData("LockDiscord", "password", newPassword);
    }
};
