import i18next, { TFunction } from 'i18next';
import I18NextFsBackend from 'i18next-fs-backend';
import path from 'path';

const _instance: {
  t: TFunction | null;
} = {
  t: null,
};

export function initI18Next() {
  return new Promise<TFunction>((resolve, reject) => {
    i18next.use(I18NextFsBackend).init({
      debug: true,
      lng: 'en',
      fallbackLng: 'en',
      ns: ['translation'],
      defaultNS: 'translation',
      backend: {
        // for all available options read the backend's repository readme file
        // loadPath: __dirname + '/{{lng}}.json'
        loadPath: path.join(__dirname, '/en.json'),
      },
    }, (err, t) => {
      if (err) {
        reject(err);
      }
      _instance.t = i18next.getFixedT('en');
      resolve(t);
    });
  });
}

export const tr = (...args): string => {
  if (!_instance.t) {
    console.log('i18next is not initialized');
    throw new Error('i18next is not initialized');
  }
  return _instance.t(args[0], args[1]).toString();
};
