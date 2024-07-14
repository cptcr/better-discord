// Plugin: Direct Message Scheduler Plugin
/**
 * @name DirectMessageScheduler
 * @version 1.0.0
 * @description Allows users to schedule direct messages to be sent at a later time.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class DirectMessageScheduler {
    start() {
        BdApi.showToast("DirectMessageScheduler Plugin Loaded", { type: "info" });
        this.addSchedulerUI();
    }

    stop() {
        BdApi.showToast("DirectMessageScheduler Plugin Unloaded", { type: "info" });
    }

    addSchedulerUI() {
        const dmButtons = document.querySelectorAll("[aria-label='Message User']");
        dmButtons.forEach(button => {
            const schedulerButton = document.createElement("button");
            schedulerButton.textContent = "Schedule DM";
            schedulerButton.onclick = () => {
                this.showSchedulerModal(button);
            };
            button.parentElement.appendChild(schedulerButton);
        });
    }

    showSchedulerModal(button) {
        const userId = button.getAttribute("aria-label").match(/Message (.+)/)[1];
        const modal = document.createElement("div");
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Schedule Direct Message</h2>
                    <textarea id="scheduled-message" placeholder="Enter your message"></textarea>
                    <input type="datetime-local" id="scheduled-time">
                    <button id="schedule-message">Schedule</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        const closeButton = modal.querySelector(".close");
        closeButton.onclick = () => {
            modal.remove();
        };

        const scheduleButton = modal.querySelector("#schedule-message");
        scheduleButton.onclick = () => {
            const message = modal.querySelector("#scheduled-message").value;
            const time = new Date(modal.querySelector("#scheduled-time").value).getTime();
            this.scheduleMessage(userId, message, time);
            modal.remove();
        };
    }

    scheduleMessage(userId, message, time) {
        const delay = time - Date.now();
        if (delay > 0) {
            setTimeout(() => {
                BdApi.Webpack.getModule(m => m.sendMessage).sendMessage(userId, { content: message });
                BdApi.showToast("Direct message sent", { type: "success" });
            }, delay);
        } else {
            BdApi.showToast("Invalid time selected", { type: "error" });
        }
    }
};
