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
