/**
 * @name ChannelOrganizer
 * @version 1.0.0
 * @description Automatically organizes channels into categories based on predefined rules.
 * @author cptcr
 *
 * @website https://cptcr.cc
 * @invite cptcr
 */


module.exports = class ChannelOrganizer {
    start() {
        BdApi.showToast("ChannelOrganizer Plugin Loaded", { type: "info" });
        this.organizeChannels();
    }

    stop() {
        BdApi.showToast("ChannelOrganizer Plugin Unloaded", { type: "info" });
    }

    organizeChannels() {
        const rules = [
            { category: "Text Channels", regex: /^text-/ },
            { category: "Voice Channels", regex: /^voice-/ },
            { category: "Admin Channels", regex: /^admin-/ }
        ];

        const guildId = BdApi.Webpack.getModule(m => m.getGuildId).getGuildId();

        BdApi.Webpack.getModule(m => m.getGuild).getGuild(guildId).channels.forEach(channel => {
            rules.forEach(rule => {
                if (rule.regex.test(channel.name)) {
                    BdApi.Webpack.getModule(m => m.editChannel).editChannel(channel.guild_id, channel.id, { parent_id: rule.category });
                }
            });
        });
    }
};
