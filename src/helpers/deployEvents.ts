import type { Bot, Listener } from '@common/types'
import fs from 'node:fs'
import path from 'node:path'

export const deployEvents = (bot: Bot) => {
  const eventsPath = path.join(__dirname, '../events')
  const eventFiles = fs
    .readdirSync(eventsPath)
    .filter((file) => file.endsWith('.ts'))

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file)
    const event: Listener = require(filePath).default
    if (!event) return

    if (event.once) {
      bot.once(event.name, (...args) => event.execute(...args, bot))
    } else {
      bot.on(event.name, (...args) => event.execute(...args, bot))
    }
  }
}
