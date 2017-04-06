# Placeholder class







A content placeholder is a designated region on the page (i.e. empty HTML "div" element) where third party extensions can inject arbitrary HTML content.



## Properties

| Property	   | Access Modifier | Type	| Description|
|:-------------|:----|:-------|:-----------|
|`attachedDiv`     | `public` | `HTMLDivElement`,`undefined` | _Read-only._ The HTML "div" element that was when attach() was called. This property is undefined if attach() was not been called, or if dispose() was called after the last call to attach(). |
|`name`     | `public` | `string` | _Read-only._ A symbolic name used to identify the placeholder. Example: "PageHeader" |




## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`attach()`](attach-placeholder.md)     | `public` | `void` | Creates a new HTML "div" under this placeholder. |
|[`dispose()`](dispose-placeholder.md)     | `public` | `void` | Diposes the attachedDiv. |





