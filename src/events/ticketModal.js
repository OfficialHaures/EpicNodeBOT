const { Modal, TextInputComponent, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return;
        if (interaction.customId !== 'open_ticket_modal') return;

        // Check if user has required role
        const requiredRole = interaction.guild.roles.cache.get('REQUIRED_ROLE_ID');
        if (!interaction.member.roles.cache.has(requiredRole.id)) {
            return interaction.reply({
                content: 'You need the required role to create a ticket!',
                ephemeral: true
            });
        }

        const modal = new Modal()
            .setCustomId('ticket_modal')
            .setTitle('Create a Ticket');

        const reasonInput = new TextInputComponent()
            .setCustomId('ticket_reason')
            .setLabel('Why are you creating this ticket?')
            .setStyle('PARAGRAPH')
            .setRequired(true)
            .setPlaceholder('Explain your reason here...');

        const subjectInput = new TextInputComponent()
            .setCustomId('ticket_subject')
            .setLabel('Subject')
            .setStyle('SHORT')
            .setRequired(true)
            .setPlaceholder('Brief subject of your ticket');

        const firstRow = new MessageActionRow().addComponents(subjectInput);
        const secondRow = new MessageActionRow().addComponents(reasonInput);

        modal.addComponents(firstRow, secondRow);
        await interaction.showModal(modal);
    }
};
