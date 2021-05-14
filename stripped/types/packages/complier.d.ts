import ts from 'typescript';
import { Packages } from '..';
export declare function compile(this: Packages, filepaths: string[], options: ts.CompilerOptions): Promise<void>;
