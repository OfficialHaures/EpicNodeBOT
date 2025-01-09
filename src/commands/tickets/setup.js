const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ticketsetup')
        .setDescription('Setup the ticket system'),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setTitle('🎫 Support Tickets')
            .setDescription('Click the button below to create a support ticket')
            .setColor('#0099ff');

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('open_ticket_modal')
                    .setLabel('Create Ticket')
                    .setStyle('PRIMARY')
                    .setEmoji('🎫')
            );

        await interaction.channel.send({ embeds: [embed], components: [row] });
        await interaction.reply({ content: 'Ticket system setup complete!', ephemeral: true });
    }
};
