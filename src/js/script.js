require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';
import calc from './modules/calc';
import dragSlider from './modules/dragSlider';
import forms from './modules/forms';
import hamburger from './modules/hamburger';
import map from './modules/map';
import modal from './modules/modal';
import phoneMask from './modules/phoneMask';
import scroll from './modules/scroll';
import tabs from './modules/tabs';
import upBtn from './modules/upBtn';

document.addEventListener('DOMContentLoaded', () => {
    dragSlider('.companies__slider', '.companies__inner',
               '.companies__wrapper', '.companies__thumb');
    calc();
    map('.map','https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ad3ce773167875b0595ba1178bd4ed2c88ac2cee29d8e7260365029a0fbfd6d02&amp;width=100%25&amp;height=600&amp;lang=ru_RU&amp;scroll=false');
    scroll('.promo', '.promo-mouse');
    tabs('.portfolio__tabs', '.portfolio__link', '.portfolio-block',
        'portfolio__link_active', 'portfolio-block_active', 'fade');
    upBtn('.up-btn', 'up-btn_active');
    phoneMask('[data-phone]');
    modal('.overlay', 'overlay_active', '[data-call]', 'overlay__close');
    forms('form');
    hamburger();
});
