import { ExtensionContext } from 'vscode';

let contextInstance: ExtensionContext;

// set context function
export function setVscodeContext(context: ExtensionContext) {
  contextInstance = context;
}

// get context function
export function getVscodeContext(): ExtensionContext {
  if (!contextInstance) {
    throw new Error('VSCode context not set');
  }
  return contextInstance;
}
