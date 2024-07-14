/**
 * @name ServerStats
 * @version 1.0.0
 * @description Displays server statistics such as member count and online count.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class ServerStats {
    start() {
        BdApi.showToast("ServerStats Plugin Loaded", { type: "info" });
        this.displayServerStats();
    }

    stop() {
        BdApi.showToast("ServerStats Plugin Unloaded", { type: "info" });
    }

    displayServerStats() {
        const sidebar = document.querySelector(".sidebar-1tnWFu");
        if (sidebar) {
            const statsContainer = document.createElement("div");
            statsContainer.className = "server-stats";
            sidebar.appendChild(statsContainer);

            this.updateStats(statsContainer);
            setInterval(() => this.updateStats(statsContainer), 60000); // Update stats every minute
        }
    }

    updateStats(container) {
        const guildId = BdApi.findModuleByProps("getGuildId").getGuildId();
        const memberCount = BdApi.findModuleByProps("getMemberCounts").getMemberCounts(guildId).total;
        const onlineCount = BdApi.findModuleByProps("getStatus").getStatus().online;

        container.innerHTML = `
            <div>Members: ${memberCount}</div>
            <div>Online: ${onlineCount}</div>
        `;
    }
};
