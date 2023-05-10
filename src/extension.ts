import * as path from 'path';
import * as vscode from 'vscode';
import { initI18Next } from './i18next';
import { showErrorMessage, showInformationMessage } from './vscode/alerts';
import { authenticate } from './authenticator/authenticate';
import { setVscodeContext } from './vscode/context';

export function activate(context: vscode.ExtensionContext) {
  setVscodeContext(context);
  context.subscriptions.push(vscode.commands.registerCommand('nestgpt.open', () => {
    ReactPanel.createOrShow(context.extensionPath);
  }));
}

/**
 * Manages react webview panels
 */
class ReactPanel {
  /**
   * Track the currently panel. Only allow a single panel to exist at a time.
   */
  public static currentPanel: ReactPanel | undefined;

  private static readonly viewType = 'nestgpt';

  private readonly _panel: vscode.WebviewPanel;
  private readonly _extensionPath: string;
  private _disposables: vscode.Disposable[] = [];

  public static createOrShow(extensionPath: string) {
    // const column = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;
    const column = vscode.ViewColumn.Beside;

    // If we already have a panel, show it.
    // Otherwise, create a new panel.
    if (ReactPanel.currentPanel) {
      ReactPanel.currentPanel._panel.reveal(column);
    } else {
      ReactPanel.currentPanel = new ReactPanel(extensionPath, column || vscode.ViewColumn.Beside);
    }

    initI18Next().then(async (t) => {
      console.log('i18next initialized');
      vscode.window.showInformationMessage(t('extension.activated'));
    });
  }

  private constructor(extensionPath: string, column: vscode.ViewColumn) {
    this._extensionPath = extensionPath;

    console.log(vscode.Uri.file(path.join(this._extensionPath, 'out/frontend/dist')));

    // Create and show a new webview panel
    this._panel = vscode.window.createWebviewPanel(ReactPanel.viewType, "NestGPT", column, {
      // Enable javascript in the webview
      enableScripts: true,

      // And restric the webview to only loading content from our extension's `media` directory.
      // localResourceRoots: [
      //   vscode.Uri.file(path.join(this._extensionPath, 'out/frontend/dist')),
      // ]
    });

    // Set the webview's initial html content 
    this._panel.webview.html = this._getHtmlForWebview();

    // Listen for when the panel is disposed
    // This happens when the user closes the panel or when the panel is closed programatically
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Handle messages from the webview
    this._panel.webview.onDidReceiveMessage(message => {
      switch (message.command) {
        case 'alert':
          vscode.window.showErrorMessage(message.text);
          this._panel.webview.postMessage({ command: 'refactor', from: 'server' });
          return;
        case 'login':
          showInformationMessage('Fazendo login...');
          authenticate();
          // console.log('[vscode extension.ts] login');
          // const prom = vscode.env.openExternal(vscode.Uri.parse('https://liligpt-frontend.giovannefeitosa.com/'));
          // try {
          //   prom.then(() => {
          //     showInformationMessage('Login realizado com sucesso!');
          //   });
          // } catch (error) {
          //   showErrorMessage('Não foi possível realizar o login!');
          // }
          return;
      }
    }, null, this._disposables);
  }

  public doRefactor() {
    // Send a message to the webview webview.
    // You can send any JSON serializable data.
    this._panel.webview.postMessage({ command: 'refactor' });
  }

  public dispose() {
    ReactPanel.currentPanel = undefined;

    // Clean up our resources
    this._panel.dispose();

    while (this._disposables.length) {
      const x = this._disposables.pop();
      if (x) {
        x.dispose();
      }
    }
  }

  private _getHtmlForWebview() {
    // const manifest = require(path.join(this._extensionPath, 'out/frontend/dist', 'asset-manifest.json'));
    // const mainScript = manifest['files']['main.js'];
    // const mainStyle = manifest['files']['main.css'];
    const mainScript = 'mf1.js';
    // const mainStyle = 'main.css';

    const scriptPathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'out/frontend/dist', mainScript));
    // const scriptUri = scriptPathOnDisk.with({ scheme: 'vscode-webview' });
    const scriptUri = this._panel.webview.asWebviewUri(scriptPathOnDisk);
    // const stylePathOnDisk = vscode.Uri.file(path.join(this._extensionPath, 'out/frontend/dist', mainStyle));
    // const styleUri = stylePathOnDisk.with({ scheme: 'vscode-resource' });

    const baseHref = vscode.Uri.file(path.join(this._extensionPath, 'out/frontend/dist')).with({ scheme: 'vscode-resource' });
    const baseUri = this._panel.webview.asWebviewUri(baseHref);

    // Use a nonce to whitelist which scripts can be run
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no">
				<meta name="theme-color" content="#000000">
				<title>React App</title>
				<base href="${baseHref}/">
			</head>
			<body>
				<noscript>You need to enable JavaScript to run this app.</noscript>
				<div id="root-frontend"></div>
				
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
}

function getNonce() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 32; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
