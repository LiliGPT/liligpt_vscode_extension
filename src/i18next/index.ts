import i18next, { TFunction } from 'i18next';
import path from 'path';
import enJson from './en.json';

const _instance: {
  t: TFunction | null;
} = {
  t: null,
};

export function initI18Next() {
  return new Promise<TFunction>((resolve, reject) => {
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
        _instance.t = t;
        resolve(t);
      }
    }
    );
  });
}
