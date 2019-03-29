import {
    CHANGE_LOCALE
} from 'Constants/actionTypes';


export const changeLocale = (locale) => {
    localStorage.setItem('currentLanguage', locale);
    return (
        {
            type: CHANGE_LOCALE,
            payload: locale
        }
    )
}

