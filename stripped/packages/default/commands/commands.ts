import { Command } from '../../../typing'
export const command: Command = {
  name: 'commands',
  version: 10,
  description: 'Global command to list all commands on bot',
  alias: ['command', 'c'],
  permissions: 'public',
  usage: '<command>',
  guildOnly: false,
  args: false,
  helpInformation:
    'Simply simply do `commands` to get the full list of commands',
  execute: async function (this, message, args) {
    const embed = await this.modules.embeds.get('default')?.()
    if (!embed) return
    embed
      .setTitle(this.i18.t('commands.prompts.commands.title'))
      .setDescription(this.i18.t('commands.prompts.commands.description'))

    if (!args || !args[0]) {
      let commandOutput: string[] = []
      this.modules.commands.forEach(async (cmd, index) => {
        if (cmd.permissions == 'internal') return
        if (!commandOutput.includes(index)) {
          commandOutput.push(index)
          let field = 'Description: '
          let name = `${index} `
          if (cmd.description) {
            field += `${cmd.description} \n`
          } else {
            field += `Undefined \n`
          }
          if (cmd.alias) field += `Alias: ${cmd.alias.join(', ')} \n`
          if (cmd.usage) {
            field += `Usage: ${message.prefix}${cmd.name} ${cmd.usage} \n`
          } else {
            field += `Usage: ${message.prefix}${cmd.name}`
          }

          embed.addField(name, field)
        }
      })
      if ('content' in message) message.reply(embed)
      else message.reply('', { embeds: [embed] })
    } else {
      const cmdName: string = args[0]
      const cmd =
        this.modules.commands.get(cmdName) ||
        this.modules.commands.find(c =>
          Boolean(c.alias && c.alias.includes(cmdName))
        )
      let data = ''
      if (cmd) {
        if (cmd.alias) data = `Alias: ${cmd.alias.join(', ')} \n`
        if (cmd.version) data += `Version: ${cmd.version} \n`
        if (cmd.module) data += `Module: ${cmd.module} \n`
        if (cmd.description) data += `Description: ${cmd.description} \n`
        if (cmd.permissions)
          data += `Required Permissions: ${cmd.permissions} \n`
        if (cmd.usage)
          data += `Example usage: ${message.prefix}${args[0]} ${cmd.usage} \n`
        if (cmd.cooldown) data += `Cooldown time: ${cmd.cooldown} second(s) \n`
        if (cmd.guildOnly) data += `Blocked in DM: ${cmd.guildOnly} \n`
        if (cmd.args) data += `Requires Args: ${cmd.args} (${cmd.minArgs}) \n`
        if (cmd.helpInformation) data += `\n Guide: ${cmd.helpInformation} \n`
        embed.addField(`!${cmd.name}`, data)
      }
      if ('content' in message) message.reply(embed)
      else message.reply('', { embeds: [embed] })
    }
  }
}

export default command
