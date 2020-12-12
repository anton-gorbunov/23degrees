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
            console.log(target);
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
          areaVariants = document.querySelectorAll('.calculate__scale-round'),
          packages = document.querySelectorAll('.calculate__rate'),
          packagesParent = document.querySelector('.calculate__btns');
    let areaSquare = 10000,
        package = 4850;

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
    function chooseArea(){
        areaVariants.forEach((item,i) => {
            item.addEventListener('click',() => {
                areaVariants.forEach(item => {
                    item.classList.remove('calculate__scale-round_active');
                });
                item.classList.add('calculate__scale-round_active');
                areaSquare = +item.getAttribute('data-area');
                initCalculator();
            });
        });
    }
    function initCalculator(){
        square.textContent = formatNumber(areaSquare);
        avgSquareMeter.textContent = formatNumber(package);
        priceResult.textContent = formatNumber(areaSquare*package);
    }
    function formatNumber(num){
        const separator = ' '; // разделитель
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
       
    thumb.addEventListener('mousedown',(event) => {
        event.preventDefault();
        let shiftX = event.clientX - thumb.getBoundingClientRect().left;
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);

      function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - dragSlider.getBoundingClientRect().left,
            moveIndex = (fieldWidth-wrapperWidth) / wrapperWidth,
            rightEdge = dragSlider.offsetWidth - thumb.offsetWidth;
            
        if (newLeft >= wrapperWidth){
            newLeft = wrapperWidth;
        } else if ( newLeft <= 0) {
            newLeft = 0;
        }
        field.style.transform = 'translateX(-'+(newLeft * moveIndex)+'px)';
      
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
        }
        thumb.style.left = `${newLeft}px`;
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
