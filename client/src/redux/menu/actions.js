import {
    MENU_SET_CLASSNAMES,
    MENU_CONTAINER_ADD_CLASSNAME,
    MENU_CLICK_MOBILE_MENU,
    MENU_CHANGE_DEFAULT_CLASSES
} from 'Constants/actionTypes';

export const changeDefaultClassnames = (strCurrentClasses) => {
    return (
        {
            type: MENU_CHANGE_DEFAULT_CLASSES,
            payload: strCurrentClasses
        }
    )
}

export const addContainerClassname = (classname, strCurrentClasses) => {
    const newClasses = !strCurrentClasses.indexOf(classname) > -1 ? strCurrentClasses + ' ' + classname : strCurrentClasses;
    return (
        {
            type: MENU_CONTAINER_ADD_CLASSNAME,
            payload: newClasses
        }
    )
}

export const clickOnMobileMenu = (strCurrentClasses) => {
    const currentClasses = strCurrentClasses ? strCurrentClasses.split(' ').filter(x => x != '' && x != 'sub-show-temporary') : '';
    let nextClasses = '';
    if (currentClasses.includes('main-show-temporary')) {
        nextClasses = (currentClasses.filter(x => x != 'main-show-temporary')).join(' ');
    } else {
        nextClasses = currentClasses.join(' ') + ' main-show-temporary';
    }
    return (
        {
            type: MENU_CLICK_MOBILE_MENU,
            payload: { containerClassnames: nextClasses, menuClickCount: 0 }
        }
    )
}

export const setContainerClassnames = (clickIndex, strCurrentClasses) => {
    const currentClasses = strCurrentClasses ? strCurrentClasses.split(' ').filter(x => x != '') : '';
    let nextClasses = '';
    if (clickIndex % 4 == 0) {
        if (currentClasses.includes('menu-default') && currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-default menu-sub-hidden';
        } else if (currentClasses.includes('menu-default')) {
            nextClasses = 'menu-default';
        } else if (currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-sub-hidden';
        } else if (currentClasses.includes('menu-hidden')) {
            nextClasses = 'menu-hidden';
        }
        clickIndex = 0;
    } else if (clickIndex % 4 == 1) {
        if (currentClasses.includes('menu-default') && currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-default menu-sub-hidden main-hidden sub-hidden';
        } else if (currentClasses.includes('menu-default')) {
            nextClasses = 'menu-default sub-hidden';
        } else if (currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-sub-hidden main-hidden sub-hidden';
        } else if (currentClasses.includes('menu-hidden')) {
            nextClasses = 'menu-hidden main-show-temporary';
        }
    } else if (clickIndex % 4 == 2) {
        if (currentClasses.includes('menu-default') && currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-default menu-sub-hidden sub-hidden';
        } else if (currentClasses.includes('menu-default')) {
            nextClasses = 'menu-default main-hidden sub-hidden';
        } else if (currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-sub-hidden sub-hidden';
        } else if (currentClasses.includes('menu-hidden')) {
            nextClasses = 'menu-hidden main-show-temporary sub-show-temporary';
        }
    } else if (clickIndex % 4 == 3) {
        if (currentClasses.includes('menu-default') && currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-default menu-sub-hidden sub-show-temporary';
        } else if (currentClasses.includes('menu-default')) {
            nextClasses = 'menu-default sub-hidden';
        } else if (currentClasses.includes('menu-sub-hidden')) {
            nextClasses = 'menu-sub-hidden sub-show-temporary';
        } else if (currentClasses.includes('menu-hidden')) {
            nextClasses = 'menu-hidden main-show-temporary';
        }
    }
    if (currentClasses.includes('menu-mobile')) {
        nextClasses += ' menu-mobile';
    }
    return (
        {
            type: MENU_SET_CLASSNAMES,
            payload: { containerClassnames: nextClasses, menuClickCount: clickIndex }
        }
    )
}