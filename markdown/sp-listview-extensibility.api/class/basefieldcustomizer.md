# BaseFieldCustomizer class







This is the base class that third parties should extend when implementing a client-side extension that customizes the appearance of fields in a SharePoint ListView. In the component manifest, the "extensionType" should be set to "FieldCustomizer".



## Properties

| Property	   | Access Modifier | Type	| Description|
|:-------------|:----|:-------|:-----------|
|`context`     | `public` | [`FieldCustomizerContext`](../../sp-listview-extensibility.api/class/fieldcustomizercontext.md) | _Read-only._  |
|`properties`     | `public` | [`IBaseFieldCustomizerProperties `](../../sp-listview-extensibility.api/interface/ibasefieldcustomizerproperties.md),` undefined` | _Read-only._  |




## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`onDisposeCell()`](ondisposecell-basefieldcustomizer.md)     | `public` | `void` |  |
|[`onRenderCell()`](onrendercell-basefieldcustomizer.md)     | `public` | `void` |  |





