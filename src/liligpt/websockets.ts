import { ExtensionContext } from 'vscode';
import { Socket, io } from "socket.io-client";
import { WS_URL } from '../constants';
import { showErrorMessage } from '../vscode/alerts';
import { t } from 'i18next';

export async function websocketsConnect(
  context: ExtensionContext,
): Promise<Socket> {
  const socket = io(WS_URL, {
    transports: ['websocket'],
    timeout: 5000,
  });

  // wait for connection
  return new Promise((resolve, reject) => {
    socket.on('connect', () => {
      resolve(socket);
    });

    socket.on('connect_error', (err: any) => {
      showErrorMessage(t('websockets.connectError', { error: err.message }));
      reject(err);
    });
  });
}
