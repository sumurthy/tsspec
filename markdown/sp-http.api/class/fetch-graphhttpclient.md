# fetch(url,configuration,options)
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



Generally, the parameters and semantics for HttpClient.fetch() are essentially the same as the WHATWG API standard that is documented here: https://fetch.spec.whatwg.org/ The GraphHttpClient subclass adds some additional behaviors that are convenient when working with SharePoint ODATA API's (which can be avoided by using HttpClient instead): - Default "Accept" and "Content-Type" headers are added if not explicitly specified.

**Signature:** _public fetch(url: string,
    configuration: [GraphHttpClientConfiguration](../../sp-http.api/class/graphhttpclientconfiguration.md),
    options: [IGraphHttpClientOptions](../../sp-http.api/interface/igraphhttpclientoptions.md)): [Promise](../../es6-promise.api/class/promise.md)<GraphHttpClientResponse>;_

**Returns**: [`Promise`](../../es6-promise.api/class/promise.md)<GraphHttpClientResponse>



a promise that will return the result

#### Parameters


| Parameter	   | Type    | Description |
|:-------------|:---------------|:------------|
| `url`    | `string` | The url string should be relative to the graph server. Good: 'v1.0/me/events' Bad: '/v1.0/me/events', 'https://graph.microsoft.com/v1.0/me/events' |
| `configuration`    | [`GraphHttpClientConfiguration`](../../sp-http.api/class/graphhttpclientconfiguration.md) | determines the default behavior of GraphHttpClient; normally this should be the latest version number from GraphHttpClientConfigurations |
| `options`    | [`IGraphHttpClientOptions`](../../sp-http.api/interface/igraphhttpclientoptions.md) | additional options that affect the request |


