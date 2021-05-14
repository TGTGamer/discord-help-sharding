import { loggingDataClass, LoggingLevels } from '@videndum/utilities'
import * as Discord from 'discord.js'
import { Config } from '../config'
import { L } from './log'

const config: Config = require('../config.json')

const manager = new Discord.ShardingManager(`${__dirname}/bot.js`, {
  token: process.env.TOKEN || process.env.NPM_PACKAGE_TOKEN || config.token
})

manager.on('shardCreate', (shard: any) => {
  L.log(
    new loggingDataClass(LoggingLevels.notice, `Launching shard ${shard.id}`)
  )
})

manager.spawn().catch((reason: any) => {
  if (reason && reason.size > 0)
    L.log(
      new loggingDataClass(LoggingLevels.error, 'manager.events', {
        errors: reason,
        translate: true,
        T: {
          replace: {
            this: reason.toString()
          }
        }
      })
    )
})
