/**
 * @name FavorizeFriends
 * @version 1.0.0
 * @description Create a folder in the friends list for favorite friends.
 * @author cptcr
 */
module.exports = class FavorizeFriends {
    load() {}
    start() {
        BdApi.showToast("Favorize Friends Plugin Loaded", { type: "info" });
        this.patchFriendsList();
    }
    stop() {
        BdApi.showToast("Favorize Friends Plugin Unloaded", { type: "info" });
        this.unpatchFriendsList();
    }
    patchFriendsList() {
        const FriendsList = BdApi.findModuleByProps("getFriends");
        const FriendRow = BdApi.findModule(m => m.default && m.default.displayName === "FriendRow");
        
        BdApi.Patcher.after("FavorizeFriends", FriendRow, "default", (_, [props], ret) => {
            if (props.user) {
                ret.props.children.push(
                    BdApi.React.createElement("button", {
                        onClick: () => this.favoriteFriend(props.user.id),
                        children: "★"
                    })
                );
            }
            return ret;
        });

        this.createFavoritesSection();
    }
    unpatchFriendsList() {
        BdApi.Patcher.unpatchAll("FavorizeFriends");
    }
    favoriteFriend(userId) {
        const favorites = this.getFavorites();
        if (favorites.includes(userId)) {
            this.setFavorites(favorites.filter(id => id !== userId));
        } else {
            this.setFavorites([...favorites, userId]);
        }
    }
    getFavorites() {
        return BdApi.loadData("FavorizeFriends", "favorites") || [];
    }
    setFavorites(favorites) {
        BdApi.saveData("FavorizeFriends", "favorites", favorites);
    }
    createFavoritesSection() {
        const friendsList = BdApi.findModuleByProps("getFriends").getFriends();
        const favorites = this.getFavorites();
        const favoriteFriends = friendsList.filter(friend => favorites.includes(friend.id));

        const container = document.querySelector(".friends-list-container");
        const favoriteSection = document.createElement("div");
        favoriteSection.className = "favorite-friends-section";
        favoriteSection.innerHTML = `<h2>Favorites</h2>`;

        favoriteFriends.forEach(friend => {
            const friendElement = document.createElement("div");
            friendElement.className = "favorite-friend";
            friendElement.textContent = friend.username;
            favoriteSection.appendChild(friendElement);
        });

        container.prepend(favoriteSection);
    }
};
