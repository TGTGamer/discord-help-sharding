# GGRadio Discord Bot

<img src="https://img.shields.io/badge/version-6.0.0-blue.svg" /> <a href="https://discord.com/oauth2/authorize?client_id=211515768548884480&scope=bot&permissions=3148865"><img src="https://img.shields.io/badge/Discord-Add%20Bot-7289DA.svg" /></a>
<a href="https://ggradio.net/"><img src="https://img.shields.io/badge/GG-Radio-f05b00.svg?labelColor=black" /></a>
<a href="https://discord.gg/d8TyVtv"><img src="https://img.shields.io/discord/191940906079748096.svg?label=GGRadio%20Official%20Chat&logo=discord&logoColor=white&labelColor=7289DA" /></a>

## Index

<!-- toc -->

- [Features](#features)
- [Default Package Includes](#default-package-includes)
  * [Events](#events)
    + [Message](#message)
    + [Ready](#ready)
  * [Commands](#commands)
    + [Ping (Alias: c, command)](#ping-alias-c-command)
  * [Prompts](#prompts)
    + [Commands](#commands-1)
    + [Ping](#ping)
  * [Locales](#locales)
- [Typings](#typings)
- [Contributing](#contributing)
  * [Why the guidelines](#why-the-guidelines)
  * [Contributor License Agreement](#contributor-license-agreement)
  * [Responsibilities](#responsibilities)
  * [External Contributions Workflow](#external-contributions-workflow)
  * [Internal Contributions Workflow](#internal-contributions-workflow)
    + [Branch Names](#branch-names)
  * [Contribution Types](#contribution-types)
    + [Minor Contributions](#minor-contributions)
    + [Standard Contributions](#standard-contributions)
    + [Major Contributions](#major-contributions)
  * [Your First Contribution](#your-first-contribution)
  * [Your first project](#your-first-project)
  * [Creating a merge request](#creating-a-merge-request)
    + [Titling your request](#titling-your-request)
    + [Prefixes](#prefixes)
  * [Security Disclosures](#security-disclosures)
  * [Understanding Labels](#understanding-labels)
  * [Contributor Covenant Code of Conduct](#contributor-covenant-code-of-conduct)
    + [Our Pledge](#our-pledge)
    + [Our Standards](#our-standards)
    + [Our Responsibilities](#our-responsibilities)
    + [Scope](#scope)
    + [Enforcement](#enforcement)
    + [Attribution](#attribution)
  * [Code review process](#code-review-process)
  * [Signing Git with GPG using Keybase](#signing-git-with-gpg-using-keybase)
    + [Prerequisities](#prerequisities)
    + [Update the GPG Key](#update-the-gpg-key)
- [Security](#security)
  * [Security Policy](#security-policy)
    + [Supported Versions](#supported-versions)
    + [Reporting a Vulnerability](#reporting-a-vulnerability)

<!-- tocstop -->

## Features

- something
- something else
  ## Default Package Includes

This is the default package, used by most people for basic commands. This package does not call any external APIs

<details>
    <summary><b>Events</b></summary>

### Events

#### Message

Whenever a message is recieved, run the command which is found

**trigger**: OnMessage

#### Ready

Whenever a shard declares it's self as `ready` execute these functions

**trigger**: OnReady


</details>

<details>
    <summary><b>Commands</b></summary>

### Commands

#### Ping (Alias: c, command)

Ping the bot to test it's response time

**version**: 1
**Permissions**: Public
**Usage**: `{prefix} ping`
**GuildOnly**: false


</details>

<details>
    <summary><b>Prompts</b></summary>

### Prompts

#### Commands

Prompts used for default commands responses

**prompts**:

- cooldown: used for when commands are on cooldown
- dms: used for when commands are sent to the bots dms but cant be used
- doesntExist: used when commands are not known
- args: used when a command is missing args

#### Ping

Prompts used for default commands responses

**prompts**:

- help: used for when command help is required
- response: used to send response from command


</details>

<details>
    <summary><b>Locales</b></summary>

### Locales

<details>
    <summary><b>en.json</b></summary>

```locales/en.json
{
  "manager": {
    "events": "[MANAGER] {{this}}"
  },
  "client": {
    "events": "[CLIENT] {{this}}"
  },
  "events": {
    "commandCompleted": "Command Completed",
    "botLoaded": {
      "readyAt": "Ready at {{time}}",
      "serving": "Shard is ready to serve in {{channels}} channels on {{servers}} servers, for a total of {{users}} users."
    },
    "commandUnknown": "Command Unknown {{this}}",
    "loadModule": "Attempting to load {{type}} '{{name}}' of {{group}} module ({{path}})",
    "loadPackage": "`{{group}} {{type}} folders are: {{files}}`"
  },
  "embeds": {
    "footer": {
      "1": "Are you multilingual? We're looking for translators | GGRadio.net",
      "2": "The #1 international eSports gaming radio | GGRadio.net",
      "3": "Dream in code? Why not work with us | GGRadio.net",
      "4": "Find us on TuneIn to listen on the go | GGRadio.net",
      "5": "Got a game server? Apply for partnership for exclusive features | GGRadio.net",
      "6": "We are trying to improve, let us know how using `gg! feedback` | GGRadio.net"
    }
  },
  "message": {
    "recieved": {
      "guild": "Message {{content}} from {{user}} in {{guild}} ({{guildid}})",
      "user": "Message {{content}} from {{user}} in PM"
    },
    "unknown": {
      "guild": "Command {{content}} was called by {{user}} in {{guild}} ({{guildid}}) but did not exist",
      "user": "Command {{content}} was called by {{user}}but did not exist"
    },
    "error": "Command {{command}} exited with error: {{error}}"
  },
  "ping": {
    "prompts": {
      "respond": {
        "title": "**Pong that Ping**",
        "description": "**Pong**: {{time}}ms \n**Discord API Latency**: {{api}}ms \n**GGRadio API Latency**: {{ggapi}}ms \n**Message Created**: {{created}} \n**Recieved**: {{recieved}} \n**Completed**: {{completed}} \n**Processing Time**: {{process}}ms \n**Shard ID**: {{shard}} \n**Total Shards**: {{shards}}"
      }
    }
  },
  "commands": {
    "prompts": {
      "cooldown": {
        "title": "**Hit the breaks**",
        "description": "Woah there, looks like {{command}} is on cooldown, you need to wait {{time}} second(s)"
      },
      "dms": {
        "title": "**Not my privates**",
        "description": "I can't do that command inside my direct messages. Please try again within a server."
      },
      "doesntExist": {
        "title": "**Command '{{command}}' doesn't exist**"
      },
      "args": {
        "title": "**Forgot Somethhing?!**",
        "description": "You have forgotten to provide enough arguments",
        "fields": {
          "usage": {
            "title": "**{{name}} Usage**",
            "content": "{{prefix}} {{command}} {{usage}}"
          }
        }
      },
      "commands": {
        "title": "**_Command list_**",
        "description": "You can use `gg! commands {command}` to view detailed information about each command. \n\n For non command related support please use `gg! help`"
      }
    }
  }
}
```

</details>

</details>

  <!-- INCLUDE FILE NOT FOUND: D:\Jonathan\Documents\Repositories\devspace\tmw.media\projects\Discord_stripped\stripped\docs\readme\components\support.md -->
  <!-- INCLUDE FILE NOT FOUND: D:\Jonathan\Documents\Repositories\devspace\tmw.media\projects\Discord_stripped\stripped\docs\readme\components\backlog.md -->
  <!-- INCLUDE FILE NOT FOUND: D:\Jonathan\Documents\Repositories\devspace\tmw.media\projects\Discord_stripped\stripped\docs\readme\components\runningLocally.md -->

## Typings

<details>
    <summary><b>Types</b></summary>

```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
/// <reference types="node" />
import { PrismaClient } from '@prisma/client';
import { LoggingLevels, loggingOptions } from '@videndum/utilities';
import Discord, { Collection, CommandInteraction as CI, Interaction as I, Message as M, MessageEmbed } from 'discord.js';
import { EventEmitter } from 'events';
import fetch from 'node-fetch';
import { Config } from '../config';
import { Database } from './database';
import { Command, Commands, Cooldowns, Packages, Prompts } from './packages';
export interface Message extends M {
    recievedTime?: Date;
    cmd?: Partial<Command>;
    prefix?: string;
}
export interface Interaction extends I {
    isCommand(): this is CommandInteraction;
}
export interface CommandInteraction extends CI {
    recievedTime?: Date;
    cmd?: Partial<Command>;
    author: CI['user'];
    prefix: string;
}
export declare type Embeds = Collection<string, () => Promise<MessageEmbed>>;
export interface Extensions {
    [x: string]: unknown;
}
export interface Modules {
    commands: Commands;
    cooldowns: Cooldowns;
    embeds: Embeds;
    prompts: Prompts;
    [x: string]: unknown;
}
export declare class Root extends EventEmitter {
    discord: typeof Discord;
    packages: Packages;
    config: Config;
    client: Discord.Client;
    databaseClass: Database;
    database: PrismaClient;
    modules: Modules;
    extensions: Extensions;
    fetch: typeof fetch;
    L: import("@videndum/utilities").Logger;
    log: (name: LoggingLevels, message: loggingOptions['message'], options?: loggingOptions['options']) => void;
    i18: import("@videndum/utilities").Localizer;
    constructor();
    loadEvents(): void;
    getPrefixes(guildID?: string): Promise<string[] | undefined>;
}
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { PrismaClient } from '@prisma/client';
import { Root } from '.';
export declare type DatabaseConstructData = {
    root?: Root;
};
export declare class Database {
    root: Root;
    prisma: PrismaClient;
    constructor(construct: DatabaseConstructData);
    destroy(): Promise<any>;
    main(): Promise<void>;
}
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
export * from './bot';
export * from './manager';
export * from './packages';
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Logger } from '@videndum/utilities';
export declare const L: Logger;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
export {};
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { ApplicationCommandOption, Collection } from 'discord.js';
import * as ts from 'typescript';
import { CommandInteraction, Message, Root } from './bot';
export declare type ModuleTypes = 'prompts' | 'events' | 'commands';
export declare type Permissions = 'internal' | 'admin' | 'public';
export interface CommandGroup extends Partial<Command> {
    module?: string;
    container: true;
    subCommands?: Collection<String, Command>;
    levels: number;
    promptsgroup?: PromptGroup;
}
export interface Command {
    name: string;
    description: string;
    module?: string;
    version: number;
    alias: string[];
    permissions: Permissions;
    usage?: string;
    cooldown?: number;
    guildOnly: boolean;
    args: boolean;
    levels?: number;
    depth?: number;
    minArgs?: number;
    path?: string;
    helpInformation: string;
    prompts?: Prompt;
    options?: ApplicationCommandOption[];
    execute: (this: Root, message: Message | CommandInteraction, args?: string[]) => Promise<void>;
}
export declare type Commands = Collection<string, CommandGroup | Command>;
export declare type Cooldowns = Collection<string, cooldown>;
export declare type cooldown = Collection<string, number>;
export interface EventBase {
    path?: string;
    name?: string;
}
export interface EventFileMultiple extends EventBase {
    events: {
        [x: string]: (this: Root, ...args: any) => Promise<void | null>;
    };
}
export interface EventFileSingle extends EventBase {
    execute: (this: Root, ...args: any) => Promise<void | null>;
}
export declare type EventFile = EventFileMultiple | EventFileSingle;
export declare type Prompt = {
    [x: string]: (this: Root, message: Message | CommandInteraction, ...args: any) => Promise<void>;
} & {
    path?: string;
    name?: string;
};
export declare type Prompts = Collection<String, PromptGroup>;
export declare type PromptGroup = Collection<string, Prompt | PromptGroup>;
export declare const compilerOptions: ts.CompilerOptions;
export declare class Packages {
    root: Root;
    modulesDirectory: string;
    constructor(root: Root);
    load(): Promise<void>;
    loadModules(group: string, type: ModuleTypes): Promise<void>;
    prompts: {
        initialize: (group: string, file: string, filepath: string) => Promise<void>;
        single: (group: string, file: string, filePath: string) => Promise<Prompt | undefined>;
        multi: (args_0: {
            file: string;
            promptGroup: PromptGroup;
            group: string;
            filepath: string;
        }) => Promise<void>;
        reload: () => Promise<void>;
    };
    events: {
        initialize: (group: string, file: string, filePath: string) => Promise<void>;
        reload: () => Promise<void>;
    };
    commands: {
        initialize: (group: string, file: string, filepath: string) => Promise<void>;
        single: (file: string, group: string, filepath: string, promptGroup?: PromptGroup | undefined, depth?: number | undefined) => Promise<Command | undefined>;
        multi: (args_0: {
            file: string;
            commandGroup: CommandGroup;
            masterGroup?: CommandGroup[] | undefined;
            group: string;
            filepath: string;
        }) => Promise<void>;
        reload: (cmd: CommandGroup | Command) => Promise<void>;
    };
    logLoading(type: ModuleTypes, name: string, group: string, root: string): void;
    compile: (filepaths: string[], options: ts.CompilerOptions) => Promise<void>;
}
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
export * from './initialize';
export * from './multi';
export * from './reload';
export * from './single';
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Packages } from '../..';
export declare function initialize(this: Packages, group: string, file: string, filepath: string): Promise<void>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { CommandGroup, Packages } from '../..';
export declare function multi(this: Packages, { file, commandGroup, masterGroup, group, filepath }: {
    file: string;
    commandGroup: CommandGroup;
    masterGroup?: CommandGroup[];
    group: string;
    filepath: string;
}): Promise<void>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Command, CommandGroup, Packages } from '../..';
export declare function reload(this: Packages, cmd: CommandGroup | Command): Promise<void>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Command, Packages, PromptGroup } from '../..';
export declare function single(this: Packages, file: string, group: string, filepath: string, promptGroup?: PromptGroup, depth?: number): Promise<Command | undefined>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import ts from 'typescript';
import { Packages } from '..';
export declare function compile(this: Packages, filepaths: string[], options: ts.CompilerOptions): Promise<void>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
export * from './initialize';
export * from './reload';
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Packages } from '../..';
export declare function initialize(this: Packages, group: string, file: string, filePath: string): Promise<void>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Packages } from '../../packages';
export declare function reload(this: Packages): Promise<void>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
export * from './initialize';
export * from './multi';
export * from './reload';
export * from './single';
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Packages } from '../..';
export declare function initialize(this: Packages, group: string, file: string, filepath: string): Promise<void>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Packages, PromptGroup } from '../..';
export declare function multi(this: Packages, { file, promptGroup, group, filepath }: {
    file: string;
    promptGroup: PromptGroup;
    group: string;
    filepath: string;
}): Promise<void>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Packages } from '../../packages';
export declare function reload(this: Packages): Promise<void>;
```
```types/bot.d.ts,types/database.d.ts,types/index.d.ts,types/log.d.ts,types/manager.d.ts,types/packages.d.ts,types/packages/commands/index.d.ts,types/packages/commands/initialize.d.ts,types/packages/commands/multi.d.ts,types/packages/commands/reload.d.ts,types/packages/commands/single.d.ts,types/packages/complier.d.ts,types/packages/events/index.d.ts,types/packages/events/initialize.d.ts,types/packages/events/reload.d.ts,types/packages/prompts/index.d.ts,types/packages/prompts/initialize.d.ts,types/packages/prompts/multi.d.ts,types/packages/prompts/reload.d.ts,types/packages/prompts/single.d.ts
import { Packages, Prompt } from '../..';
export declare function single(this: Packages, group: string, file: string, filePath: string): Promise<Prompt | undefined>;
```

</details>

## Contributing

<details>
    <summary><b>Guide</b></summary>

First off, thank you for considering contributing to this project.

This project uses the [Univeersal GitActions Workflows](https://github.com/TGTGamer/Universal-GitAction-Workflows) to automate our workflow, alongside provide templates for issues and pull requests. If you want to learn more about exactly what is included within the workflows, please checkout the documentation there.

- [Why the guidelines](#why-the-guidelines)
- [Contributor License Agreement](#contributor-license-agreement)
- [Responsibilities](#responsibilities)
- [External Contributions Workflow](#external-contributions-workflow)
- [Internal Contributions Workflow](#internal-contributions-workflow)
  - [Branch Names](#branch-names)
- [Contribution Types](#contribution-types)
  - [Minor Contributions](#minor-contributions)
  - [Standard Contributions](#standard-contributions)
  - [Major Contributions](#major-contributions)
- [Your First Contribution](#your-first-contribution)
- [Your first project](#your-first-project)
- [Creating a merge request](#creating-a-merge-request)
  - [Titling your request](#titling-your-request)
  - [Prefixes](#prefixes)
- [Security Disclosures](#security-disclosures)
- [Understanding Labels](#understanding-labels)

### Why the guidelines

Following these guidelines helps to communicate that you respect the time of the developers managing and creating this project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests. We created these guidelines to ensure that everyone has the same information when working on the project.

- Please don't use the issue tracker for support questions.
- Please check whether the FAQ can help with your issue.
- Please check the closed tickets & pull requests before opening an new one.

### Contributor License Agreement

We have a Contributor License Agreement which can be found at [`{root}/docs/getting-started/contributing/agreement.md`](./AGREEMENT.md). It is required for [Standard Contributions](contribution-types.md#std) and [Major Contributions](contribution-types.md#major).

### Responsibilities

- Ensure cross-platform compatibility for every change that's accepted.
- Ensure that code meets all [requirements](contribution-types.md)
- Create issues for any major changes and enhancements that you wish to make. Discuss things transparently and get community feedback.
- Ensure each contribution is created on its own branch to ensure we can follow [Semantic Versioning](http://semver.org/)
- Be welcoming to newcomers and encourage diverse new contributors from all backgrounds

### External Contributions Workflow

For all contributions you are required to do the following

1. Create your own fork of the latest development code
2. Do the changes in your fork
3. If you like the change and think the project could use it:
   - Be sure you have followed the code style for the project.
   - Be sure to have commented the code so others can follow.
   - Be sure to have checked your using the latest API changes within your code.
   - Be sure to have named your pull request according to our documentation.
   - Be sure to have included your information within the Pull Request.
4. Send a Pull Request.
5. Await confirmation & Make any changes that Maintainers request.
6. Get added to the list of contributors.

### Internal Contributions Workflow

For all contributions you are required to do the following

1. Create an issue for the feature / issue / improvement
2. Create your own branch of the latest development code (Normally automatically done by our bot)
3. Do the changes in your branch
4. If you like the change and think the project could use it:
   - Be sure you have followed the code style for the project.
   - Be sure to have commented the code so others can follow.
   - Be sure to have checked your using the latest API changes within your code.
   - Be sure to have named your pull request according to our documentation.
   - Be sure to have included your information within the Pull Request.
5. Send a Pull Request.
6. Await confirmation & Make any changes that Maintainers request.

#### Branch Names

A branch will normally be created by the automatic system for each issue, if not please follow the branch name configuration defined as follows:

- Chore: chore/
- Enhancement: enhance/
- Feature: feat/
- Documentation: docs/
- Bug: fix/
- Optimisation: opt/
- Decrecated: dep/
- Refactor: ref/
- Style: style/

### Contribution Types

#### Minor Contributions

Small contributions such as fixing spelling errors, where the content is small enough to not be considered intellectual property, can be submitted by a contributor as a minor patch, without a CLA.

As a rule of thumb, changes are obvious fixes if they do not introduce any new functionality or creative thinking. As long as the change does not affect functionality, some likely examples include the following:

- Spelling / grammar fixes
- Typo correction, white space and formatting changes
- Comment clean up
- Bug fixes that change default return values or error codes stored in constants
- Adding logging messages or debugging output
- Changes to �metadata� files like Gemfile, .gitignore, build scripts, etc.
- Moving source files from one directory or package to another

#### Standard Contributions

Standard contributions are contributions which are too large to be considered a minor contribution however, only address one feature or function. This can include, but is not limited to, tutorials, wiki pages, new features (e.g. small integrations) and feature enhancements. Our automation systems will automatically do all the hard work of labeling, assigning and reviewing your contribution.

You our required to sign the CLA and agree to it's terms. This will be automatically handled by our automation when you create a pull request, and once signed you will be able to submit without resigning.

#### Major Contributions

Major contributions are contributions which add, modify or remove multiple features or modules. We can not emphasise enough how much the community helps us every time they submit one of these.

You our required to sign the CLA and agree to it's terms. This will be automatically handled by our automation when you create a pull request, and once signed you will be able to submit without resigning.

### Your First Contribution

Unsure where to begin contributing? You can start by looking through these beginner and help-wanted issues:

- First Timers - issues specific for first time github users, designed and created to guide you through contributing.
- Beginner issues - issues which should only require a few lines of code, and a test or two.
- Help wanted - issues which should be a bit more involved than beginner issues.

### Your first project

Working on your first Pull Request? You can learn how from this _free_ series, [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

At this point, you're ready to make your changes! Feel free to ask for help; everyone is a beginner at first!

If a maintainer asks you to "rebase" your PR, they're saying that a lot of code has changed, and that you need to update your branch so it's easier to merge. Note that we do provide an automatic command for this which can be attempted through commenting `/rebase`.

### Creating a merge request

When you believe you have completed your contribution, you will need to make an pull request. This should be simple for most users, and we have provided some templates for you to get started, however if you choose to create your pull request from scratch, please ensure the following steps are followed.

#### Titling your request

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format when creating pull requests, this is so we can squash all pull requests when merging and automatically create our changelog and releases. To ensure that this convention is completed, our automation will fail if the title does not follow this standard.

#### Prefixes

If you are still working on your pull request, please ensure that you prefix it with `WIP:` to ensure that the pull isn't accidently merged before it's ready.

### Security Disclosures

In order to determine whether you are dealing with a security issue, ask yourself these two questions:

- Can I access something that's not mine, or something I shouldn't have access to?
- Can I disable something for other people?

If the answer to either of those two questions are "yes", then you're probably dealing with a security issue. Note that even if you answer "no" to both questions, you may still be dealing with a security issue, so if you're unsure, just email us.

### Understanding Labels

- **Statuses**

  - `Abandoned` - This issue / pull request has been abandon
  - `Available` - This issue is available for either Developers or Community contributors to develop
  - `Blocked` - Another issue is blocking the development of this issue
  - `Completed` - Development has finished and been merged for this issue
  - `In Progress` - Development is underway for this issue
  - `On Hold` - The developers have decided to hold the development of this request
  - `Pending` - The developers have approved development of this request.
  - `Review Needed` - This pull request is waiting on review
  - `Revision Needed` - This pull request has been reviewed and requires revision
  - `Do not develop` - This wont be worked on by DevOPS or Community contributor
  - `Stale` - This issue has been automatically marked as stale because it has not had recent activite

- **Types**

  - `Chore` - Changes to the build process or auxiliary tools and libraries such as documentation generation
  - `Bug` - A possible bug
  - `Maintenance` - Changes to maintain the project
  - `Discussion` - A conversation about something
  - `Documentation` - Changes to the documentation
  - `Feature` - A new feature
  - `Enhancement` - Improving a feature
  - `Question` - Question about this project
  - `Fix` - A bug fix
  - `Optimisation` - A code change that improves performance
  - `Refactor` - A code change that neither fixes a bug nor adds a feature
  - `Revert` - Removes & Discards a previous change as error
  - `Decrecated` - Removes previous functionality which is no longer needed
  - `Removal` - Removes previous functionality which is no longer needed
  - `Style` - Changes that do not affect the meaning of the code (white-space formatting missing semi-colons etc)

- **DevOps**

  - `Accepted` - DevOPS are planning
  - `Completed` - DevOPS have complete
  - `Deploying` - DevOPS are deploying to latest
  - `Developing` - DevOPS are Developing
  - `Rejected` - DevOPS wont continue
  - `Reviewing` - DevOPS awaiting review
  - `Staging` - DevOPS deployed to Staging
  - `Testing` - DevOPS deployed to Testing

- **ComOps**

  - `Accepted` - A community contributor is planning to work on this issue
  - `Completed` - The contributor has completed this issue and handed over to the developers to stage & deploy
  - `Developing` - The contributor is developing this issue
  - `Awaiting Review` - The contributor is awaiting review
  - `Testing` - The contributor is awaiting testing results

- **Bugs**

  - `Low` - This bug isn't a high priority for the next release
  - `Medium` - This bug affects more than 10% of users and should be patched before the next major release
  - `High` - This bug affects more than 25% of users and should be patched before the next minor release
  - `Critical` - This bug affects more than 50% of users and should be patched before any new features are added
  - `Confirmed` - This bug has been confirmed
  - `New` - This bug is new
  - `Fixed` - This bug has been fixed

- **Content types**

  - `Dependences` - Changes that affect the dependences
  - `Workflow & CI` - Changes that affect the workflow & CI
  - `UI / UX` - Changes that affect the UI / UX
  - `Backend` - Changes that affect the backend
  - `Frontend` - Changes that affect the fronted

- **Miscellaneous**
  - `security fix` - A Security Fix
  - `security vulnerability` - A Security vulnerability
  - `Duplicate` - A Duplicate of another issue/pull
  - `Help wanted` - Help is needed to continue
  - `Needs rebase` - This request needs to be rebased
  - `Work in progress` - This pull request is a wip
  - `Sponsor Request ❤️` - This request has come from a sponsor
  - `More information needed` - Requires more information before it can continue
  - `First Timers` - A Good issue for first time github users
  - `skip-changelog` - Skip the changelog
  - `automerge` - Automatically Merge this request
  - `good first issue` - What it says on the tin. This helps new people find stuff to work on, because [GitHub actively promotes it](https://help.github.com/articles/helping-new-contributors-find-your-project-with-labels/) and [initializes new repositories with that label](https://help.github.com/articles/about-labels/#using-default-labels).


</details>

<details>
    <summary><b>Code Of Conduct</b></summary>

### Contributor Covenant Code of Conduct

#### Our Pledge

In the interest of fostering an open and welcoming environment, we as
contributors and maintainers pledge to making participation in our project and
our community a harassment-free experience for everyone, regardless of age, body
size, disability, ethnicity, sex characteristics, gender identity and expression,
level of experience, education, socio-economic status, nationality, personal
appearance, race, religion, or sexual identity and orientation.

#### Our Standards

Examples of behaviour that contributes to creating a positive environment
include:

- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Examples of unacceptable behaviour by participants include:

- The use of sexualized language or imagery and unwelcome sexual attention or
  advances
- Trolling, insulting/derogatory comments, and personal or political attacks
- Public or private harassment
- Publishing others' private information, such as a physical or electronic
  address, without explicit permission
- Other conduct which could reasonably be considered inappropriate in a
  professional setting

#### Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable
behaviour and are expected to take appropriate and fair corrective action in
response to any instances of unacceptable behaviour.

Project maintainers have the right and responsibility to remove, edit, or
reject comments, commits, code, wiki edits, issues, and other contributions
that are not aligned to this Code of Conduct, or to ban temporarily or
permanently any contributor for other behaviours that they deem inappropriate,
threatening, offensive, or harmful.

#### Scope

This Code of Conduct applies both within project spaces and in public spaces
when an individual is representing the project or its community. Examples of
representing a project or community include using an official project e-mail
address, posting via an official social media account, or acting as an appointed
representative at an online or offline event. Representation of a project may be
further defined and clarified by project maintainers.

#### Enforcement

Instances of abusive, harassing, or otherwise unacceptable behaviour may be
reported by contacting the project team at hello@smartcloud.gg. All
complaints will be reviewed and investigated and will result in a response that
is deemed necessary and appropriate to the circumstances. The project team is
obligated to maintain confidentiality with regard to the reporter of an incident.
Further details of specific enforcement policies may be posted separately.

Project maintainers who do not follow or enforce the Code of Conduct in good
faith may face temporary or permanent repercussions as determined by other
members of the project's leadership.

#### Attribution

This Code of Conduct is adapted from the [Contributor Covenant][homepage], version 1.4,
available at https://www.contributor-covenant.org/version/1/4/code-of-conduct.html

[homepage]: https://www.contributor-covenant.org

For answers to common questions about this code of conduct, see
https://www.contributor-covenant.org/faq


</details>

<details>
    <summary><b>Code Review Process</b></summary>

### Code review process


</details>

<details>
    <summary><b>GPG Key Guide</b></summary>

### Signing Git with GPG using Keybase

This tutorial was originally writen by [Stephen Rees-Carter](https://stephenreescarter.net/signing-git-commits-with-a-keybase-gpg-key/)

We suggest using this method of GPG key setup to reduce the amount of keys you need to maintain when working on your devices, however it's not perfect for everyone. This tutorial assumes that you are working from a private machine.

#### Prerequisities

- [Keybase](https://keybase.io/inv/8353caa6be) installed
- GPG Key configured within Keybase
- GPG installed on your device ([Windows](https://www.gpg4win.org/) | [Linux](https://gnupg.org/download/) | [macOS](https://gpgtools.org/))

#### Update the GPG Key

1. First, export your public and private keys from Keybase using the `keybase pgp` command:

   ```shell
   keybase pgp export --outfile keybase-public.key
   keybase pgp export --secret --outfile keybase-private.key
   ```

   During the export process, Keybase will ask for your account password and prompt to set a new password for the private key file.

2. Next, you need to import the keys into GPG using the `gpg` command:

   ```shell
   gpg --allow-secret-key-import --import keybase-private.key
   gpg --import keybase-public.key
   ```

   The import process will ask for the password you just assigned to your private key, for obvious reasons.

3. Now that you’ve imported the key into GPG, you need to modify the key to include your email address. This is done by invoking the `gpg --edit-key` command, with a unique identifier for your key. I found using the `<username>@keybase.io` address worked nicely.

   ```shell
   gpg --edit-key <username>@keybase.io
   ```

   This command will get you into the `gpg>` prompt, and from there you need to run the `adduid` command. It will prompt for your `Real name` and `Email address` (feel free to leave `Comment` empty). Once you’ve provided your name and email, confirm using the `O` and then `save` to close the `gpg>` prompt.

4. Using `gpg --edit-key <key>` and selecting the `trust` option. I suggest using trust level `5 = I trust ultimately`, since it is your own key. After applying the change, use `save` to close the prompt.

5. Once that’s done, you can push your updated key back into Keybase.

   ```shell
   keybase pgp update
   ```

6. Add key to [Github](https://github.com) ([follow this tutorial](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/adding-a-new-gpg-key-to-your-github-account))

7. Setup git signing on commits
   Use the `git config user.signingkey` option to specify the Key ID for git to use. You can get this from the GitHub GPG keys page if you’re unsure what it is. You can also require Git to sign all commits with the `commit.gpgsign` option.

   ```shell
   git config --global user.signingkey <Key ID>
   git config --global commit.gpgsign true
   ```


</details>

## Security

<details>
    <summary><b>Current Status</b></summary>

### Security Policy

#### Supported Versions

Use this section to tell people about which versions of your project are
currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| < 1.0   | :white_check_mark: |

#### Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a
reported vulnerability, what to expect if the vulnerability is accepted or
declined, etc.


</details>
