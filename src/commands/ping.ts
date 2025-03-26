import type { Command } from '@common/types'
import {
  SlashCommandBuilder,
  type ChatInputCommandInteraction
} from 'discord.js'

const PingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),
  execute: async (interaction: ChatInputCommandInteraction) => {
    await interaction.reply('Pong!')
  }
}

export default PingCommand
