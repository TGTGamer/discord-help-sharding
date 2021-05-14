import { ApplicationCommand, Collection } from 'discord.js'
import path from 'path'
import { CommandGroup, Packages } from '../..'

/**========================================================================
 *                           COMMANDS
 *========================================================================**/
export async function initialize(
  this: Packages,
  group: string,
  file: string,
  filepath: string
) {
  if (file.indexOf('_') == 0 || file.endsWith('.md')) return
  const prompts = this.root.modules.prompts.get(group)
  if (file.endsWith('.ts')) {
    const command = await this.commands.single(file, group, filepath, prompts)
    if (command?.name) {
      this.root.modules.commands.set(command.name, command)
      //
      let applicationcommand:
        | ApplicationCommand
        | Collection<string, ApplicationCommand>
        | undefined = await this.root.client.application?.commands.create({
        // await this.root.client.guilds.cache
        // .get('432491086506754048')
        // ?.commands.create({
        name: command.name,
        description: command.description
      })
      if (!applicationcommand) {
        applicationcommand = await this.root.client.guilds.cache
          .get('432491086506754048')
          ?.commands.set([
            {
              name: command.name,
              description: command.description
            }
          ])
      }
    }
  } else {
    const commandGroupPrompts = prompts?.get(file) || new Collection()
    const commandGroupPrompt =
      commandGroupPrompts instanceof Collection
        ? commandGroupPrompts?.get('index')
        : undefined

    const groupHelp = require(path.join(filepath, file, 'help.json'))

    const commandGroup: CommandGroup = {
      name: groupHelp.name,
      version: groupHelp.version,
      description: groupHelp.description,
      alias: groupHelp.alias,
      permissions: groupHelp.permissions,
      usage: groupHelp.usage,
      guildOnly: groupHelp.guildOnly,
      helpInformation: groupHelp.helpInformation,
      module: group,
      container: true,
      levels: 1,
      prompts:
        commandGroupPrompt instanceof Collection
          ? undefined
          : commandGroupPrompt,
      promptsgroup:
        commandGroupPrompts instanceof Collection
          ? commandGroupPrompts
          : undefined
    }
    await this.commands.multi({ file, commandGroup, group, filepath })
    if (commandGroup.name)
      this.root.modules.commands.set(commandGroup.name, commandGroup)
  }
}
