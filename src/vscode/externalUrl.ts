import { Uri, env } from 'vscode';

export function openExternalUrl(url: string) {
  return new Promise((resolve, reject) => {
    const prom = env.openExternal(Uri.parse(url));
    try {
      prom.then(() => {
        // finished opening the url
        // note: this does not mean that the user has logged in
        resolve(undefined);
      }, (reason: any) => {
        // opening the url failed
        reject(reason);
      });
    } catch (err) {
      // opening the url failed / 2
      reject(err);
    }
  });
}
