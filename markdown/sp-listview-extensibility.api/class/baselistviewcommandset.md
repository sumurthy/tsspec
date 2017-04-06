# BaseListViewCommandSet class







This is the base class that third parties should extend when implementing a client-side extension that provides a CommandSet for a SharePoint ListView. In the component manifest, the "extensionType" should be set to "CommandSet".



## Properties

| Property	   | Access Modifier | Type	| Description|
|:-------------|:----|:-------|:-----------|
|`context`     | `public` | [`ListViewCommandSetContext`](../../sp-listview-extensibility.api/class/listviewcommandsetcontext.md) | _Read-only._  |
|`properties`     | `public` | [`IBaseListViewCommandSetProperties `](../../sp-listview-extensibility.api/interface/ibaselistviewcommandsetproperties.md),` undefined` | _Read-only._  |




## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`onExecute()`](onexecute-baselistviewcommandset.md)     | `public` | `void` | This event occurs when the command is invoked, e.g. because the user clicked on the toolbar button or menu item. |
|[`onRender()`](onrender-baselistviewcommandset.md)     | `public` | `void` | This event occurs whenever the ListView state changes. It allows the implementor to tailor the appearance of the command. For example, to hide the command, assign event.visible = false. To customize the title, assign event.tile. |





