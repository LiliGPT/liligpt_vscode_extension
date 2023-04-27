import { window } from 'vscode';

export function showInformationMessage(message: string) {
  window.showInformationMessage(message);
}

export function showErrorMessage(message: string) {
  window.showErrorMessage(message);
}

export function showWarningMessage(message: string) {
  window.showWarningMessage(message);
}
