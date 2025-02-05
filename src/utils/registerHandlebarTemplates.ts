import Handlebars from 'handlebars/runtime';
import angularGetHeaders from '../templates/core/angular/getHeaders.hbs';
import angularGetRequestBody from '../templates/core/angular/getRequestBody.hbs';
import angularGetResponseBody from '../templates/core/angular/getResponseBody.hbs';
import angularGetResponseHeader from '../templates/core/angular/getResponseHeader.hbs';
import angularSendRequest from '../templates/core/angular/sendRequest.hbs';
import templateCoreApiError from '../templates/core/ApiError.hbs';
import templateCoreApiRequestOptions from '../templates/core/ApiRequestOptions.hbs';
import templateCoreApiResult from '../templates/core/ApiResult.hbs';
import templateHeader from '../templates/partials/header.hbs';
import functionBase64 from '../templates/core/functions/base64.hbs';
import functionCatchErrorCodes from '../templates/core/functions/catchErrorCodes.hbs';
import functionGetFormData from '../templates/core/functions/getFormData.hbs';
import functionGetQueryString from '../templates/core/functions/getQueryString.hbs';
import functionGetUrl from '../templates/core/functions/getUrl.hbs';
import functionIsBlob from '../templates/core/functions/isBlob.hbs';
import functionIsDefined from '../templates/core/functions/isDefined.hbs';
import functionIsFormData from '../templates/core/functions/isFormData.hbs';
import functionIsString from '../templates/core/functions/isString.hbs';
import functionIsStringWithValue from '../templates/core/functions/isStringWithValue.hbs';
import functionIsSuccess from '../templates/core/functions/isSuccess.hbs';
import functionResolve from '../templates/core/functions/resolve.hbs';
import templateCoreSettings from '../templates/core/OpenAPI.hbs';
import templateCoreRequest from '../templates/core/request.hbs';
import templateExportModel from '../templates/exportModel.hbs';
import templateExportService from '../templates/exportService.hbs';
import templateIndex from '../templates/index.hbs';
import partialBase from '../templates/partials/base.hbs';
import partialExportComposition from '../templates/partials/exportComposition.hbs';
import partialExportEnum from '../templates/partials/exportEnum.hbs';
import partialExportInterface from '../templates/partials/exportInterface.hbs';
import partialExportType from '../templates/partials/exportType.hbs';
import partialHeader from '../templates/partials/header.hbs';
import partialIsNullable from '../templates/partials/isNullable.hbs';
import partialIsReadOnly from '../templates/partials/isReadOnly.hbs';
import partialIsRequired from '../templates/partials/isRequired.hbs';
import partialParameters from '../templates/partials/parameters.hbs';
import partialResult from '../templates/partials/result.hbs';
import partialType from '../templates/partials/type.hbs';
import partialTypeArray from '../templates/partials/typeArray.hbs';
import partialTypeDictionary from '../templates/partials/typeDictionary.hbs';
import partialTypeEnum from '../templates/partials/typeEnum.hbs';
import partialTypeGeneric from '../templates/partials/typeGeneric.hbs';
import partialTypeInterface from '../templates/partials/typeInterface.hbs';
import partialTypeIntersection from '../templates/partials/typeIntersection.hbs';
import partialTypeReference from '../templates/partials/typeReference.hbs';
import partialTypeUnion from '../templates/partials/typeUnion.hbs';
import { registerHandlebarHelpers } from './registerHandlebarHelpers';

export interface Templates {
	index: Handlebars.TemplateDelegate;
	exports: {
		model: Handlebars.TemplateDelegate;
		service: Handlebars.TemplateDelegate;
		header: Handlebars.TemplateDelegate;
	};
	core: {
		settings: Handlebars.TemplateDelegate;
		apiError: Handlebars.TemplateDelegate;
		apiRequestOptions: Handlebars.TemplateDelegate;
		apiResult: Handlebars.TemplateDelegate;
		request: Handlebars.TemplateDelegate;
	};
}

/**
 * Read all the Handlebar templates that we need and return on wrapper object
 * so we can easily access the templates in out generator / write functions.
 */
