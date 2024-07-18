/**
 * @name Message Forwarder
 * @version 1.0.0
 * @description Forwards messages to specified friends or channels
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */

const { Patcher, WebpackModules, DCM, React, BdApi, DiscordModules } = window.BdApi;

class MessageForwarder {
  getName() {
    return "MessageForwarder";
  }

  getVersion() {
    return "1.0.0";
  }

  getAuthor() {
    return "Your Name";
  }

  getDescription() {
    return "Forwards messages to specified friends or channels";
  }

  start() {
    this.patchMessageContextMenu();
  }

  stop() {
    Patcher.unpatchAll();
  }

  patchMessageContextMenu() {
    const MessageContextMenu = WebpackModules.find(m => m.default && m.default.displayName === "MessageContextMenu");
    
    Patcher.after(MessageContextMenu, "default", (thisObject, [props], returnValue) => {
      const message = props.message;

      const forwardMenuItem = DCM.buildMenuItem({
        label: "Forward Message",
        action: () => this.showForwardDialog(message)
      });

      const children = returnValue.props.children;
      if (Array.isArray(children)) {
        children.push(forwardMenuItem);
      } else {
        returnValue.props.children = [children, forwardMenuItem];
      }
    });
  }

  showForwardDialog(message) {
    const ChannelStore = DiscordModules.ChannelStore;
    const UserStore = DiscordModules.UserStore;
    const ModalStack = DiscordModules.ModalStack;
    const ModalRoot = WebpackModules.findByDisplayName("FluxContainer(ModalRoot)");

    const forwardDialog = BdApi.React.createElement(
      ModalRoot,
      {
        size: "large",
        className: "message-forwarder-modal"
      },
      BdApi.React.createElement(
        "div",
        { className: "message-forwarder-container" },
        BdApi.React.createElement(
          "h2",
          null,
          "Forward Message"
        ),
        BdApi.React.createElement(
          "textarea",
          {
            className: "message-forwarder-textarea",
            readOnly: true,
            value: `# Forwarded message from ${message.author.username}\n> ${message.content}`
          }
        ),
        BdApi.React.createElement(
          "select",
          {
            className: "message-forwarder-select",
            multiple: true,
            size: 10
          },
          Object.values(ChannelStore.getChannels()).map(channel =>
            BdApi.React.createElement("option", { value: channel.id }, `Channel: ${channel.guild_id ? channel.guild_id + " - " : ""}${channel.name}`)
          ),
          Object.values(UserStore.getUsers()).map(user =>
            BdApi.React.createElement("option", { value: user.id }, `Friend: ${user.username}`)
          )
        ),
        BdApi.React.createElement(
          "button",
          {
            className: "message-forwarder-button",
            onClick: () => {
              const selected = document.querySelector(".message-forwarder-select").selectedOptions;
              for (let i = 0; i < selected.length; i++) {
                const value = selected[i].value;
                if (value.startsWith("Friend: ")) {
                  this.forwardMessageToUser(value.replace("Friend: ", ""), message);
                } else if (value.startsWith("Channel: ")) {
                  this.forwardMessageToChannel(value.replace("Channel: ", ""), message);
                }
              }
              ModalStack.pop();
            }
          },
          "Forward"
        )
      )
    );

    ModalStack.push(forwardDialog);
  }

  forwardMessageToUser(userId, message) {
    const { PrivateChannelActions } = DiscordModules;
    PrivateChannelActions.openPrivateChannel(userId).then(channel => {
      this.sendMessage(channel.id, message);
    });
  }

  forwardMessageToChannel(channelId, message) {
    this.sendMessage(channelId, message);
  }

  sendMessage(channelId, message) {
    const SendMessage = WebpackModules.findByProps("sendMessage");
    SendMessage.sendMessage(channelId, {
      content: `# Forwarded message from ${message.author.username}\n> ${message.content}`
    });
  }
}

module.exports = MessageForwarder;
