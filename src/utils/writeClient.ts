import { resolve } from 'path';

import type { Client } from '../client/interfaces/Client';
import { mkdir, rmdir } from './fileSystem';
import { isSubDirectory } from './isSubdirectory';
import type { Templates } from './registerHandlebarTemplates';
import { writeClientCore } from './writeClientCore';
import { writeClientIndex } from './writeClientIndex';
import { writeClientModels } from './writeClientModels';
import { writeClientServices } from './writeClientServices';
import { isDefined } from './isDefined';

/**
 * Write our OpenAPI client, using the given templates at the given output
 * @param client Client object with all the models, services, etc.
 * @param templates Templates wrapper with all loaded Handlebars templates
 * @param output The relative location of the output directory
 * @param useOptions Use options or arguments functions
 * @param useUnionTypes Use union types instead of enums
 * @param withInterceptor Creates an angular http interceptor
 */
export const writeClient = async (
	client: Client,
	templates: Templates,
	output: string,
	useOptions: boolean,
	useUnionTypes: boolean,
	withInterceptor: boolean | undefined
): Promise<void> => {
	const outputPath = resolve(process.cwd(), output);
	const outputPathCore = resolve(outputPath, 'core');
	const outputPathModels = resolve(outputPath, 'models');
	const outputPathServices = resolve(outputPath, 'services');

	if (!isSubDirectory(process.cwd(), output)) {
		throw new Error(`Output folder is not a subdirectory of the current working directory`);
	}

	await rmdir(outputPathCore);
	await mkdir(outputPathCore);
	await writeClientCore(client, templates, outputPathCore, undefined);
	if (isDefined(withInterceptor)) {
		await rmdir(outputPathCore);
		await mkdir(outputPathCore);
		await writeClientCore(client, templates, outputPathCore, withInterceptor);
	}

	await rmdir(outputPathServices);
	await mkdir(outputPathServices);
	await writeClientServices(
		client.services,
		templates,
		outputPathServices,
		useUnionTypes,
		useOptions
	);

	await rmdir(outputPathModels);
	await mkdir(outputPathModels);
	await writeClientModels(client.models, templates, outputPathModels, useUnionTypes);

	await mkdir(outputPath);
	await writeClientIndex(
		client,
		templates,
		outputPath,
		useUnionTypes,
		withInterceptor
	);

};
