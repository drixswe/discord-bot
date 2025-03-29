# Template Discord Bot

This repository provides a robust and scalable template for creating Discord bots using TypeScript. The template is designed to facilitate bot development with an organized structure and modern features. We use the [discord.js](https://discord.js.org/) package.

### How to get a token?

To get your bot token, go to the [Discord Developer Portal](https://discord.com/developers/applications). Create a new application, then go to the "Bot" tab. Your token will appear there - copy it and keep it secure. Never share this token, as it controls your bot.

## Commands

Each command **must export a default object** that follows the `Command` type. This is required because the bot's command handler automatically loads and registers all default exports from the `src/commands/` directory.

```ts
import type { Command } from '@common/types';
import { SlashCommandBuilder } from 'discord.js';

const MyCommand: Command = {
  data: new SlashCommandBuilder()
    .setName('command-name')
    .setDescription('Command description'),
  execute: async (interaction) => {
    // Command logic here
  }
};

export default MyCommand; // Must be default export!
```

Slash commands (/) are Discord's modern way of handling bot interactions. For more information please check the [guide](https://discordjs.guide/slash-commands/advanced-creation.html).

## Events

Events allow reacting to various Discord actions like messages, interactions, status changes, etc. Each event **must export a default object** that follows the `Event` type. This is required because the bot's event handler automatically loads and registers all default exports from the `src/events/` directory.

```ts
import type { Event } from '@common/types';
import { Events } from 'discord.js';

const MyEvent: Event = {
  name: Events.EventName, // The Discord.js event to listen to
  once: true, // False by default
  execute: (...args) => {
    // Event logic here
  }
};

export default MyEvent; // Must be default export!
```

> [!WARNING]
> ONCE events: The handler runs only the first time the event occurs (perfect for initialization)
