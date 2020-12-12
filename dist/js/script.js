document.addEventListener('DOMContentLoaded',() => {
    //hamburger
    const hamburger = document.querySelector('.header__hamburger'),
          menuOverlay = document.querySelector('.promo__overlay'),
          menu = document.querySelector('.promo__menu'),
          menuLinks = document.querySelectorAll('.promo__link'),
          menuClose = document.querySelector('.promo__close');
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
        item.addEventListener('click',() => {
            closeMenu();
        });
    });

    menuSocialLinks.forEach(item => {
        item.addEventListener('click',() => {
            closeMenu();
        });
    });

    //tabs

    const tabsHeader = document.querySelector('.portfolio__tabs'),
          tabsLinks = document.querySelectorAll('.portfolio__link'),
          tabsContent = document.querySelectorAll('.portfolio-block');

    function hideAll() {
        tabsLinks.forEach(item => {
            item.classList.remove('portfolio__link_active');
        });
        tabsContent.forEach(item => {
            item.classList.remove('portfolio-block_active','fade');
        });
    }
    function showActiveTab(i=0){
        tabsLinks[i].classList.add('portfolio__link_active');
        tabsContent[i].classList.add('portfolio-block_active','fade');
    }
    hideAll();
    showActiveTab();

    tabsHeader.addEventListener('click',(event) => {
        event.preventDefault();
        let target = event.target;
        if (target == target && target.classList.contains('portfolio__link')){
            tabsLinks.forEach((item,i) => {
                  if (target == item){
                        hideAll();
                        showActiveTab(i);
                  }
                });
        }
    });

    //calc

    const priceResult = document.querySelector('.priceResult span'),
          avgSquareMeter = document.querySelector('.avgSquareMeter span'),
          square = document.querySelector('.squareMeter span'),
          areaThumb = document.querySelector('.calculate__scale-round'),
          areaScale = document.querySelector('.calculate__scale'),
          packages = document.querySelectorAll('.calculate__rate');
    let areaSquare = 100,
        package = 4850;
        areaScaleWidth = window.getComputedStyle(areaScale).width;
        areaScaleWidth = +areaScaleWidth.slice(0, areaScaleWidth.length-2) - areaThumb.offsetWidth;

    function choosePackage(){
        packages.forEach(item => {
            item.addEventListener('click',(event) => {
                event.preventDefault();
                packages.forEach(item => {
                    item.classList.remove('calculate__rate_active');
                });
                    item.classList.add('calculate__rate_active');
                    package = +item.getAttribute('data-price');
                    initCalculator();
            });
        });
    }
    function findSquareMeters(coords){
        let percent = areaScaleWidth / 100;
        areaSquare = Math.round(+areaThumb.getAttribute('data-area')*coords / percent);
        if (areaSquare <= 100){
            areaSquare = 100;
        }
        areaThumb.style.left = `${coords}px`;
        initCalculator();
    }
    function chooseArea(){
        areaScale.addEventListener('click',(event) => {
            let coordsClick = event.clientX-areaScale.getBoundingClientRect().left;
            if (coordsClick >= areaScaleWidth ){
                coordsClick = areaScaleWidth;
            }
            findSquareMeters(coordsClick);
        });
        areaThumb.addEventListener('mousedown',(event) => {
            event.preventDefault();
            let shiftX = event.clientX - areaThumb.getBoundingClientRect().left;
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            
    
            function onMouseMove(event) {
                let newLeft = event.clientX - shiftX - areaScale.getBoundingClientRect().left,
                    rightEdge = areaScale.offsetWidth - areaThumb.offsetWidth;
                    
                if (newLeft <= 0) {
                    newLeft = 0;
                }
                if (newLeft > rightEdge) {
                newLeft = rightEdge;
                }
                findSquareMeters(newLeft);
            }
            function onMouseUp() {
                document.removeEventListener('mouseup', onMouseUp);
                document.removeEventListener('mousemove', onMouseMove);
            }
        });
        areaThumb.addEventListener('dragstart',() => {
            return false;
        });

    }
    function initCalculator(){
        square.textContent = formatNumber(areaSquare);
        avgSquareMeter.textContent = formatNumber(package);
        priceResult.textContent = formatNumber(areaSquare*package);
    }
    function formatNumber(num){
        const separator = ' ';
        let strNum = num.toString(),
            strNew = strNum.substring(strNum.length),
            countNum = 0;
        for (let i = strNum.length; i > 0; i--) {
            if ((countNum%3 == 0) && (i != strNum.length)) {
                    strNew = separator + strNew;
            }
            strNew = strNum.charAt(i-1) + strNew;
            countNum ++;
        }
        return strNew;
    }
    choosePackage();
    chooseArea();
    initCalculator();

    //drag
    const dragSlider = document.querySelector('.companies__slider'),
          field = document.querySelector('.companies__inner'), 
          wrapper = document.querySelector('.companies__wrapper');
          thumb = dragSlider.querySelector('.companies__thumb');
          
    let wrapperWidth = window.getComputedStyle(wrapper).width,
        fieldWidth = window.getComputedStyle(field).width;
        wrapperWidth = +wrapperWidth.slice(0,wrapperWidth.length-2);
        fieldWidth = +fieldWidth.slice(0,fieldWidth.length-2);
    
    let  moveIndex = (fieldWidth-wrapperWidth) / wrapperWidth,
         rightEdge = dragSlider.offsetWidth - thumb.offsetWidth;

    function setCoords(coords){
        if (coords >= wrapperWidth){
            coords = wrapperWidth;
        } else if ( coords <= 0) {
            coords = 0;
        }
        field.style.transform = 'translateX(-'+(coords * moveIndex)+'px)';
        
        if (coords > rightEdge) {
            coords = rightEdge;
        }
        thumb.style.left = `${coords}px`;
    }

    dragSlider.addEventListener('click',(event) => {
        let coordsClick = event.clientX-areaScale.getBoundingClientRect().left;
        setCoords(coordsClick);
    });    
     
    thumb.addEventListener('mousedown',(event) => {
        event.preventDefault();
        let shiftX = event.clientX - thumb.getBoundingClientRect().left;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

        function onMouseMove(event) {
            let newLeft = event.clientX - shiftX - dragSlider.getBoundingClientRect().left;
            setCoords(newLeft);
        }
        function onMouseUp() {
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
        }
    });
    thumb.addEventListener('dragstart',() => {
        return false;
    });
});
