const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isModalSubmit()) return;
        if (interaction.customId !== 'ticket_modal') return;

        const reason = interaction.fields.getTextInputValue('ticket_reason');
        const subject = interaction.fields.getTextInputValue('ticket_subject');

        const ticketChannel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: 'GUILD_TEXT',
            parent: 'CATEGORY_ID', // Replace with your category ID
            permissionOverwrites: [
                {
                    id: interaction.guild.id,
                    deny: ['VIEW_CHANNEL'],
                },
                {
                    id: interaction.user.id,
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
                {
                    id: 'SUPPORT_ROLE_ID', // Replace with your support role ID
                    allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                },
            ],
        });

        const embed = new MessageEmbed()
            .setTitle(`Ticket: ${subject}`)
            .addField('Created by', `${interaction.user.tag}`)
            .addField('Reason', reason)
            .setColor('#00ff00')
            .setTimestamp();

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('close_ticket')
                    .setLabel('Close Ticket')
                    .setStyle('DANGER')
                    .setEmoji('🔒')
            );

        await ticketChannel.send({ embeds: [embed], components: [row] });
        await interaction.reply({
            content: `Ticket created successfully! ${ticketChannel}`,
            ephemeral: true
        });
    }
};