export const registerHandlebarTemplates = (root: {
	useOptions: boolean;
	useUnionTypes: boolean;
}): Templates => {
	registerHandlebarHelpers(root);

	// Main templates (entry points for the files we write to disk)
	const templates: Templates = {
		index: Handlebars.template(templateIndex),
		exports: {
			model: Handlebars.template(templateExportModel),
			service: Handlebars.template(templateExportService),
			header: Handlebars.template(templateHeader)
		},
		core: {
			settings: Handlebars.template(templateCoreSettings),
			apiError: Handlebars.template(templateCoreApiError),
			apiRequestOptions: Handlebars.template(templateCoreApiRequestOptions),
			apiResult: Handlebars.template(templateCoreApiResult),
			request: Handlebars.template(templateCoreRequest),
		},
	};

	// Partials for the generations of the models, services, etc.
	Handlebars.registerPartial('exportEnum', Handlebars.template(partialExportEnum));
	Handlebars.registerPartial('exportInterface', Handlebars.template(partialExportInterface));
	Handlebars.registerPartial('exportComposition', Handlebars.template(partialExportComposition));
	Handlebars.registerPartial('exportType', Handlebars.template(partialExportType));
	Handlebars.registerPartial('header', Handlebars.template(partialHeader));
	Handlebars.registerPartial('isNullable', Handlebars.template(partialIsNullable));
	Handlebars.registerPartial('isReadOnly', Handlebars.template(partialIsReadOnly));
	Handlebars.registerPartial('isRequired', Handlebars.template(partialIsRequired));
	Handlebars.registerPartial('parameters', Handlebars.template(partialParameters));
	Handlebars.registerPartial('result', Handlebars.template(partialResult));
	Handlebars.registerPartial('type', Handlebars.template(partialType));
	Handlebars.registerPartial('typeArray', Handlebars.template(partialTypeArray));
	Handlebars.registerPartial('typeDictionary', Handlebars.template(partialTypeDictionary));
	Handlebars.registerPartial('typeEnum', Handlebars.template(partialTypeEnum));
	Handlebars.registerPartial('typeGeneric', Handlebars.template(partialTypeGeneric));
	Handlebars.registerPartial('typeInterface', Handlebars.template(partialTypeInterface));
	Handlebars.registerPartial('typeReference', Handlebars.template(partialTypeReference));
	Handlebars.registerPartial('typeUnion', Handlebars.template(partialTypeUnion));
	Handlebars.registerPartial('typeIntersection', Handlebars.template(partialTypeIntersection));
	Handlebars.registerPartial('base', Handlebars.template(partialBase));

	// Generic functions used in 'request' file @see src/templates/core/request.hbs for more info
	Handlebars.registerPartial('functions/catchErrorCodes', Handlebars.template(functionCatchErrorCodes));
	Handlebars.registerPartial('functions/getFormData', Handlebars.template(functionGetFormData));
	Handlebars.registerPartial('functions/getQueryString', Handlebars.template(functionGetQueryString));
	Handlebars.registerPartial('functions/getUrl', Handlebars.template(functionGetUrl));
	Handlebars.registerPartial('functions/isBlob', Handlebars.template(functionIsBlob));
	Handlebars.registerPartial('functions/isDefined', Handlebars.template(functionIsDefined));
	Handlebars.registerPartial('functions/isFormData', Handlebars.template(functionIsFormData));
	Handlebars.registerPartial('functions/isString', Handlebars.template(functionIsString));
	Handlebars.registerPartial('functions/isStringWithValue', Handlebars.template(functionIsStringWithValue));
	Handlebars.registerPartial('functions/isSuccess', Handlebars.template(functionIsSuccess));
	Handlebars.registerPartial('functions/base64', Handlebars.template(functionBase64));
	Handlebars.registerPartial('functions/resolve', Handlebars.template(functionResolve));

	// Specific files for the angular client implementation
	Handlebars.registerPartial('angular/getHeaders', Handlebars.template(angularGetHeaders));
	Handlebars.registerPartial('angular/getRequestBody', Handlebars.template(angularGetRequestBody));
	Handlebars.registerPartial('angular/getResponseBody', Handlebars.template(angularGetResponseBody));
	Handlebars.registerPartial('angular/getResponseHeader', Handlebars.template(angularGetResponseHeader));
	Handlebars.registerPartial('angular/sendRequest', Handlebars.template(angularSendRequest));

	return templates;
};
