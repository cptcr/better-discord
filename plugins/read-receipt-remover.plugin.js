/**
 * @name ReadReceiptRemover
 * @version 1.0.0
 * @description Remove read receipts so others can't see when you've read their messages.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { Patcher, WebpackModules } = BdApi;
const ReadStateStore = WebpackModules.getByProps("getUnreadCount");

module.exports = class ReadReceiptRemover {
    start() {
        Patcher.before(ReadStateStore, "markChannelRead", () => false);
    }

    stop() {
        Patcher.unpatchAll();
    }
};
