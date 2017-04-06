# BaseComponentContext class







The base class for context objects for client-side components.


## Constructor


**Signature:** _constructor(parameters: IComponentContextParameters);_

**Returns**: 



#### Parameters
None


## Properties

| Property	   | Access Modifier | Type	| Description|
|:-------------|:----|:-------|:-----------|
|`manifest`     | `public` | `IClientSideComponentManifest` | _Read-only._ Manifest for the client side component. |
|`serviceScope`     | `public` | [`ServiceScope`](../../sp-core-library.api/class/servicescope.md) | _Read-only._ Service scope instance that is scoped to this particular web part. |




## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`getBaseManifest()`](getbasemanifest-basecomponentcontext.md)     | `protected` | `IClientSideComponentManifest` | The child class's overridden "manifest" property should call this method. |





### Remarks

A "context" object is a collection of well-known services and other objects that are likely to be needed by any business logic working with the associated component. Each component type has its own specialized subclass ofClientSideComponentContext, e.g. WebPartContext for web parts, ExtensionContext for client-side extensions, etc.

