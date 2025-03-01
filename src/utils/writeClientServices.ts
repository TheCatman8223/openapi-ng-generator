import { resolve } from 'path';

import type { Service } from '../client/interfaces/Service';
import { writeFile } from './fileSystem';
import { formatCode as f } from './formatCode';
import { formatIndentation as i } from './formatIndentation';
import type { Templates } from './registerHandlebarTemplates';

/**
 * Generate Services using the Handlebar template and write to disk.
 * @param services Array of Services to write
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param useUnionTypes Use union types instead of enums
 * @param useOptions Use options or arguments functions
 */
export const writeClientServices = async (
	services: Service[],
	templates: Templates,
	outputPath: string,
	useUnionTypes: boolean,
	useOptions: boolean,
): Promise<void> => {
	for (const service of services) {
		const file = resolve(outputPath, `${service.name}Service.ts`);
		const templateResult = templates.exports.service({
			...service,
			useUnionTypes,
			useOptions,
		});
		await writeFile(file, i(f(templateResult)));
	}
};
