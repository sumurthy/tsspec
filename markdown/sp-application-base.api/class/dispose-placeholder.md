# dispose()
**Note:** The SharePoint Framework is currently in preview and is subject to change. SharePoint Framework client-side web parts are not currently supported for use in production environments.



Diposes the attachedDiv.

**Signature:** _public dispose(): void;_

**Returns**: `void`





#### Parameters
None


### Remarks

This method can be called to immediately dispose the attachedDiv; otherwise, it will be disposed by the application when the placeholder is disposed. Calling dispose() invokes the IPlaceholderAttachOptions.onDispose() callback, removes the attachedDiv from the DOM, and assigns attachedDiv to undefined.

