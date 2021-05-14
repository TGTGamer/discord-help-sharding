
/**========================================================================
 * All database functionality removed for testing perposes when uploaded
 * to github. Was tested with database included on local machine. 
 * to reactivate database - see github thread: 
 * https://github.com/discordjs/discord.js/issues/5581
 *========================================================================**/


import { PrismaClient } from '@prisma/client'
import {
  loggingDataClass,
  LoggingLevels,
  loggingOptions
} from '@videndum/utilities'
import Discord, {
  Collection,
  CommandInteraction as CI,
  Intents,
  Interaction as I,
  Message as M,
  MessageEmbed
} from 'discord.js'
import { EventEmitter } from 'events'
import fetch from 'node-fetch'
import { Config } from '../config'
import { Database } from './database'
import { L } from './log'
import { Command, Commands, Cooldowns, Packages, Prompts } from './packages'

/**========================================================================
 *                           Types & Interfaces
 *========================================================================**/

export interface Message extends M {
  recievedTime?: Date
  cmd?: Partial<Command>
  prefix?: string
}

export interface Interaction extends I {
  isCommand(): this is CommandInteraction
}

export interface CommandInteraction extends CI {
  recievedTime?: Date
  cmd?: Partial<Command>
  author: CI['user']
  prefix: string
}

export type Embeds = Collection<string, () => Promise<MessageEmbed>>

export interface Extensions {
  [x: string]: unknown
}

export interface Modules {
  commands: Commands
  cooldowns: Cooldowns
  embeds: Embeds
  prompts: Prompts
  [x: string]: unknown
}

/**========================================================================
 *                           Bot Root Class
 *========================================================================**/

export class Root extends EventEmitter {
  discord = Discord
  packages: Packages
  config: Config = require('../config.json')
  client = new Discord.Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.DIRECT_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_WEBHOOKS
    ]
  })
  databaseClass: Database
  database: PrismaClient
  modules: Modules = {
    cooldowns: new Discord.Collection(),
    commands: new Discord.Collection(),
    embeds: new Discord.Collection(),
    prompts: new Discord.Collection()
  }
  extensions: Extensions = {}
  fetch = fetch
  L = L
  log = (
    name: LoggingLevels,
    message: loggingOptions['message'],
    options?: loggingOptions['options']
  ) => {
    const data = new loggingDataClass(name, message, options)
    this.emit(name.toString(), data)
    this.L.log(new loggingDataClass(name, message, options))
  }
  i18 = this.L.i18

  constructor() {
    super()
    let token =
      process.env.TOKEN || process.env.NPM_PACKAGE_TOKEN || this.config.token
    if (!token) throw new Error('Token is not set')

    // Setup Database
    this.databaseClass = new Database({ root: this })
    this.database = this.databaseClass.prisma
    

    this.packages = new Packages(this)
    this.loadEvents()

    // Setup Login
    this.client.login()

    // Setup Events
    this.client.on('error', e =>
      this.log(LoggingLevels.emergency, 'client.events', {
        errors: e,
        translate: true,
        T: {
          replace: {
            this: e.message
          }
        }
      })
    )
    this.client.on('warn', e =>
      this.log(LoggingLevels.warn, 'client.events', {
        translate: true,
        T: {
          replace: {
            this: e
          }
        }
      })
    )
    this.client.on('debug', e =>
      this.log(LoggingLevels.debug, 'client.events', {
        translate: true,
        T: {
          replace: {
            this: e
          }
        }
      })
    )
    this.client.on('*', this.emit)
  }

  loadEvents() {
    this.on('commandCompleted', () => {
      this.log(LoggingLevels.debug, 'events.commandCompleted', {
        translate: true
      })
    })
    this.on('CommandUnknown', (message: any) => {
      this.log(LoggingLevels.info, 'events.botLoaded.readyAt', {
        translate: true,
        T: {
          replace: {
            this: message
          }
        }
      })
    })
  }

  async getPrefixes(guildID?: string) {
    const prefixes =
      process.env.NODE_ENV == 'dev' || process.env.NODE_ENV == 'development'
        ? this.config.prefix?.dev
        : process.env.NODE_ENV == 'staging' || process.env.NODE_ENV == 'stag'
        ? this.config.prefix?.staging
        : this.config.prefix?.prod
    if (guildID) {
      const guild = await this.database.guild.findUnique({
        where: { id: guildID }
      })
      if (guild && guild.prefix) prefixes?.push(guild.prefix.toString())
    }
    return prefixes
  }
}

new Root()
