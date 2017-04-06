# getBaseManifest()
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



The child class's overridden "manifest" property should call this method.

**Signature:** _protected getBaseManifest(): IClientSideComponentManifest;_

**Returns**: `IClientSideComponentManifest`





#### Parameters
None


### Remarks

This is a workaround for a TypeScript/ES5 limitation, which prevents a subclass using "super" to access properties from the base class (even though functions work okay). It will be fixed in TypeScript/ES6.

