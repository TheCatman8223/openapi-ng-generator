import { EOL } from 'os';

export const formatIndentation = (s: string): string => {
	let lines = s.split(EOL);
	lines = lines.map(line => {
		return line.replace(/\t/g, '  ');
	});
	// Make sure we have a blank line at the end
	const content = lines.join(EOL);
	return `${content}${EOL}`;
};
