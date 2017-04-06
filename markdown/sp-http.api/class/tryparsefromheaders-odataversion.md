# tryParseFromHeaders()
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



If the 'OData-Version' header is present, this returns the corresponding ODataVersion constant. An error is thrown if the version number is not supported. If the header is missing, then undefined is returned.

**Signature:** _public static tryParseFrom[Headers](../../whatwg-fetch.api/class/headers.md)(headers: Headers): [ODataVersion](../../sp-http.api/class/odataversion.md) | undefined;_

**Returns**: [`ODataVersion `](../../sp-http.api/class/odataversion.md),` undefined`





#### Parameters
None


