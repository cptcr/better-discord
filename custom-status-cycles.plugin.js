/**
 * @name CustomStatusCycles
 * @version 1.0.0
 * @description Cycle through multiple custom statuses at set intervals.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { Patcher, WebpackModules } = BdApi;
const StatusStore = WebpackModules.getByProps("getStatus");
const StatusActions = WebpackModules.getByProps("updateStatus");

module.exports = class CustomStatusCycles {
    start() {
        this.statuses = [
            { text: "Status 1", emoji: "😀" },
            { text: "Status 2", emoji: "😎" },
            { text: "Status 3", emoji: "🚀" },
        ];
        this.index = 0;
        this.interval = setInterval(() => this.cycleStatus(), 60000);
    }

    cycleStatus() {
        const status = this.statuses[this.index];
        StatusActions.updateStatus({ status: "online", customStatus: { text: status.text, emoji: { name: status.emoji } } });
        this.index = (this.index + 1) % this.statuses.length;
    }

    stop() {
        clearInterval(this.interval);
        StatusActions.updateStatus({ status: "online", customStatus: null });
    }
};
