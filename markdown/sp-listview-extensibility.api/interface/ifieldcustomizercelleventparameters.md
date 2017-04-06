# IFieldCustomizerCellEventParameters interface







Event parmeters for BaseFieldCustomizer.onRenderCell()




## Properties

| Property	   | Type	| Description|
|:-------------|:-------|:-----------|
|`cellDiv`      | `HTMLDivElement` | The HTML "div" element that the extension will take ownership of. This ownership will end when onDisposeCell() is called. |
|`cellStorage`      | `any` | An implementor-defined storage property. |
|`cellValue`      | `any` | The value of the field being rendered. |
|`row`      | [`RowAccessor`](../../sp-listview-extensibility.api/class/rowaccessor.md) | The row being rendered. |






