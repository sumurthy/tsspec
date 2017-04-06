# tryGetByName()
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



Searches for a content placeholder with the specified name; if none is found, then the function returns undefined.

**Signature:** _public tryGetByName(name: string): [Placeholder](../../sp-application-base.api/class/placeholder.md) | undefined;_

**Returns**: [`Placeholder `](../../sp-application-base.api/class/placeholder.md),` undefined`





#### Parameters
None


### Remarks

The host application makes no guarantees about the availability of a given placeholder. In situations where an expected placeholder is not available, the third party extension must handle this, e.g. by not rendering anything, or by choosing an alternative placeholder.

