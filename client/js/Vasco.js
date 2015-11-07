'use strict';

import MainPage from './views/MainPage/MainPage.js';
import TopMenu from './views/TopMenu/TopMenu.js';
import DataProvider from './components/DataProvider.js';

let dataProvider = new DataProvider();
let mainPage = new MainPage({
    dataProvider: dataProvider
});

mainPage.render();
mainPage.showMe();

console.log('TopMenu says:', TopMenu.info);
