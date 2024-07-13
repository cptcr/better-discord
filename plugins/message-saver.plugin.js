/**
 * @name MessageSaver
 * @version 1.0.0
 * @description Allows users to save messages for later reference.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class MessageSaver {
    constructor() {
        this.savedMessages = [];
    }

    start() {
        BdApi.showToast("MessageSaver Plugin Loaded", { type: "info" });
        this.addSaveMessageButton();
    }

    stop() {
        BdApi.showToast("MessageSaver Plugin Unloaded", { type: "info" });
    }

    addSaveMessageButton() {
        const messageContextMenu = BdApi.Webpack.getModule(m => m.default?.displayName === "MessageContextMenu");
        if (messageContextMenu) {
            BdApi.Patcher.after("MessageSaver", messageContextMenu, "default", (thisObject, [props], returnValue) => {
                returnValue.props.children.push(
                    BdApi.React.createElement("div", {
                        className: "save-message",
                        onClick: () => this.saveMessage(props.message)
                    }, "Save Message")
                );
            });
        }
    }

    saveMessage(message) {
        this.savedMessages.push(message);
        BdApi.showToast("Message saved", { type: "success" });
    }
};
