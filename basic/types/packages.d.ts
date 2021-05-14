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
