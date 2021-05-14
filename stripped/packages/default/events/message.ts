import { EventFileSingle, Message } from '../../../typing'
import { runCommands } from '../_commands'

export const Event: EventFileSingle = {
  execute: async function (this, message: Message) {
    let commandFound: boolean = false
    message.recievedTime = new Date()
    if (message.author.bot) return
    this.log(
      100,
      message.guild !== null
        ? 'message.recieved.guild'
        : 'message.recieved.user',
      {
        translate: true,
        T: {
          replace: {
            content: message.content,
            user: message.author.username,
            guild: message.guild !== null ? message.guild.name : undefined,
            guildid: message.guild !== null ? message.guild.id : undefined
          }
        }
      }
    )
    const prefixes = await this.getPrefixes(
      message.guild !== null ? message.guild.id : undefined
    )
    if (prefixes) {
      prefixes.forEach((prefix: string) => {
        if (message.content.indexOf(prefix) !== 0) return
        message.prefix = prefix + ' '
        runCommands.bind(this)(message)
        commandFound = true
      })
    }

    if (commandFound) return
    else if (message.mentions.has(this.client.user!.username)) {
      message.prefix = `${this.client.user!.username} `
      runCommands.bind(this, message)
    }
  }
}

export default Event
