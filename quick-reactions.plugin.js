/**
 * @name QuickReactions
 * @version 1.0.0
 * @description Adds a quick reaction button to messages.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class QuickReactions {
    start() {
        BdApi.showToast("QuickReactions Plugin Loaded", { type: "info" });
        this.addQuickReactionButton();
    }

    stop() {
        BdApi.showToast("QuickReactions Plugin Unloaded", { type: "info" });
    }

    addQuickReactionButton() {
        const messageContextMenu = BdApi.Webpack.getModule(m => m.default?.displayName === "MessageContextMenu");
        if (messageContextMenu) {
            BdApi.Patcher.after("QuickReactions", messageContextMenu, "default", (thisObject, [props], returnValue) => {
                returnValue.props.children.push(
                    BdApi.React.createElement("div", {
                        className: "quick-reaction",
                        onClick: () => this.addReaction(props.message)
                    }, "Quick Reaction")
                );
            });
        }
    }

    addReaction(message) {
        const emoji = "👍"; // Replace with desired emoji
        BdApi.Webpack.getModule(m => m.addReaction).addReaction(message.channel_id, message.id, emoji);
    }
};
