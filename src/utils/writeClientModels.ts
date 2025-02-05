import { resolve } from 'path';
import { writeFile, appendFile, existsSync, readFileSync } from './fileSystem';
import type { Model } from '../client/interfaces/Model';
import { formatCode as f } from './formatCode';
import { formatIndentation as i } from './formatIndentation';
import type { Templates } from './registerHandlebarTemplates';

/**
 * Generate Models using the Handlebar template and write to disk.
 * @param models Array of Models to write
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param useUnionTypes Use union types instead of enums
 */
export const writeClientModels = async (
	models: Model[],
	templates: Templates,
	outputPath: string,
	useUnionTypes: boolean,
): Promise<void> => {
	const outputFile = resolve(outputPath, 'models.ts'); // Path to the single output file
	
	const fileExists = existsSync(outputFile);
	const fileContent = fileExists ? readFileSync(outputFile, 'utf8') : '';

	if (!fileExists || !fileContent.trim()) {
		const header = templates.exports.header({}); // Use the header template
		await writeFile(outputFile, i(f(header)) + '\n');
	}

	// Loop through models and append each to the file
	for (const model of models) {
		const templateResult = templates.exports.model({
			...model,
			useUnionTypes,
		});
		await appendFile(outputFile, i(f(templateResult)) + '\n');
	}
};