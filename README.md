
# OpenAPI Angular+Typescript Codegen

  

Node.js library that generates Angular client (v19) based on V3 OpenAPI specification.
Modified and updated from no longer maintained project: https://github.com/ferdikoomen/openapi-typescript-codegen, so big thanks to Ferdi for laying out the foundation! 👌🙌

This library has no substantial configs available. There are other libraries out there that take a lot of config parameters, the intention for this library is a minimal, clean output for Angular. This library has been created out of own need and the output given is based on personal preferences.


## Install

```

npm install openapi-ng-generator

```

  

## Usage
```
$ openapi-ng-gen

Usage: openapi-ng-gen [options]

Options:

-i, --input <value> OpenAPI specification, can be a path, url or string content (required)
-o, --output <value> Output directory (required)
--useOptions Use options instead of arguments
--useUnionTypes Use union types instead of enums

```

## Example

```
$ openapi-ng-gen --i ./spec.json --o ./api
 ```

**Produces:**
```
api/
├── core/
│   ├── ApiError.ts
│   ├── ApiRequestOptions.ts
│   ├── ApiResult.ts
│   ├── OpenAPI.ts
│   └── request.ts
├── models/
│   └── models.ts
└── services/
    └── service files with api endpoints
```
