import { ExtensionContext } from 'vscode';
import { connectToWebsocketsServer } from '../liligpt/websockets';
import { getNonce } from '../utils/nonce';
import { setSecret } from '../vscode/secrets';
import { openExternalUrl } from '../vscode/externalUrl';
import { LOGIN_URL } from '../constants';
import { showInformationMessage } from '../vscode/alerts';
import { t } from 'i18next';

interface AuthenticationData {
  accessToken: string;
  refreshToken: string;
}

export async function authenticate(
  context: ExtensionContext,
) {
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
    await setSecret(context, 'liligpt:accessToken', data.accessToken);
    showInformationMessage(t('auth.success'));
  });

  // open login page
  await openExternalUrl(`${LOGIN_URL}?nonce=${nonce}`);
}
