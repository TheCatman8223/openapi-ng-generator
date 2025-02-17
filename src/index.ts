import { parse as parseV3 } from './openApi/v3';
import { getOpenApiSpec } from './utils/getOpenApiSpec';
import { getOpenApiVersion, OpenApiVersion } from './utils/getOpenApiVersion';
import { isString } from './utils/isString';
import { postProcessClient } from './utils/postProcessClient';
import { registerHandlebarTemplates } from './utils/registerHandlebarTemplates';
import { writeClient } from './utils/writeClient';


export type Options = {
	input: string | Record<string, any>;
	output: string;
	useOptions?: boolean;
	useUnionTypes?: boolean;
	withInterceptor?: boolean | undefined;
};

/**
 * Generate the OpenAPI client. This method will read the OpenAPI specification and based on the
 * given language it will generate the client, including the typed models, validation schemas,
 * service layer, etc.
 * @param input The relative location of the OpenAPI spec
 * @param output The relative location of the output directory
 * @param useOptions Use options or arguments functions
 * @param useUnionTypes Use union types instead of enums
 * @param withInterceptor Creates an angular http interceptor
 */
export const generate = async ({
	input,
	output,
	useOptions = false,
	useUnionTypes = false,
	withInterceptor
}: Options): Promise<void> => {
	const openApi = isString(input) ? await getOpenApiSpec(input) : input;
	const openApiVersion = getOpenApiVersion(openApi);
	const templates = registerHandlebarTemplates({
		useUnionTypes,
		useOptions,
		withInterceptor
	});

	switch (openApiVersion) {
		case OpenApiVersion.V3: {
			const client = parseV3(openApi);
			const clientFinal = postProcessClient(client);
			await writeClient(
				clientFinal,
				templates,
				output,
				useOptions,
				useUnionTypes,
				withInterceptor
			);
			break;
		}
	}
};

export default {
	generate,
};
