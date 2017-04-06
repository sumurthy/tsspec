# parse(versionString)
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



Constructs a new Version instance using the version string. tryParse validates the input version string and throws error if it is invalid

**Signature:** _public static parse(versionString: string | undefined | null): [Version](../../sp-core-library.api/class/version.md);_

**Returns**: [`Version`](../../sp-core-library.api/class/version.md)



If valid, a new Version instace

#### Parameters


| Parameter	   | Type    | Description |
|:-------------|:---------------|:------------|
| `versionString`    | `string `,` undefined `,` null` | A version string |


