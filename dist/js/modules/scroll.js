function scroll (initalScreenSelector, elemClickSelector) {
        
    const initalScreen = document.querySelector(initalScreenSelector),
    mouseElem = document.querySelector(elemClickSelector);

    function scrollDown() {
        const windowCoords = initalScreen.offsetHeight;
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
}

export default scroll;