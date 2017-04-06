# PlaceholderCollection class







Exposes a collection of content placeholders for use by third parties.


## Constructor


**Signature:** _constructor(serviceScope: [ServiceScope](../../sp-core-library.api/class/servicescope.md));_

**Returns**: 



#### Parameters
None


## Properties

| Property	   | Access Modifier | Type	| Description|
|:-------------|:----|:-------|:-----------|
|`placeholderNames`     | `public` | `ReadonlyArray<string>` | _Read-only._ Returns the names of the currently available placeholders. |




## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`tryGetByName()`](trygetbyname-placeholdercollection.md)     | `public` | [`Placeholder `](../../sp-application-base.api/class/placeholder.md),` undefined` | Searches for a content placeholder with the specified name; if none is found, then the function returns undefined. |





