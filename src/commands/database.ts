import type { Command } from '@common/types'
import { getUsers } from '@database/services/users'
import {
  Colors,
  EmbedBuilder,
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
  type ChatInputCommandInteraction
} from 'discord.js'

const DatabaseCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('database')
    .setDescription('Display all the database information')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async (interaction: ChatInputCommandInteraction) => {
    const users = await getUsers()

    const embed = new EmbedBuilder()
      .setTitle('Database Information')
      .setColor(Colors.Blurple)
      .addFields({
        name: 'Users',
        value: `${users.length} users.`,
        inline: true
      })
      .setTimestamp()

    await interaction.reply({
      embeds: [embed],
      flags: MessageFlags.Ephemeral
    })
  }
}

export default DatabaseCommand
