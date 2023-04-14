import * as vscode from 'vscode';
import * as fs from 'fs';
import * as nunjucks from 'nunjucks';
import * as path from 'path';
import { FileUtils } from './utils/FileUtils';

const messagesTxtFile = FileUtils.abspath('data/messages.txt', "data/messages.txt was not found!");
const viewsDir = FileUtils.abspath('src/views', "src/views directory was not found!");
const messagesTxt = FileUtils.readAsString('data/messages.txt');
const indexJs = FileUtils.readAsString('src/views/index/index.js', "src/views/index.js was not found!");
const indexCss = FileUtils.readAsString('src/views/index/index.css', "src/views/index.css was not found!");

function getWebviewContent() {
  return nunjucks.render('index/index.jinja2', {
    messagesList: messagesTxt.split("\n").filter(m => !!m),
    js: [indexJs],
    css: [indexCss],
  });
}

export function activate(context: vscode.ExtensionContext) {

  nunjucks.configure(viewsDir);

  let disposable = vscode.commands.registerCommand('nestgpt.open', () => {
    // vscode.window.showInformationMessage('Hello World from nestgpt!');

    const panel = vscode.window.createWebviewPanel(
      'nestgpt',
      'NestGPT',
      vscode.ViewColumn.Beside,
      // vscode.ViewColumn.One,
      {
        enableScripts: true,
        retainContextWhenHidden: true,
      }
    );

    const content = getWebviewContent();
    panel.webview.html = content;

    panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case 'message':
            // vscode.window.showErrorMessage(message.text);
            // vscode.window.showInformationMessage(message.text);
            // append message to file
            // fs.appendFileSync(messagesTxtFile, message.text + "\n", { encoding: 'utf8' });
            vscode.window.showInformationMessage('Message sent!');
            // send message to webview
            panel.webview.postMessage({ text: message.text });
            return;
        }
      }
    );
  });

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
