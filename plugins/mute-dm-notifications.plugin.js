/**
 * @name MuteDMNotifications
 * @version 1.0.0
 * @description Mute notifications for direct messages without blocking the sender.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { Patcher, WebpackModules } = BdApi;

module.exports = class MuteDMNotifications {
    start() {
        const NotificationModule = WebpackModules.getByProps("showNotification");
        Patcher.before(NotificationModule, "showNotification", (thisObject, [options]) => {
            if (options.body && options.body.includes("Direct Message")) {
                return false;
            }
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
