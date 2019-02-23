export const subHiddenBreakpoint=1440;
export const menuHiddenBreakpoint = 768;
export const defaultMenuType = 'menu-sub-hidden'; //'menu-sub-hidden', 'menu-hidden', 'menu-default'
export const defaultStartPath = '/app/departments/'; 

export const defaultLocale='en';
export const localeOptions=[
    {id:'en',name:'English'},
    {id:'es',name:'Español'},
];

export const firebaseConfig = {
    apiKey: "AIzaSyBBksq-Asxq2M4Ot-75X19IyrEYJqNBPcg",
    authDomain: "gogo-react-login.firebaseapp.com",
    databaseURL: "https://gogo-react-login.firebaseio.com",
    projectId: "gogo-react-login",
    storageBucket: "gogo-react-login.appspot.com",
    messagingSenderId: "216495999563"
};

export const apiUrl = process.env.API_URL
export const searchPath = "/app/departments/"