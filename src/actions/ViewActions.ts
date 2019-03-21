import { setLanguage } from 'localization/utils';
import { Languages } from 'common/types';

export type ViewAction = ToggleSideBar | UpdateLanguage | UpdateValue;

interface ToggleSideBar {
    type: 'TOGGLE_SIDE_BAR'
}

export const toggleSideBar = ():  ToggleSideBar => {
    return {
        type: 'TOGGLE_SIDE_BAR'
    };
};

interface UpdateLanguage {
    type: 'UPDATE_LANGUAGE',
    lang: Languages
}

export const updateLanguage = (lang: Languages): UpdateLanguage => {
    setLanguage(lang);
    return {
        type: 'UPDATE_LANGUAGE',
        lang
    };
};

interface UpdateValue {
    type: 'UPDATE_RANGE',
    value: any
}

export const updateValue = (value: any): UpdateValue => {
    console.log(value);
    return {
        type: 'UPDATE_RANGE',
        value
    };
};