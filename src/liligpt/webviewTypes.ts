export enum WebviewMessageType {
  sendAuthenticationData = 'vscode-webview:auth',
}

export interface WebviewMessage<T> {
  type: string;
  payload: T;
}
