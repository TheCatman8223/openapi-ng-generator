export type Options = {
	input: string | Record<string, any>;
	output: string;
	useOptions?: boolean;
	useUnionTypes?: boolean;
	withInterceptor?: boolean | undefined;
};

export declare function generate(options: Options): Promise<void>;

declare type OpenAPI = {
	generate: typeof generate;
};

export default OpenAPI;
