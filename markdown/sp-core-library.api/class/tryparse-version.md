# tryParse(versionString)
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



Tries to construct a new Version instance using the version string. Returns undefined if not successful.

**Signature:** _public static tryParse(versionString: string | undefined | null): [Version](../../sp-core-library.api/class/version.md) | undefined;_

**Returns**: [`Version `](../../sp-core-library.api/class/version.md),` undefined`



If valid, a new Version instace. Otherwise, undefined.

#### Parameters


| Parameter	   | Type    | Description |
|:-------------|:---------------|:------------|
| `versionString`    | `string `,` undefined `,` null` | A version string |


