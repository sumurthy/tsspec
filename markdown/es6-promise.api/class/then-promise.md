# then(onFulfilled,onRejected)
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects. Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called. Both callbacks have a single parameter , the fulfillment value or rejection reason. "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve. If an error is thrown in the callback, the returned promise rejects with that error.

**Signature:** _then < U >(onFulfilled?: (value: T) => U | [Thenable](../../es6-promise.api/interface/thenable.md)<U>, onRejected?: (error: any) => U | Thenable<U>): [Promise](../../es6-promise.api/class/promise.md)<U>;_

**Returns**: [`Promise`](../../es6-promise.api/class/promise.md)<U>





#### Parameters


| Parameter	   | Type    | Description |
|:-------------|:---------------|:------------|
| `onFulfilled`    | `(value: T) => U `, [`Thenable`](../../es6-promise.api/interface/thenable.md)<U> | _Optional._ called when/if "promise" resolves |
| `onRejected`    | `(error: any) => U `, [`Thenable`](../../es6-promise.api/interface/thenable.md)<U> | _Optional._ called when/if "promise" rejects |


