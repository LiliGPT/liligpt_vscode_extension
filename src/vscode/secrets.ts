import { ExtensionContext } from 'vscode';

/**
 * Set a secret in the extension's secret storage.
 */
export async function setSecret(
  context: ExtensionContext,
  key: string,
  value: string,
): Promise<void> {
  await context.secrets.store(key, value);
}

/**
 * Get a secret from the extension's secret storage.
 * Returns undefined if the secret does not exist.
 */
export async function getSecret(
  context: ExtensionContext,
  key: string,
): Promise<string | undefined> {
  return await context.secrets.get(key);
}
