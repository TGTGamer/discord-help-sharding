import { CommandGroup, Packages } from '../..';
export declare function multi(this: Packages, { file, commandGroup, masterGroup, group, filepath }: {
    file: string;
    commandGroup: CommandGroup;
    masterGroup?: CommandGroup[];
    group: string;
    filepath: string;
}): Promise<void>;
