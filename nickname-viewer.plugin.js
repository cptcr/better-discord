/**
 * @name NicknameViewer
 * @version 1.0.0
 * @description Display the original username alongside the nickname in the server.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { Patcher, WebpackModules } = BdApi;

module.exports = class NicknameViewer {
    start() {
        const MemberListItem = WebpackModules.getModule(m => m.default?.displayName === "MemberListItem");
        Patcher.after(MemberListItem, "default", (thisObject, [props], returnValue) => {
            if (props.user && props.user.username && props.nickname) {
                const originalNameElement = document.createElement('span');
                originalNameElement.style.color = "gray";
                originalNameElement.style.fontSize = "12px";
                originalNameElement.textContent = ` (${props.user.username})`;
                returnValue.props.children[0].props.children.push(originalNameElement);
            }
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
