/**
 * @name MessageTimestampFormatter
 * @version 1.0.0
 * @description Customize the format of message timestamps.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { Patcher, WebpackModules } = BdApi;
const moment = WebpackModules.getByProps("moment");

module.exports = class MessageTimestampFormatter {
    start() {
        const Message = WebpackModules.getModule(m => m.type?.displayName === "Message");
        Patcher.after(Message, "type", (thisObject, [props], returnValue) => {
            const timestamp = props.message.timestamp;
            const formattedTime = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
            const timestampElement = returnValue.props.children[0].props.children[1];
            timestampElement.props.children = formattedTime;
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
