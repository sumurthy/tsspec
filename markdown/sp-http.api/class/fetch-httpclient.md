# fetch(url,configuration,options)
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



Performs a REST service call. Although the SPHttpClient subclass adds additional enhancements, the parameters and semantics for HttpClient.fetch() are essentially the same as the WHATWG API standard that is documented here: https://fetch.spec.whatwg.org/

**Signature:** _public fetch(url: string, configuration: [HttpClientConfiguration](../../sp-http.api/class/httpclientconfiguration.md),
    options: [IHttpClientOptions](../../sp-http.api/interface/ihttpclientoptions.md)): [Promise](../../es6-promise.api/class/promise.md)<[HttpClientResponse](../../sp-http.api/class/httpclientresponse.md)>;_

**Returns**: [`Promise`](../../es6-promise.api/class/promise.md)<[`HttpClientResponse`](../../sp-http.api/class/httpclientresponse.md)>



a promise that will return the result

#### Parameters


| Parameter	   | Type    | Description |
|:-------------|:---------------|:------------|
| `url`    | `string` | the URL to fetch |
| `configuration`    | [`HttpClientConfiguration`](../../sp-http.api/class/httpclientconfiguration.md) | determines the default behavior of HttpClient; normally this should be the latest version number from HttpClientConfigurations |
| `options`    | [`IHttpClientOptions`](../../sp-http.api/interface/ihttpclientoptions.md) | additional options that affect the request |


