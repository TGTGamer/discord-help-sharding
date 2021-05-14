import { Collection } from 'discord.js'
import fs from 'fs'
import path from 'path'
import { CommandGroup, Packages } from '../..'

export async function multi(
  this: Packages,
  {
    file,
    commandGroup,
    masterGroup,
    group,
    filepath
  }: {
    file: string
    commandGroup: CommandGroup
    masterGroup?: CommandGroup[]
    group: string
    filepath: string
  }
) {
  const subcmds = fs.readdirSync(path.join(filepath, file))
  if (!subcmds) return
  commandGroup.subCommands = new this.root.discord.Collection()
  subcmds.forEach(async cmd => {
    if (cmd.endsWith('.ts')) {
      const subCommand = await this.commands.single(
        cmd,
        group,
        path.join(filepath, file),
        commandGroup.promptsgroup,
        masterGroup?.[0] ? masterGroup[0]?.levels : commandGroup.levels
      )
      if (subCommand?.name && commandGroup.subCommands)
        commandGroup.subCommands!.set(subCommand.name, subCommand)
    } else {
      if (
        cmd.indexOf('.') !== -1 ||
        cmd.indexOf('_') == 0 ||
        file.endsWith('.md')
      )
        return
      const commandGroupPrompts =
        commandGroup?.promptsgroup?.get(file) || new Collection()

      const commandGroupPrompt =
        commandGroupPrompts instanceof Collection
          ? commandGroupPrompts?.get('index')
          : undefined

      const groupHelp = require(path.join(filepath, file, 'help.json'))

      const subCommandGroup: CommandGroup = {
        name: groupHelp.name,
        version: groupHelp.version,
        description: groupHelp.description,
        alias: groupHelp.alias,
        permissions: groupHelp.permissions,
        usage: groupHelp.usage,
        guildOnly: groupHelp.guildOnly,
        helpInformation: groupHelp.helpInformation,
        container: true,
        prompts:
          commandGroupPrompt instanceof Collection
            ? undefined
            : commandGroupPrompt,
        promptsgroup:
          commandGroupPrompts instanceof Collection
            ? commandGroupPrompts
            : undefined,
        path: path.join(filepath, file),
        levels: 0
      }

      commandGroup.levels++

      if (masterGroup) {
        masterGroup.forEach(g => g.levels++)
        masterGroup.push(commandGroup)
      }

      this.logLoading('commands', cmd, group, filepath)

      await this.commands.multi({
        file: cmd,
        commandGroup: subCommandGroup,
        masterGroup,
        group,
        filepath: path.join(filepath, file)
      })
    }
  })
}
