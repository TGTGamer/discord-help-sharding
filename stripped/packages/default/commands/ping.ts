import { Command } from '../../../typing'
export const command: Command = {
  name: 'ping',
  version: 5,
  description: "Ping the bot to test it's response time",
  alias: ['pong', 'alive'],
  permissions: 'public',
  usage: '',
  guildOnly: false,
  args: false,
  helpInformation: 'Simply do `ping` to test if the bot is operational',
  execute: async function (this, message) {
    const response =
      new Date().getTime() -
      (message.createdAt
        ? message.createdAt.getTime()
        : message.createdTimestamp)
    if (message.cmd?.prompts?.respond)
      message.cmd.prompts.respond.bind(this)(message, response)
    else
      message.reply(
        `Pong! <@${
          this.client.user ? this.client.user.id : undefined
        }> took ${response}ms to respond with a API Latency of ${Math.round(
          this.client.ws.ping
        )}ms. Could we do better? We think so....`
      )
  }
}

export default command
