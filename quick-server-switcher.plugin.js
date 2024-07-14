/**
 * @name QuickServerSwitcher
 * @version 1.0.0
 * @description Quickly switch between favorite servers using keyboard shortcuts.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher, React } = BdApi;

module.exports = class QuickServerSwitcher {
    start() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown(event) {
        if (event.altKey && event.key >= '1' && event.key <= '5') {
            const serverIndex = parseInt(event.key) - 1;
            const favoriteServers = WebpackModules.getByProps("getGuilds").getGuilds();
            const serverArray = Object.values(favoriteServers);
            if (serverArray[serverIndex]) {
                window.location.href = `https://discord.com/channels/${serverArray[serverIndex].id}`;
            }
        }
    }

    stop() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }
};
