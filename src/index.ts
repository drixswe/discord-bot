import type { Bot, Command } from '@common/types'
import { Client, Collection, GatewayIntentBits } from 'discord.js'

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
}) as Bot

const commands = new Collection<string, Command>()

client.login(process.env.TOKEN)
