import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import esLang from './entries/es-ES';

const AppLocale = {
    en: enLang,
    es: esLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.es.data);

export default AppLocale;
