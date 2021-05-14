import { LoggingLevels } from '@videndum/utilities'
import { Collection, StreamDispatcher, VoiceConnection } from 'discord.js'
import { EventFileSingle } from '../../../typing'

export type Connections = Collection<string, Connection>
export interface Connection {
  channel: string
  connection: VoiceConnection
  dispatcher?: StreamDispatcher
}

export const Event: EventFileSingle = {
  execute: async function (this) {
    /**======================
     *    Create Extensions
     *========================**/
    this.extensions['connections'] = new this.discord.Collection<
      string,
      Connection
    >()

    /**======================
     *    Create Default Embeds
     *========================**/
    // Create Default Embeds
    this.modules.embeds.set('default', async () => {
      return new this.discord.MessageEmbed()
        .setColor(15751936)
        .setFooter(
          this.i18.t(`embeds.footer.${Math.floor(Math.random() * 6) + 1}`),
          this.config.radio?.logo
        )
    })

    // Set bot name and presence
    let shardID = this.client.shard?.ids?.[0]
    await this.client.user!.setPresence({
      activities: [
        {
          name:
            (this.config?.radio?.name ? this.config.radio.name : '') +
            ` | ${(await this.getPrefixes())?.[0] || '! '} | Shard: ${
              shardID ? shardID + 1 : '1'
            }/${this.client.shard!.count}`,
          type: 'PLAYING'
        }
      ],
      status: 'online'
    })

    await this.client
      .user!.setUsername(
        (this.config?.radio?.name ? this.config.radio.name : '') +
          (process.env.NODE_ENV == 'development' ||
          process.env.NODE_ENV == 'dev'
            ? ' Dev'
            : process.env.NODE_ENV == 'staging' ||
              process.env.NODE_ENV == 'stag'
            ? ' Staging'
            : '')
      )
      .catch((e: Error) =>
        this.log(LoggingLevels.warn, 'client.events', {
          translate: true,
          errors: e,
          T: { replace: { this: e.message } }
        })
      )

    if (this.config.radio?.logo)
      await this.client
        .user!.setAvatar(this.config.radio.logo)
        .catch((e: Error) =>
          this.log(LoggingLevels.warn, 'client.events', {
            translate: true,
            errors: e,
            T: { replace: { this: e.message } }
          })
        )

    // Send ready logging
    this.log(LoggingLevels.notice, 'events.botLoaded.serving', {
      translate: true,
      T: {
        replace: {
          channels: this.client.channels.cache.size,
          servers: this.client.guilds.cache.size,
          users: this.client.users.cache.size
        }
      }
    })

    this.log(LoggingLevels.notice, 'events.botLoaded.readyAt', {
      translate: true,
      T: {
        replace: {
          time: this.client.readyAt
        }
      }
    })
  }
}

export default Event
