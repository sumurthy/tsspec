# sp-listview-extensibility package



## Classes

| Class	   |  Description |
|:-------------|:---------------|
| [`BaseFieldCustomizer`](./sp-listview-extensibility.api/class/basefieldcustomizer.md)     | This is the base class that third parties should extend when implementing a client-side extension that customizes the appearance of fields in a SharePoint ListView. In the component manifest, the "extensionType" should be set to "FieldCustomizer". |
| [`BaseListViewCommandSet`](./sp-listview-extensibility.api/class/baselistviewcommandset.md)     | This is the base class that third parties should extend when implementing a client-side extension that provides a CommandSet for a SharePoint ListView. In the component manifest, the "extensionType" should be set to "CommandSet". |
| [`CellFormatter`](./sp-listview-extensibility.api/class/cellformatter.md)     | This class provides some functions that facilitate formatting cell values. |
| [`ColumnAccessor`](./sp-listview-extensibility.api/class/columnaccessor.md)     | Provides access to a ListView column, which is the visual presentation of a field. |
| [`FieldCustomizerContext`](./sp-listview-extensibility.api/class/fieldcustomizercontext.md)     | This object provides contextual information for BaseFieldCustomizer. |
| [`ListViewAccessor`](./sp-listview-extensibility.api/class/listviewaccessor.md)     | Provides access to a SharePoint ListView control. |
| [`ListViewCommandSetContext`](./sp-listview-extensibility.api/class/listviewcommandsetcontext.md)     | This object provides contextual information for BaseListViewCommandSet. |
| [`RowAccessor`](./sp-listview-extensibility.api/class/rowaccessor.md)     | Provides access to a ListView row, which is the visual presentation of a SharePoint list item. |



## Interfaces

| Interface	   |  Description |
|:-------------|:---------------|
| [`IBaseFieldCustomizerProperties`](./sp-listview-extensibility.api/interface/ibasefieldcustomizerproperties.md)   | Extend this interface if you are overriding BaseExtension.properties.  |
| [`IBaseListViewCommandSetProperties`](./sp-listview-extensibility.api/interface/ibaselistviewcommandsetproperties.md)   | Extend this interface if you are overriding BaseExtension.properties.  |
| [`IFieldCustomizerCellEventParameters`](./sp-listview-extensibility.api/interface/ifieldcustomizercelleventparameters.md)   | Event parmeters for BaseFieldCustomizer.onRenderCell()  |
| [`IListViewCommandSetExecuteEventParameters`](./sp-listview-extensibility.api/interface/ilistviewcommandsetexecuteeventparameters.md)   |   |
| [`IListViewCommandSetRenderEventParameters`](./sp-listview-extensibility.api/interface/ilistviewcommandsetrendereventparameters.md)   |   |






