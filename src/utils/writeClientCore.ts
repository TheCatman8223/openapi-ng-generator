import { resolve } from 'path';

import type { Client } from '../client/interfaces/Client';
import { writeFile } from './fileSystem';
import { formatIndentation as i } from './formatIndentation';
import type { Templates } from './registerHandlebarTemplates';
import { isDefined } from './isDefined';

/**
 * Generate OpenAPI core files, this includes the basic boilerplate code to handle requests.
 * @param client Client object, containing, models, schemas and services
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param request Path to custom request file
 */
export const writeClientCore = async (
	client: Client,
	templates: Templates,
	outputPath: string,
	withInterceptor: boolean | undefined
): Promise<void> => {
	const httpRequest = "AngularHttpRequest";
	const context = {
		httpRequest,
		server: client.server,
		version: client.version,
	};

	await writeFile(resolve(outputPath, 'OpenAPI.ts'), i(templates.core.settings(context)));
	await writeFile(resolve(outputPath, 'ApiError.ts'), i(templates.core.apiError(context)));
	await writeFile(resolve(outputPath, 'ApiRequestOptions.ts'), i(templates.core.apiRequestOptions(context)));
	await writeFile(resolve(outputPath, 'ApiResult.ts'), i(templates.core.apiResult(context)));
	await writeFile(resolve(outputPath, 'request.ts'), i(templates.core.request(context)));
	if (isDefined(withInterceptor)) {
		await writeFile(resolve(outputPath, 'openapi-http-interceptor.ts'), i(templates.core.httpInterceptor(context)));
	}
};
