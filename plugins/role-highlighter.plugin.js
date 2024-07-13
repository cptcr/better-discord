/**
 * @name RoleHighlighter
 * @version 1.0.0
 * @description Highlights members with specific roles in the user list.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class RoleHighlighter {
    start() {
        BdApi.showToast("RoleHighlighter Plugin Loaded", { type: "info" });
        this.highlightRoles();
    }

    stop() {
        BdApi.showToast("RoleHighlighter Plugin Unloaded", { type: "info" });
    }

    highlightRoles() {
        const roleId = "ROLE_ID_HERE"; // Replace with the role ID to highlight
        const color = "#FFD700"; // Replace with your desired highlight color

        BdApi.Patcher.after("RoleHighlighter", BdApi.Webpack.getModule(m => m.render), "render", (thisObject, [props], returnValue) => {
            const member = props.user;
            if (member.roles.includes(roleId)) {
                returnValue.props.style = { backgroundColor: color };
            }
        });
    }
};
