import { ExtensionContext } from 'vscode';
import { connectToWebsocketsServer } from '../liligpt/websockets';
import { getNonce } from '../utils/nonce';
import { setSecret } from '../vscode/secrets';
import { openExternalUrl } from '../vscode/externalUrl';
import { LOGIN_URL } from '../constants';
import { showInformationMessage } from '../vscode/alerts';
import { t } from 'i18next';
import { getVscodeContext } from '../vscode/context';

interface AuthenticationData {
  accessToken: string;
  refreshToken: string;
}

export async function authenticate() {
  const context: ExtensionContext = getVscodeContext();
  const socket = await connectToWebsocketsServer(context);
  if (!socket) {
    // no need for error handling here
    return;
  }

  // tell websockets server that we want to authenticate
  const nonce = getNonce();
  socket.emit('vscode:register-for-auth', nonce);

  // wait for authentication data
  socket.on('vscode:auth', async (data: AuthenticationData) => {
    showInformationMessage(t('auth.success'));
    await setSecret(context, 'liligpt:accessToken', data.accessToken);
  });

  // open login page
  await openExternalUrl(`${LOGIN_URL}?nonce=${nonce}`);
}
