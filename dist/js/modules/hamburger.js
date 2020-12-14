function hamburger(){
    const hamburger = document.querySelector('.header__hamburger'),
    menuOverlay = document.querySelector('.promo__overlay'),
    menu = document.querySelector('.promo__menu'),
    menuLinks = document.querySelectorAll('.promo__link'),
    menuClose = document.querySelector('.promo__close'),
    menuSocialLinks = document.querySelectorAll('.promo__icon-block a');

    function closeMenu(){
        menu.classList.remove('promo__menu_active');
        menuOverlay.classList.remove('promo__overlay_active');
    }

    hamburger.addEventListener('click',() => {
        menu.classList.add('promo__menu_active');
        menuOverlay.classList.add('promo__overlay_active');
    });

    menuClose.addEventListener('click',() =>{
        closeMenu();
    });

    menuLinks.forEach(item => {
       item.addEventListener('click',(event) => {
            event.preventDefault();
            const blockID = item.getAttribute('href');
            document.querySelector(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            closeMenu();
       });
    });
    
    menuSocialLinks.forEach(item => {
        item.addEventListener('click',() => {
            closeMenu();
        });
    });
}

export default hamburger;