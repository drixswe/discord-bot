import type { Listener } from '@common/types'
import { Events } from 'discord.js'

const ClientReady: Listener = {
  name: Events.ClientReady,
  execute: (client) => {
    console.log(`Logged in as ${client.user?.tag}!`)
  }
}

export default ClientReady
