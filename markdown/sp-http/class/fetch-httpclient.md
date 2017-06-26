# fetch(url,configuration,options)



Performs a REST service call. Although the SPHttpClient subclass adds additional enhancements, the parameters and semantics for HttpClient.fetch() are essentially the same as the WHATWG API standard that is documented here: https://fetch.spec.whatwg.org/

**Signature:** _public fetch(url: string, configuration: [HttpClientConfiguration](../../sp-http/class/httpclientconfiguration.md),
    options: [IHttpClientOptions](../../sp-http/interface/ihttpclientoptions.md)): [Promise](../../web-apis/class/promise.md)<[HttpClientResponse](../../sp-http/class/httpclientresponse.md)>;_

**Returns**: [`Promise`](../../web-apis/class/promise.md)<[`HttpClientResponse`](../../sp-http/class/httpclientresponse.md)>



a promise that will return the result

#### Parameters


| Parameter	   | Type    | Description |
|:-------------|:---------------|:------------|
| `url`    | `string` | the URL to fetch |
| `configuration`    | [`HttpClientConfiguration`](../../sp-http/class/httpclientconfiguration.md) | determines the default behavior of HttpClient; normally this should be the latest version number from HttpClientConfigurations |
| `options`    | [`IHttpClientOptions`](../../sp-http/interface/ihttpclientoptions.md) | additional options that affect the request |


