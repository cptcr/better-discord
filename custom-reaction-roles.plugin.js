// Plugin: Custom Reaction Roles Plugin
/**
 * @name CustomReactionRoles
 * @version 1.0.0
 * @description Allows users to assign themselves roles by reacting to specific messages.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class CustomReactionRoles {
    start() {
        BdApi.showToast("CustomReactionRoles Plugin Loaded", { type: "info" });
        this.setupReactionRole();
    }

    stop() {
        BdApi.showToast("CustomReactionRoles Plugin Unloaded", { type: "info" });
    }

    setupReactionRole() {
        const messageId = "YOUR_MESSAGE_ID"; // Replace with your message ID
        const roleId = "YOUR_ROLE_ID"; // Replace with your role ID
        const emoji = "👍"; // Replace with your desired emoji

        BdApi.Patcher.after("CustomReactionRoles", BdApi.Webpack.getModule(m => m.addReaction), "addReaction", (thisObject, [channelId, message, emoji], returnValue) => {
            if (message.id === messageId && emoji.name === emoji) {
                const userId = BdApi.Webpack.getModule(m => m.getCurrentUser).getCurrentUser().id;
                BdApi.Webpack.getModule(m => m.addGuildMemberRole).addGuildMemberRole(channelId, userId, roleId);
            }
        });

        BdApi.Patcher.after("CustomReactionRoles", BdApi.Webpack.getModule(m => m.removeReaction), "removeReaction", (thisObject, [channelId, message, emoji, userId], returnValue) => {
            if (message.id === messageId && emoji.name === emoji) {
                BdApi.Webpack.getModule(m => m.removeGuildMemberRole).removeGuildMemberRole(channelId, userId, roleId);
            }
        });
    }
};
