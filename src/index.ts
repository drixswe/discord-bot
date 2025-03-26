import type { Bot, Command } from '@common/types'
import { deployCommands } from '@helpers/deployCommands'
import { deployEvents } from '@helpers/deployEvents'
import { Client, Collection, GatewayIntentBits } from 'discord.js'

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
}) as Bot

client.commands = new Collection<string, Command>()
deployCommands(client)
deployEvents(client)

client.login(process.env.TOKEN)
