import { readSpecFromHttp } from './readSpecFromHttp';
import { readSpecFromHttps } from './readSpecFromHttps';

export const readSpec = async (input: string): Promise<string> => {
	if (input.startsWith('https://')) {
		return await readSpecFromHttps(input);
	}
	return await readSpecFromHttp(input);
};
