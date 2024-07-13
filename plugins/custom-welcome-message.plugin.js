/**
 * @name CustomWelcomeMessages
 * @version 1.0.0
 * @description Allow server owners to set custom welcome messages for new members.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */
const { WebpackModules, Patcher } = BdApi;
const WelcomeMessageStore = {};

module.exports = class CustomWelcomeMessages {
    start() {
        const GuildMemberAdd = WebpackModules.getModule(m => m.default?.displayName === "GuildMemberAdd");
        Patcher.after(GuildMemberAdd, "default", (thisObject, [props], returnValue) => {
            const welcomeMessage = WelcomeMessageStore[props.guild.id] || "Welcome to the server!";
            const welcomeElement = document.createElement('div');
            welcomeElement.className = "custom-welcome-message";
            welcomeElement.innerText = welcomeMessage;
            document.querySelector('.members-1998pB').prepend(welcomeElement);
        });
    }

    stop() {
        Patcher.unpatchAll();
    }
};
