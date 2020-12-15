function calc() {
    const priceResult = document.querySelector('.priceResult span'),
          avgSquareMeter = document.querySelector('.avgSquareMeter span'),
          square = document.querySelector('.squareMeter span'),
          areaScale = document.querySelector('.calculate__scale-inp'),
          packages = document.querySelectorAll('.calculate__rate');
    let areaSquare = 1,
        packageNum = 4850;

    areaScale.addEventListener('input',(event) => {
        areaSquare = event.target.value;
        initCalculator();
    });

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
    initCalculator();
}

export default calc;