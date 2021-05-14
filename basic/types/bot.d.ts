/// <reference types="node" />
import { LoggingLevels, loggingOptions } from '@videndum/utilities';
import Discord, { Collection, CommandInteraction as CI, Interaction as I, Message as M, MessageEmbed } from 'discord.js';
import { EventEmitter } from 'events';
import fetch from 'node-fetch';
import { Config } from '../config';
import { Command, Commands, Cooldowns, Prompts } from './packages';
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
    config: Config;
    client: Discord.Client;
    modules: Modules;
    extensions: Extensions;
    fetch: typeof fetch;
    L: import("@videndum/utilities").Logger;
    log: (name: LoggingLevels, message: loggingOptions['message'], options?: loggingOptions['options']) => void;
    i18: import("@videndum/utilities").Localizer;
    constructor();
    loadEvents(): void;
    getPrefixes(): Promise<string[] | undefined>;
}
