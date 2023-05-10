/**
 * frontendClient.ts
 * 
 * This file takes care of the communication between the extension and the frontend.
 * It uses the vscode API to send messages to the frontend.
 */

import { getWebview } from "./context";

export interface FrontendMessage<T> {
  type: string;
  payload: T;
}

export enum FrontendMessageType {
  sendAuthenticationData = 'vscode-webview:auth',
}

export function frontendSendMessage<T>(type: FrontendMessageType, payload: T) {
  const webview = getWebview();
  webview.postMessage({
    type,
    payload,
  });
}
