/**
 * @name DirectMessageShortcut
 * @version 1.0.0
 * @description Adds a button to quickly open direct messages with a user.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class DirectMessageShortcut {
    start() {
        BdApi.showToast("DirectMessageShortcut Plugin Loaded", { type: "info" });
        this.addDmButton();
    }

    stop() {
        BdApi.showToast("DirectMessageShortcut Plugin Unloaded", { type: "info" });
    }

    addDmButton() {
        const userContextMenu = BdApi.Webpack.getModule(m => m.default?.displayName === "UserContextMenu");
        if (userContextMenu) {
            BdApi.Patcher.after("DirectMessageShortcut", userContextMenu, "default", (thisObject, [props], returnValue) => {
                const userId = props.user.id;
                returnValue.props.children.push(
                    BdApi.React.createElement("div", {
                        className: "dm-shortcut",
                        onClick: () => this.openDirectMessage(userId)
                    }, "Open DM")
                );
            });
        }
    }

    openDirectMessage(userId) {
        BdApi.Webpack.getModule(m => m.openPrivateChannel).openPrivateChannel(userId);
        BdApi.showToast(`Opened DM with user ${userId}`, { type: "success" });
    }
};
