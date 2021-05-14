import { Collection } from 'discord.js'
import path from 'path'
import { Command, compilerOptions, Packages, PromptGroup } from '../..'

export async function single(
  this: Packages,
  file: string,
  group: string,
  filepath: string,
  promptGroup?: PromptGroup,
  depth?: number
) {
  if (!file.endsWith('.ts') || file.endsWith('.d.ts')) return
  await this.compile([path.join(filepath, file)], compilerOptions)
  file = file.replace('.ts', '.js')

  filepath = path.join(filepath, file)
  const command: Command = require(filepath).default
  if (!command.name) {
    let name = file.split('.')[0]
    if (!name) return
    command.name = name
  }
  if (!command.module) command.module = group
  const commandGroupPrompt =
    promptGroup instanceof Collection
      ? promptGroup?.get(command.name)
      : undefined
  command.prompts =
    commandGroupPrompt instanceof Collection ? undefined : commandGroupPrompt
  command.path = filepath
  if (depth) command.depth = depth
  this.logLoading('commands', file, group, filepath)
  return command
}
