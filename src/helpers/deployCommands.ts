import type { Bot, Command } from '@common/types'
import { REST, Routes } from 'discord.js'
import fs from 'node:fs'
import path from 'node:path'

if (!process.env.TOKEN || !process.env.CLIENT_ID) {
  console.error('Missing environment variables.')
  process.exit(1)
}

const readCommandFiles = (bot: Bot) => {
  const commandsPath = path.join(__dirname, '../commands')
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.ts'))

  const commands = []

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command: Command = require(filePath).default
    if (!command) return

    if (command.data && typeof command.execute === 'function') {
      bot.commands.set(command.data.name, command)
      commands.push(command.data.toJSON())
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      )
    }
  }

  return commands
}

const initializeCommands = async (commands: any[], rest: REST) => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    )

    const data: any = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID as string),
      { body: commands }
    )

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    )
  } catch (error) {
    console.error(error)
  }
}

export const deployCommands = async (bot: Bot) => {
  const slashCommands = readCommandFiles(bot)

  const rest = new REST({ version: '10' }).setToken(
    process.env.TOKEN as string
  )

  if (!slashCommands) return
  initializeCommands([...slashCommands], rest)
}
