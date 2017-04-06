# ExtensionContext class







The base class for context objects for client-side extensions.


## Constructor
Creates a new instance of extension context

**Signature:** _constructor(parameters: IExtensionContextParameters);_

**Returns**: 



#### Parameters
None


## Properties

| Property	   | Access Modifier | Type	| Description|
|:-------------|:----|:-------|:-----------|
|`graphHttpClient`     | `public` | [`GraphHttpClient`](../../sp-http.api/class/graphhttpclient.md) | _Read-only._ The instance of GraphHttpClient created for this instance of extension |
|`httpClient`     | `public` | [`HttpClient`](../../sp-http.api/class/httpclient.md) | _Read-only._ The instance of HttpClient created for this instance of extension |
|`spHttpClient`     | `public` | [`SPHttpClient`](../../sp-http.api/class/sphttpclient.md) | _Read-only._ The instance of SpHttpClient created for this instance of extension |







