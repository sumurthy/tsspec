# catch(onRejected)
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



Sugar for promise.then(undefined, onRejected)

**Signature:** _catch < U >(onRejected?: (error: any) => U | [Thenable](../../es6-promise.api/interface/thenable.md)<U>): [Promise](../../es6-promise.api/class/promise.md)<U>;_

**Returns**: [`Promise`](../../es6-promise.api/class/promise.md)<U>





#### Parameters


| Parameter	   | Type    | Description |
|:-------------|:---------------|:------------|
| `onRejected`    | `(error: any) => U `, [`Thenable`](../../es6-promise.api/interface/thenable.md)<U> | _Optional._ called when/if "promise" rejects |


