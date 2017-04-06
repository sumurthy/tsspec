# BaseApplicationCustomizer class







This is the base class that third parties should extend when implementing a client-side extension that runs when an application is first starting. In the component manifest, the "extensionType" should be set to "ApplicationCustomizer".



## Properties

| Property	   | Access Modifier | Type	| Description|
|:-------------|:----|:-------|:-----------|
|`context`     | `public` | [`ApplicationCustomizerContext`](../../sp-application-base.api/class/applicationcustomizercontext.md) | _Read-only._  |
|`properties`     | `public` | [`IBaseApplicationCustomizerProperties `](../../sp-application-base.api/interface/ibaseapplicationcustomizerproperties.md),` undefined` | _Read-only._  |




## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`onRender()`](onrender-baseapplicationcustomizer.md)     | `public` | `void` | This lifecycle event occurs after the shell has constructed the initial page DOM, after the application's onRender() event has occurred. |





