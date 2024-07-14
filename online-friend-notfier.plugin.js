/**
 * @name OnlineFriendNotifier
 * @version 1.0.0
 * @description Notify the user when a specific friend comes online.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher } = BdApi;
const friendId = "FRIEND_USER_ID_HERE"; // Replace with your friend's user ID

module.exports = class OnlineFriendNotifier {
    start() {
        const StatusStore = WebpackModules.getByProps("getStatus");
        const originalGetStatus = StatusStore.getStatus;
        Patcher.before(StatusStore, "getStatus", (thisObject, [userId]) => {
            if (userId === friendId && originalGetStatus(friendId) === "offline") {
                BdApi.showToast(`${friendId} is now online!`, { type: "info" });
            }
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
