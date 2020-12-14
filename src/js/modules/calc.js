function calc() {
    const priceResult = document.querySelector('.priceResult span'),
          avgSquareMeter = document.querySelector('.avgSquareMeter span'),
          square = document.querySelector('.squareMeter span'),
          areaThumb = document.querySelector('.calculate__scale-round'),
          areaScale = document.querySelector('.calculate__scale'),
          packages = document.querySelectorAll('.calculate__rate');
    let areaSquare = 0,
        packageNum = 4850,
        areaScaleWidth = areaScale.offsetWidth - areaThumb.offsetWidth;

    function choosePackage(){
        packages.forEach(item => {
            item.addEventListener('click',(event) => {
                event.preventDefault();
                packages.forEach(item => {
                    item.classList.remove('calculate__rate_active');
                });
                    item.classList.add('calculate__rate_active');
                    packageNum = +item.getAttribute('data-price');
                    initCalculator();
            });
        });
    }
    function findSquareMeters(coords){
        let percent = areaScaleWidth / 10;
        areaSquare = Math.round(+areaThumb.getAttribute('data-area')*coords / percent);
        if (areaSquare <= 0){
            areaSquare = 0;
        }
        areaThumb.style.left = `${coords}px`;
        initCalculator();
    }
    function chooseArea(){
        areaScale.addEventListener('click',(event) => {
            let coordsClick = event.clientX - areaScale
                .getBoundingClientRect().left-areaThumb.offsetWidth/2;
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
        avgSquareMeter.textContent = formatNumber(packageNum);
        priceResult.textContent = formatNumber(areaSquare*packageNum);
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
}

export default calc;