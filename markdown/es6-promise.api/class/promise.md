# Promise <T> class

_Implements: [`Thenable`](../../es6-promise.api/interface/thenable.md)_

_Type parameters: `<T>`_






## Constructor
If you call resolve in the body of the callback passed to the constructor, your promise is fulfilled with result object passed to resolve. If you call reject your promise is rejected with the object passed to reject. For consistency and debugging (eg stack traces), obj should be an instanceof Error. Any errors thrown in the constructor callback will be implicitly passed to reject().

**Signature:** _constructor(callback: (resolve: (value?: T | [Thenable](../../es6-promise.api/interface/thenable.md)<T>) => void, reject: (error?: any) => void) => void);_

**Returns**: 



#### Parameters
None





## Methods

| Method	   | Access Modifier | Returns	| Description|
|:-------------|:----|:-------|:-----------|
|[`all()`](all-promise.md)     | `public, static` | [`Promise`](../../es6-promise.api/class/promise.md)<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]> | Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects. the array passed to all can be a mixture of promise-like objects and other objects. The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value. |
|[`catch(onRejected)`](catch-promise.md)     | `` | [`Promise`](../../es6-promise.api/class/promise.md)<U> | Sugar for promise.then(undefined, onRejected) |
|[`race()`](race-promise.md)     | `public, static` | [`Promise`](../../es6-promise.api/class/promise.md)<T> | Make a Promise that fulfills when any item fulfills, and rejects if any item rejects. |
|[`reject()`](reject-promise.md)     | `public, static` | [`Promise`](../../es6-promise.api/class/promise.md)<any> | Make a promise that rejects to obj. For consistency and debugging (eg stack traces), obj should be an instanceof Error |
|[`resolve()`](resolve-promise.md)     | `public, static` | [`Promise`](../../es6-promise.api/class/promise.md)<T> | Make a new promise from the thenable. A thenable is promise-like in as far as it has a "then" method. |
|[`then(onFulfilled,onRejected)`](then-promise.md)     | `` | [`Promise`](../../es6-promise.api/class/promise.md)<U> | onFulfilled is called when/if "promise" resolves. onRejected is called when/if "promise" rejects. Both are optional, if either/both are omitted the next onFulfilled/onRejected in the chain is called. Both callbacks have a single parameter , the fulfillment value or rejection reason. "then" returns a new promise equivalent to the value you return from onFulfilled/onRejected after being passed through Promise.resolve. If an error is thrown in the callback, the returned promise rejects with that error. |





