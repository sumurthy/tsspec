# RowAccessor class







Provides access to a ListView row, which is the visual presentation of a SharePoint list item.






## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`getValue()`](getvalue-rowaccessor.md)     | `public` | `any` | Retrieves the cell value for the specified column. The value will be a primitive JavaScript object such as a string, number, etc. |
|[`getValueByName()`](getvaluebyname-rowaccessor.md)     | `public` | `any` | Retrieves the cell value for the column/field with the specified internal name. The value will be a primitive JavaScript object such as a string, number, etc. |





### Remarks

A SharePoint "list item" (SPListItem) is a data storage record in the content management system; it stores an array of values for the associated fields. A "row" is the visual presentation of a list item, when displayed by the ListView; it stores an array of cell values for the associated columns.

