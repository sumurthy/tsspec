# HttpClientResponse class

_Implements: [`Response`](../../whatwg-fetch.api/class/response.md)_





The Response subclass returned by methods such as HttpClient.fetch().



## Properties

| Property	   | Access Modifier | Type	| Description|
|:-------------|:----|:-------|:-----------|
|`bodyUsed`     | `public` | `boolean` | _Read-only._  |
|`headers`     | `public` | [`Headers`](../../whatwg-fetch.api/class/headers.md) | _Read-only._  |
|`nativeResponse`     | `public` | [`Response`](../../whatwg-fetch.api/class/response.md) |  |
|`ok`     | `public` | `boolean` | _Read-only._  |
|`status`     | `public` | `number` | _Read-only._  |
|`statusText`     | `public` | `string` | _Read-only._  |
|`type`     | `public` | `ResponseType` | _Read-only._  |
|`url`     | `public` | `string` | _Read-only._  |




## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`arrayBuffer()`](arraybuffer-httpclientresponse.md)     | `public` | [`Promise`](../../es6-promise.api/class/promise.md)<ArrayBuffer> |  |
|[`blob()`](blob-httpclientresponse.md)     | `public` | [`Promise`](../../es6-promise.api/class/promise.md)<Blob> |  |
|[`clone()`](clone-httpclientresponse.md)     | `public` | [`HttpClientResponse`](../../sp-http.api/class/httpclientresponse.md) |  |
|[`formData()`](formdata-httpclientresponse.md)     | `public` | [`Promise`](../../es6-promise.api/class/promise.md)<FormData> |  |
|[`json()`](json-httpclientresponse.md)     | `public` | [`Promise`](../../es6-promise.api/class/promise.md)<any> |  |
|[`text()`](text-httpclientresponse.md)     | `public` | [`Promise`](../../es6-promise.api/class/promise.md)<string> |  |





### Remarks

This is a placeholder. In the future, additional HttpClient-specific functionality may be added to this class.

