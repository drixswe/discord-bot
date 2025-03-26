import type { Bot, Listener } from '@common/types'
import { type BaseInteraction, Events, MessageFlags } from 'discord.js'

const InteractionCreate: Listener = {
  name: Events.InteractionCreate,
  execute: async (interaction: BaseInteraction, bot: Bot) => {
    if (!interaction.isChatInputCommand()) return

    const command = bot.commands.get(interaction.commandName)

    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction, bot)
    } catch (error) {
      console.error(error)
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command!',
          flags: MessageFlags.Ephemeral
        })
      } else {
        await interaction.reply({
          content: 'There was an error while executing this command!',
          flags: MessageFlags.Ephemeral
        })
      }
    }
  }
}

export default InteractionCreate
