/**
 * @name CustomStatus
 * @version 1.0.0
 * @description Allows setting custom statuses with more control and options.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class CustomStatus {
    start() {
        BdApi.showToast("CustomStatus Plugin Loaded", { type: "info" });
        this.addCustomStatusOption();
    }

    stop() {
        BdApi.showToast("CustomStatus Plugin Unloaded", { type: "info" });
    }

    addCustomStatusOption() {
        const statusButton = document.querySelector("[aria-label='Set Status']");
        if (statusButton) {
            statusButton.addEventListener("click", () => {
                this.createCustomStatusModal();
            });
        }
    }

    createCustomStatusModal() {
        const modal = document.createElement("div");
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Set Custom Status</h2>
                    <input type="text" id="custom-status" placeholder="Enter your custom status">
                    <button id="set-status">Set Status</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector(".close");
        closeButton.onclick = () => {
            modal.remove();
        };

        const setStatusButton = modal.querySelector("#set-status");
        setStatusButton.onclick = () => {
            const status = modal.querySelector("#custom-status").value;
            this.setCustomStatus(status);
            modal.remove();
        };
    }

    setCustomStatus(status) {
        // Implement the logic to set the custom status
        BdApi.showToast(`Custom Status set to: ${status}`, { type: "success" });
    }
};
