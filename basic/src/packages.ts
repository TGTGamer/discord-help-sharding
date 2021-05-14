/**========================================================================
 * Everything in this file is removed from `./bot` it's purely type def's
 *
 * THIS FILE DOES NOT RUN ANY CODE
 * THIS FILE DOES NOT RUN ANY CODE
 *
 *========================================================================**/

import { ApplicationCommandOption, Collection } from 'discord.js'
// import fs from 'fs'
// import path from 'path'
import * as ts from 'typescript'
import { CommandInteraction, Message, Root } from './bot'

/**========================================================================
 *                           Types & Interfaces
 *========================================================================**/

export type ModuleTypes = 'prompts' | 'events' | 'commands'
export type Permissions = 'internal' | 'admin' | 'public'

export interface CommandGroup extends Partial<Command> {
  module?: string
  container: true
  subCommands?: Collection<String, Command>
  levels: number
  promptsgroup?: PromptGroup
}

export interface Command {
  name: string
  description: string
  module?: string
  version: number
  alias: string[]
  permissions: Permissions
  usage?: string
  cooldown?: number
  guildOnly: boolean
  args: boolean
  levels?: number
  depth?: number
  minArgs?: number
  path?: string
  helpInformation: string
  prompts?: Prompt
  options?: ApplicationCommandOption[]
  execute: (
    this: Root,
    message: Message | CommandInteraction,
    args?: string[]
  ) => Promise<void>
}

export type Commands = Collection<string, CommandGroup | Command>
export type Cooldowns = Collection<string, cooldown>
export type cooldown = Collection<string, number>

export interface EventBase {
  path?: string
  name?: string
}
export interface EventFileMultiple extends EventBase {
  events: {
    [x: string]: (this: Root, ...args: any) => Promise<void | null>
  }
}
export interface EventFileSingle extends EventBase {
  execute: (this: Root, ...args: any) => Promise<void | null>
}

export type EventFile = EventFileMultiple | EventFileSingle

export type Prompt = {
  [x: string]: (
    this: Root,
    message: Message | CommandInteraction,
    ...args: any
  ) => Promise<void>
} & {
  path?: string
  name?: string
}

export type Prompts = Collection<String, PromptGroup>
export type PromptGroup = Collection<string, Prompt | PromptGroup>

/**========================================================================
 *                           Module Management
 *========================================================================**/

export const compilerOptions: ts.CompilerOptions = {
  strict: true,
  moduleResolution: ts.ModuleResolutionKind.NodeJs,
  experimentalDecorators: true,
  pretty: true,
  noFallthroughCasesInSwitch: true,
  noImplicitReturns: true,
  forceConsistentCasingInFileNames: true,
  resolveJsonModule: true,
  esModuleInterop: true,
  emitDecoratorMetadata: true,
  skipLibCheck: true,
  noUnusedLocals: true,
  noEmitHelpers: true,
  importHelpers: true,
  declaration: true,
  declarationDir: 'packagetypes',
  declarationMap: true,
  inlineSourceMap: true,
  noEmitOnError: true,
  noImplicitAny: true,
  target: ts.ScriptTarget.ESNext,
  module: ts.ModuleKind.CommonJS
}

// export class Packages {
//   root: Root
//   modulesDirectory = `${__dirname}/../packages/`
//   constructor(root: Root) {
//     this.root = root
//     this.load()
//   }

//   async load() {
//     // if (this.root.extensions.interactions)
//     //   this.commandsList = await this.root.extensions.interactions?.getCommands()
//     fs.readdir(this.modulesDirectory, (err, groups) => {
//       if (err) return this.root.log(600, err.message, { errors: err })
//       groups.forEach(async group => {
//         if (
//           group.endsWith('.js') ||
//           group.endsWith('.js.map') ||
//           group.endsWith('.json')
//         )
//           return
//         if (group.endsWith('.ts')) {
//           this.compile(
//             [path.join(this.modulesDirectory, group)],
//             compilerOptions
//           )
//           return
//         }
//         await this.loadModules(group, 'events')
//           .then(async () => await this.loadModules(group, 'prompts'))
//           .then(async () => await this.loadModules(group, 'commands'))
//       })
//       return
//     })
//   }

//   async loadModules(group: string, type: ModuleTypes) {
//     fs.readdir(
//       path.join(this.modulesDirectory, group, type),
//       (err, folders) => {
//         if (err) return this.root.log(600, err.message, { errors: err })
//         folders.forEach(async file => {
//           if (
//             file.endsWith('.js.map') ||
//             file.endsWith('.d.ts') ||
//             file.endsWith('.md') ||
//             file.endsWith('.js')
//           )
//             return
//           await this[type].initialize(
//             group,
//             file,
//             path.join(this.modulesDirectory, group, `/${type}/`)
//           )
//         })
//         return
//       }
//     )
//   }

//   /**========================================================================
//    *                           PROMPTS
//    *========================================================================**/
//   prompts = {
//     initialize: prompts.initialize.bind(this),
//     single: prompts.single.bind(this),
//     multi: prompts.multi.bind(this),
//     reload: prompts.reload.bind(this)
//   }

//   /**========================================================================
//    *                           EVENTS
//    *========================================================================**/
//   events = {
//     initialize: events.initialize.bind(this),
//     reload: events.reload.bind(this)
//   }

//   /**========================================================================
//    *                           COMMANDS
//    *========================================================================**/
//   commands = {
//     initialize: commands.initialize.bind(this),
//     single: commands.single.bind(this),
//     multi: commands.multi.bind(this),
//     reload: commands.reload.bind(this)
//   }

//   logLoading(type: ModuleTypes, name: string, group: string, root: string) {
//     this.root.log(300, 'events.loadModule', {
//       translate: true,
//       T: {
//         replace: {
//           type: type,
//           name: name,
//           group: group,
//           path: root
//         }
//       }
//     })
//   }

//   compile = compile.bind(this)
// }
