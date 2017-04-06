# getBaseProperties()
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



The child class's "properties" property getter should call this method.

**Signature:** _protected getBaseProperties(): [IBaseExtensionProperties](../../sp-extension-base.api/interface/ibaseextensionproperties.md) | undefined;_

**Returns**: [`IBaseExtensionProperties `](../../sp-extension-base.api/interface/ibaseextensionproperties.md),` undefined`





#### Parameters
None


### Remarks

This is a workaround for a TypeScript/ES5 limitation, which prevents a subclass's "context" property from using "super" to access the base class's implementation.

