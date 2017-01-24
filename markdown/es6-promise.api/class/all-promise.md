# all()
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



Make a promise that fulfills when every item in the array fulfills, and rejects if (and when) any item rejects. the array passed to all can be a mixture of promise-like objects and other objects. The fulfillment value is an array (in order) of fulfillment values. The rejection value is the first rejection value.

**Signature:** _public static all < T1, T2, T3, T4, T5, T6, T7, T8, T9, T10 >(values: [T1 | [Thenable](../../es6-promise.api/interface/thenable.md)<T1>, T2 | Thenable<T2>, T3 | Thenable<T3>, T4 | Thenable <T4>, T5 | Thenable<T5>, T6 | Thenable<T6>, T7 | Thenable<T7>, T8 | Thenable<T8>, T9 | Thenable<T9>, T10 | Thenable<T10>]): [Promise](../../es6-promise.api/class/promise.md)<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>;_

**Returns**: [`Promise`](../../es6-promise.api/class/promise.md)<[T1, T2, T3, T4, T5, T6, T7, T8, T9, T10]>





#### Parameters
None


