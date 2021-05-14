import { Prompt } from '../../../typing'

export const prompts: Prompt = {
  respond: async function (this, message, response: number) {
    const date = new Date(message.createdTimestamp)
    const process = message.recievedTime
      ? new Date().getTime() - message.recievedTime?.getTime()
      : 'unknown'
    let APILatency = new Date().getTime()
    if (this.config.radio?.infoApi) await this.fetch(this.config.radio.infoApi)
    APILatency = new Date().getTime() - APILatency
    const embed = await this.modules.embeds.get('default')?.()
    if (!embed) return
    embed.setTitle(this.i18.t('ping.prompts.respond.title')).setDescription(
      this.i18.t('ping.prompts.respond.description', {
        replace: {
          time: response,
          api: this.client.ws.ping,
          created: date.toISOString().replace('T', ' ').replace('Z', ' ISO'),
          recieved: message.recievedTime
            ?.toISOString()
            .replace('T', ' ')
            .replace('Z', ' ISO'),
          completed: new Date()
            .toISOString()
            .replace('T', ' ')
            .replace('Z', ' ISO'),
          process: process,
          shard: this.client.shard?.ids[0],
          shards: this.client.shard?.ids.length,
          ggapi: APILatency
        }
      })
    )
    if ('content' in message) message.reply(embed)
    else message.reply('', { embeds: [embed] })
  }
}

export default prompts
