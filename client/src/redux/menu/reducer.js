import {

	MENU_SET_CLASSNAMES,
	MENU_CONTAINER_ADD_CLASSNAME,
	MENU_CLICK_MOBILE_MENU,
	MENU_CHANGE_DEFAULT_CLASSES
} from 'Constants/actionTypes';

import {defaultMenuType, subHiddenBreakpoint, menuHiddenBreakpoint } from 'Constants/defaultValues'


const INIT_STATE = {
	containerClassnames: defaultMenuType,
	subHiddenBreakpoint,
	menuHiddenBreakpoint,
	menuClickCount: 0
};

export default (state = INIT_STATE, action) => {
	switch (action.type) {

		case MENU_SET_CLASSNAMES:
		return Object.assign({}, state, {
			containerClassnames: action.payload.containerClassnames,
			menuClickCount:action.payload.menuClickCount
		})

		case MENU_CLICK_MOBILE_MENU:
		return Object.assign({}, state, {
			containerClassnames: action.payload.containerClassnames,
			menuClickCount:action.payload.menuClickCount
		})

		case MENU_CONTAINER_ADD_CLASSNAME:
		return Object.assign({}, state, {
			containerClassnames: action.payload
		})

		case MENU_CHANGE_DEFAULT_CLASSES:
			return Object.assign({}, state, {
				containerClassnames: action.payload
			})
			
		default: return { ...state };
	}
}
