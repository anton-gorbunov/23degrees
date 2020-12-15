function dragSlider(dragSliderSelector, fieldSelector) {
    const dragSlider = document.querySelector(dragSliderSelector),
          field = document.querySelector(fieldSelector); 
          
    let sliderWidth = dragSlider.offsetWidth,
        fieldWidth = window.getComputedStyle(field).width;

    fieldWidth = +fieldWidth.slice(0,fieldWidth.length-2);

    function initDragSlider(){
        dragSlider.setAttribute('max',sliderWidth);
        field.style.width = fieldWidth + 'px';
    }
    initDragSlider();

    dragSlider.addEventListener('input',(event) => {
        let moveIndex = (fieldWidth-sliderWidth) / sliderWidth,
            moveValue = +event.target.value;
            field.style.transform = 'translateX(-'+(moveValue* moveIndex)+'px)';
    });

    
}

export default dragSlider;