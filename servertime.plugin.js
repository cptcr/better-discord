/**
 * @name ServerTime
 * @version 1.0.0
 * @description Displays the current server time in the server info.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class ServerTime {
    start() {
        BdApi.showToast("ServerTime Plugin Loaded", { type: "info" });
        this.showServerTime();
    }

    stop() {
        BdApi.showToast("ServerTime Plugin Unloaded", { type: "info" });
    }

    showServerTime() {
        const serverInfo = document.querySelector(".headerBar-1it3bQ");
        if (serverInfo) {
            const timeContainer = document.createElement("div");
            timeContainer.className = "server-time";
            serverInfo.appendChild(timeContainer);

            this.updateTime(timeContainer);
            setInterval(() => this.updateTime(timeContainer), 1000); // Update time every second
        }
    }

    updateTime(container) {
        const currentTime = new Date().toLocaleTimeString();
        container.innerHTML = `Server Time: ${currentTime}`;
    }
};
