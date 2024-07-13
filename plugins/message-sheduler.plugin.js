/**
 * @name MessageScheduler
 * @version 1.0.0
 * @description Allows you to schedule messages to be sent at a later time.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

module.exports = class MessageScheduler {
    start() {
        BdApi.showToast("MessageScheduler Plugin Loaded", { type: "info" });
        this.addSchedulerUI();
    }

    stop() {
        BdApi.showToast("MessageScheduler Plugin Unloaded", { type: "info" });
    }

    addSchedulerUI() {
        const chatBox = document.querySelector("[aria-label='Message #general']");
        if (chatBox) {
            const schedulerButton = document.createElement("button");
            schedulerButton.textContent = "Schedule Message";
            schedulerButton.onclick = () => {
                this.showSchedulerModal();
            };
            chatBox.parentElement.appendChild(schedulerButton);
        }
    }

    showSchedulerModal() {
        const modal = document.createElement("div");
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <h2>Schedule Message</h2>
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
            this.scheduleMessage(message, time);
            modal.remove();
        };
    }

    scheduleMessage(message, time) {
        const delay = time - Date.now();
        if (delay > 0) {
            setTimeout(() => {
                const chatBox = document.querySelector("[aria-label='Message #general']");
                chatBox.value = message;
                const sendButton = chatBox.parentElement.querySelector("button[type='submit']");
                sendButton.click();
            }, delay);
        } else {
            BdApi.showToast("Invalid time selected", { type: "error" });
        }
    }
};
