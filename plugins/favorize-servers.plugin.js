/**
 * @name FavorizeServers
 * @version 1.0.0
 * @description Create a starred icon which displays only the favorite servers.
 * @author cptcr
 */
module.exports = class FavorizeServers {
    load() {}
    start() {
        BdApi.showToast("Favorize Servers Plugin Loaded", { type: "info" });
        this.patchServerList();
    }
    stop() {
        BdApi.showToast("Favorize Servers Plugin Unloaded", { type: "info" });
        this.unpatchServerList();
    }
    patchServerList() {
        const GuildList = BdApi.findModule(m => m.default && m.default.displayName === "Guild");
        BdApi.Patcher.after("FavorizeServers", GuildList, "default", (_, [props], ret) => {
            if (props.guild) {
                ret.props.children.push(
                    BdApi.React.createElement("button", {
                        onClick: () => this.favoriteServer(props.guild.id),
                        children: "★"
                    })
                );
            }
            return ret;
        });

        this.createFavoritesButton();
    }
    unpatchServerList() {
        BdApi.Patcher.unpatchAll("FavorizeServers");
    }
    favoriteServer(guildId) {
        const favorites = this.getFavorites();
        if (favorites.includes(guildId)) {
            this.setFavorites(favorites.filter(id => id !== guildId));
        } else {
            this.setFavorites([...favorites, guildId]);
        }
    }
    getFavorites() {
        return BdApi.loadData("FavorizeServers", "favorites") || [];
    }
    setFavorites(favorites) {
        BdApi.saveData("FavorizeServers", "favorites", favorites);
    }
    createFavoritesButton() {
        const header = document.querySelector(".header-toolbar");
        const button = document.createElement("button");
        button.className = "favorite-servers-button";
        button.innerHTML = "★";
        button.onclick = () => this.toggleFavoriteServers();
        header.appendChild(button);
    }
    toggleFavoriteServers() {
        const guilds = document.querySelectorAll(".guilds-wrapper .guild");
        const favorites = this.getFavorites();
        guilds.forEach(guild => {
            const guildId = guild.getAttribute("data-guild-id");
            if (favorites.includes(guildId)) {
                guild.style.display = "block";
            } else {
                guild.style.display = "none";
            }
        });
    }
};
