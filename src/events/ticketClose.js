const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'close_ticket') return;

        const embed = new MessageEmbed()
            .setTitle('Ticket Closing')
            .setDescription('This ticket will be closed in 5 seconds.')
            .setColor('#ff0000');

        await interaction.reply({ embeds: [embed] });

        setTimeout(async () => {
            await interaction.channel.delete();
        }, 5000);
    }
};
