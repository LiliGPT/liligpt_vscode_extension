/**
 * webview.ts
 * 
 * This file takes care of the communication between the extension and the webview.
 * It uses the vscode API to send messages to the webview.
 */

import { AuthenticationData } from "../authenticator/authenticatorTypes";
import { getWebview } from "../vscode/context";
import { WebviewMessageType } from "./webviewTypes";

/**
 * This function sends the authentication data to the webview.
 * 
 * @param payload payload to send to the webview
 * @see AuthenticationData
 * @see WebviewMessageType.sendAuthenticationData
 */
export function webviewSendAuthenticationData(payload: AuthenticationData) {
  webviewSendMessage<AuthenticationData>(
    WebviewMessageType.sendAuthenticationData,
    payload,
  );
}

/**
 * This function sends any message to the webview.
 * 
 * @param {WebviewMessageType} type type of webview
 * @param payload payload to send to the webview
 */
export function webviewSendMessage<T>(type: WebviewMessageType, payload: T) {
  const webview = getWebview();
  webview.postMessage({
    type,
    payload,
  });
}
