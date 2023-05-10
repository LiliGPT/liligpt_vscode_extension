import i18next, { TFunction } from 'i18next';
import path from 'path';
import enJson from './en.json';

let _initialized: boolean = false;

export function initI18Next() {
  return new Promise<TFunction>((resolve, reject) => {
    if (_initialized) {
      resolve(i18next.t);
      return;
    }
    i18next.init({
      debug: true,
      lng: 'en',
      fallbackLng: 'en',
      ns: ['translation'],
      defaultNS: 'translation',
      resources: {
        en: {
          translation: enJson,
        },
      },
      interpolation: {
        escapeValue: false,
      },
    }, (err, t) => {
      if (err) {
        reject(err);
      } else {
        _initialized = true;
        resolve(t);
      }
    }
    );
  });
}
