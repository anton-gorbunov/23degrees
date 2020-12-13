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

    //scroll

    const   parentElem = document.querySelector('.promo'),
            mouseElem = document.querySelector('.promo-mouse');

    function scrollDown() {
        const windowCoords = parentElem.offsetHeight;
        function scroll() {
          if (window.pageYOffset < windowCoords) {
                window.scrollBy(0, 10);
                setTimeout(scroll, 0);
          }
          if (window.pageYOffset > windowCoords) {
            window.scrollTo(0, windowCoords);
          }
        }
        scroll();
    }
      mouseElem.addEventListener('click', scrollDown);

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
        areaScaleWidth = +areaScaleWidth.replace(/\D/g,'') - areaThumb.offsetWidth;

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
        wrapperWidth = +wrapperWidth.replace(/\D/g,'');
        fieldWidth = +fieldWidth.replace(/\D/g,'');
    
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

    //map
    const mapContainer = document.querySelector('.map');
    let ok = false;                    
    window.addEventListener('scroll',() => {
        if (ok === false) {
            ok = true;    
            setTimeout(() => {                    
                let script = document.createElement('script');
                script.src = 'https://api-maps.yandex.ru/services/constructor/1.0/js/?um=constructor%3Ad3ce773167875b0595ba1178bd4ed2c88ac2cee29d8e7260365029a0fbfd6d02&amp;width=100%25&amp;height=600&amp;lang=ru_RU&amp;scroll=false';
                mapContainer.append(script);                        
            }, 1000);   
        }
    });

    // to top

    const btn = document.querySelector('.up-btn');

    document.addEventListener('scroll', () => {
        let scrolled = window.pageYOffset;
        let coords = document.documentElement.clientHeight;
  
        if (scrolled > coords ){
            btn.classList.add('up-btn_active');
        } else {
            btn.classList.remove('up-btn_active');
        }
    });
  
    btn.addEventListener('click', backToTop);
    
    function backToTop() {
        
        if (window.pageYOffset > 0) {
            window.scrollBy(0,-80);
            setTimeout(backToTop,0);
        } 
    }

    //modal
    const openBtns = document.querySelectorAll('[data-call]'),
          modalOverlay = document.querySelector('.overlay'),
          scroll = calcScroll();

    function calcScroll(){
        const div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        console.log(scrollWidth);
        return scrollWidth;
    }
    function closeModal(){
        modalOverlay.classList.remove('overlay_active');
        document.body.style.overflow = '';
        document.body.style.marginRight ='0px';   
    }
    function openModal(){
        modalOverlay.classList.add('overlay_active');
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
    }
    openBtns.forEach(item => {
        item.addEventListener('click',() => {
            openModal();
        });
    });
    modalOverlay.addEventListener('click',(event) =>{
        if (event.target.classList.contains('overlay__close')){
            closeModal();
        }
    });
    modalOverlay.addEventListener('click',(event) => {
        if (event.target.classList.contains('overlay')){
            closeModal();
        }
    });
    document.addEventListener('keydown',(event) => {
        if (event.code == 'Escape') {
            closeModal();
        }
    });

    //inputMask


    function setCursorPosition(pos, elem) {
        elem.focus();
        if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
        else if (elem.createTextRange) {
            var range = elem.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
    function mask(event) {
        let matrix = '+7 (___) ___ ____',
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, "");
        if (def.length >= val.length){
            val = def;
        } 
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a;
        });
        if (event.type == 'blur') {
            if (this.value.length == 2) {
                this.value = "";
            }
        } else {
            setCursorPosition(this.value.length, this);
        } 
    }
    const inputs = document.querySelectorAll('[data-phone]');
    inputs.forEach(item => {
        item.addEventListener('blur', mask, false);
        item.addEventListener('input', mask, false);
        item.addEventListener('focus', mask, false);
    });
        
    //forms

    const postData = async (url, data) => {
        const result = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:data
        });
        return await result;
    };
    const forms = document.querySelectorAll('form'),
          message = {
                success: 'Спасибо! Скоро мы с вами свяжемся',
                failure: 'Что-то пошло не так...',
          };
        
        forms.forEach(item => {
            bindPostData(item);
        });
        function bindPostData(form) {
            form.addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                const json = JSON.stringify(Object.fromEntries(formData.entries()));
                    postData('mailer/smart.php',json)
                .then(() => {
                    showThanksModal(message.success);
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
            });
        }
        function showThanksModal(message){
            const modalPrev = document.querySelector('.overlay__form');
            document.querySelector('.overlay').classList.add('overlay_active');
            modalPrev.classList.remove('show');
            modalPrev.classList.add('hide');
            let modalThanks = document.createElement('div');
            modalThanks.classList.add('overlay__form');
            modalThanks.innerHTML = `
            <div class="modal__content">
                <div class="overlay__close">&times;</div>
                <div class="overlay__title">${message}</div>
            </div>`;
            document.querySelector('.overlay__modal').append(modalThanks);
            setTimeout(() => {
                    closeModal();
            }, 2500);
            setTimeout(() => {
                modalThanks.remove();
                modalPrev.classList.add('show');
                modalPrev.classList.remove('hide');
            },4000);
        }
    
    
    
  
});
