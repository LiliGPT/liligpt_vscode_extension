import { ExtensionContext, Webview } from 'vscode';

let contextInstance: ExtensionContext;
let contextWebview: Webview;

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

// set webview
export function setWebview(webview: Webview) {
  contextWebview = webview;
}

// get webview
export function getWebview(): Webview {
  if (!contextWebview) {
    throw new Error('Webview not set');
  }
  return contextWebview;
}
