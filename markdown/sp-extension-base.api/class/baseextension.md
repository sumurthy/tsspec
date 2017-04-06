# BaseExtension class







The base class for all client-side extensions.



## Properties

| Property	   | Access Modifier | Type	| Description|
|:-------------|:----|:-------|:-----------|
|`properties`     | `public` | [`IBaseExtensionProperties `](../../sp-extension-base.api/interface/ibaseextensionproperties.md),` undefined` | _Read-only._ Extension properties is a JavaScript object that are passed in by the application that initializes the extension. |




## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`getBaseProperties()`](getbaseproperties-baseextension.md)     | `protected` | [`IBaseExtensionProperties `](../../sp-extension-base.api/interface/ibaseextensionproperties.md),` undefined` | The child class's "properties" property getter should call this method. |
|[`onDispose()`](ondispose-baseextension.md)     | `public` | `void` | This event hook is called immediately before the extension stops being used. It provides an opportunity to release any associated resources, cancel any outstanding requests, etc. |
|[`onInit()`](oninit-baseextension.md)     | `public` | [`Promise`](../../es6-promise.api/class/promise.md)<void> | This event hook is called when the client-side extension is first activated on the page. |





