function dragSlider(dragSliderSelector, fieldSelector, 
                    wrapperSelector, thumbSelector) {
    const dragSlider = document.querySelector(dragSliderSelector),
          field = document.querySelector(fieldSelector), 
          wrapper = document.querySelector(wrapperSelector),
          thumb = dragSlider.querySelector(thumbSelector);
          
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
        let coordsClick = event.clientX-dragSlider.getBoundingClientRect().left;
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
}

export default dragSlider;