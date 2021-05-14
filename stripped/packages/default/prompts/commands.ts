import { Prompt } from '../../../typing'

export const prompts: Prompt = {
  cooldown: async function (this, message, timeLeft: number) {
    const embed = await this.modules.embeds.get('default')?.()
    if (!embed) return
    embed
      .setTitle(this.i18.t('commands.prompts.cooldown.title'))
      .setDescription(
        this.i18.t('commands.prompts.cooldown.description', {
          replace: {
            time: timeLeft.toPrecision(1),
            command: message.cmd?.name
          }
        })
      )
      .setColor(15751936)
    if ('content' in message) message.reply(embed)
    else message.reply('', { embeds: [embed] })
  },
  dms: async function (this, message) {
    const embed = await this.modules.embeds.get('default')?.()
    if (!embed) return
    embed
      .setTitle(this.i18.t('commands.prompts.dms.title'))
      .setDescription(this.i18.t('commands.prompts.dms.description'))
      .setColor(15751936)
    if ('content' in message) message.reply(embed)
    else message.reply('', { embeds: [embed] })
  },
  doesntExist: async function (this, message) {
    const embed = await this.modules.embeds.get('default')?.()
    if (!embed) return
    embed
      .setTitle(
        this.i18.t('commands.prompts.doesntExist.title', {
          replace: { command: message.cmd?.name }
        })
      )
      .setColor(15751936)
    if ('content' in message) message.reply(embed)
    else message.reply('', { embeds: [embed] })
  },
  args: async function (this, message) {
    const embed = await this.modules.embeds.get('default')?.()
    if (!embed) return
    embed
      .setTitle(this.i18.t('commands.prompts.args.title'))
      .setDescription(this.i18.t('commands.prompts.args.description'))
      .addField(
        this.i18.t('commands.prompts.args.fields.usage.title', {
          replace: {
            name: message.cmd?.name
          }
        }),
        this.i18.t('commands.prompts.args.fields.usage.description', {
          replace: {
            prefix: message.prefix,
            command: message.cmd?.name,
            usage: message.cmd?.usage
          }
        })
      )
      .setColor(15751936)
    if ('content' in message) message.reply(embed)
    else message.reply('', { embeds: [embed] })
  }
}

export default prompts
