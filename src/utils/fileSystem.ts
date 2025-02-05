import fsExtra from 'fs-extra';

export const copyFile = fsExtra.copyFile;
export const mkdir = fsExtra.mkdirp;
export const exists = fsExtra.pathExists;
export const readFile = fsExtra.readFile;
export const rmdir = fsExtra.remove;
export const writeFile = fsExtra.writeFile;
export const appendFile = fsExtra.appendFile;

import { existsSync as __existsSync, readFileSync as __readFileSync } from 'fs';

export {
	__existsSync as existsSync,
	__readFileSync as readFileSync
};
