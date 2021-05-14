import { LoggingLevels } from '@videndum/utilities'
import { Collection, CommandInteractionOption } from 'discord.js'
import {
  Command,
  CommandGroup,
  CommandInteraction,
  cooldown,
  Message,
  Root
} from '../../types'

export async function runCommands(
  this: Root,
  message: Message | CommandInteraction
) {
  let defaultPrompts = this.modules.prompts.get('default')?.get('commands')
  if (!defaultPrompts || 'size' in defaultPrompts) defaultPrompts = {}

  let cmd: Command | CommandGroup | undefined = undefined
  let command: string | undefined
  let args: string[] | undefined

  if ('content' in message) {
    if (message.prefix)
      args = message.content
        .slice(message.prefix.length - 1)
        .trim()
        .split(/ +/g)
    else args = message.content.trim().split(/ +/g)
    command = args.shift()!.toLowerCase()
    cmd = await getCommand.bind(this)(command, args)
  } else {
    command = message.commandName
    cmd = await getCommand.bind(this)(
      message.commandName,
      undefined,
      message.options
    )
  }
  message.cmd = cmd
  if (!cmd || !cmd.name) {
    message.cmd = {
      name: command
    }
    this.emit('commandunknown', message)
    this.log(
      400,
      message.guild !== null ? 'message.unknown.guild' : 'message.unknown.user',
      {
        translate: true,
        T: {
          replace: {
            content: message.prefix + command,
            user: message.author.username,
            guild: message.guild !== null ? message.guild.name : undefined,
            guildid: message.guild !== null ? message.guild.id : undefined
          }
        }
      }
    )
    return defaultPrompts?.doesntExist
      ? defaultPrompts.doesntExist.bind(this)(message)
      : null
  } else if ('container' in cmd) {
    return
  }
  if ('content' in message && cmd.depth) {
    args = args?.slice(cmd.depth)
  }
  let timestamps: cooldown | undefined = this.modules.cooldowns.get(cmd.name)
  if (!timestamps) {
    timestamps = new Collection()
    this.modules.cooldowns.set(cmd.name, timestamps)
  }
  const now = Date.now()
  const cooldownAmount = (cmd.cooldown || 3) * 1000
  const cooldownActive = timestamps.get(message.author.id)
  if (cooldownActive) {
    const expire = cooldownActive + cooldownAmount
    if (now < expire) {
      const timeLeft = (expire - now) / 1000
      return defaultPrompts?.cooldown
        ? defaultPrompts.cooldown.bind(this)(message, timeLeft)
        : null
    }
  }
  timestamps.set(message.author.id, now)
  setTimeout(
    () => (timestamps ? timestamps.delete(message.author.id) : null),
    cooldownAmount
  )
  if (cmd.guildOnly && message.channel?.type == 'dm') {
    return defaultPrompts?.dms ? defaultPrompts.dms.bind(this)(message) : null
  }
  if (cmd.args && cmd.minArgs && args && cmd.minArgs > args.length) {
    return defaultPrompts?.args ? defaultPrompts.args.bind(this)(message) : null
  }
  this.emit('commandstarted', command)
  cmd.execute
    .bind(this)(message, args)
    .then(() => {
      this.emit('commandfinished', command)
    })
    .catch((err: any) => {
      this.log(LoggingLevels.error, 'message.error', {
        translate: true,
        T: {
          replace: {
            command: `${message.prefix}` + command,
            error: err
          }
        }
      })
      this.emit(err.err || 'commanderror', err.action || command)
    })
}

export async function getCommand(
  this: Root,
  command: string,
  args?: string[],
  intentArgs?: CommandInteractionOption[]
): Promise<Command | CommandGroup | undefined> {
  let cmd: Command | CommandGroup | undefined =
    this.modules.commands.get(command) ||
    this.modules.commands.find(cmd =>
      Boolean(cmd.alias && cmd.alias.includes(command))
    )
  if (!cmd) return
  if ('container' in cmd) {
    return await getSubCommand(cmd, 0, args, intentArgs)
  }
  return cmd
}

export async function getSubCommand(
  cmd: CommandGroup,
  argsNo: number,
  args?: string[],
  intentArgs?: CommandInteractionOption[]
): Promise<Command | CommandGroup | undefined> {
  const cmdName: string | undefined =
    args?.[argsNo] || intentArgs?.[argsNo].name
  if (!cmd.subCommands || !cmdName) return cmd
  let newCommand: Command | CommandGroup | undefined =
    cmd.subCommands.get(cmdName) ||
    cmd.subCommands.find(cmd =>
      Boolean(cmd.alias && cmd.alias.includes(cmdName))
    )
  if (!newCommand) return cmd
  if ('container' in newCommand) {
    argsNo++
    return await getSubCommand(newCommand, argsNo, args, intentArgs)
  }
  return newCommand
}
