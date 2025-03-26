import type {
  ChatInputCommandInteraction,
  Client,
  Collection,
  Events,
  SlashCommandBuilder
} from 'discord.js'

export interface Bot extends Client {
  commands: Collection<string, Command>
}

export interface Command {
  data: SlashCommandBuilder
  execute(interaction: ChatInputCommandInteraction, ...args: any): void
}

export interface Listener {
  name: Events | string
  once?: boolean
  execute(...args: any): void
}
