import type { Bot, Command } from '@common/types'
import {
  MessageFlags,
  PermissionFlagsBits,
  SlashCommandBuilder,
  type ChatInputCommandInteraction
} from 'discord.js'

const ReloadCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reloads all commands.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  execute: async (interaction: ChatInputCommandInteraction, bot: Bot) => {
    try {
      for (const command of bot.commands.values()) {
        delete require.cache[require.resolve(`./${command.data.name}.ts`)]
        const newCommand = require(`./${command.data.name}.ts`).default
        bot.commands.set(newCommand.data.name, newCommand)
      }

      await interaction.reply({
        content: 'Commands reloaded!',
        flags: MessageFlags.Ephemeral
      })
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: 'There was an error while reloading commands.',
        flags: MessageFlags.Ephemeral
      })
    }
  }
}

export default ReloadCommand
