import { resolve } from 'path';

import type { Client } from '../client/interfaces/Client';
import { writeFile } from './fileSystem';
import { Templates } from './registerHandlebarTemplates';

/**
 * Generate the OpenAPI client index file using the Handlebar template and write it to disk.
 * The index file just contains all the exports you need to use the client as a standalone
 * library. But yuo can also import individual models and services directly.
 * @param client Client object, containing, models, schemas and services
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param useUnionTypes Use union types instead of enums
 * @param withInterceptor Creates an angular http interceptor
 */
export const writeClientIndex = async (
	client: Client,
	templates: Templates,
	outputPath: string,
	useUnionTypes: boolean,
	withInterceptor: boolean | undefined
): Promise<void> => {
	const templateResult = templates.index({
		useUnionTypes,
		withInterceptor,
		server: client.server,
		version: client.version,
		models: client.models,
		services: client.services,
	});

	await writeFile(resolve(outputPath, 'index.ts'), templateResult);
};
