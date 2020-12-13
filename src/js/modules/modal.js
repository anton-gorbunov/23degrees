function closeModal(activeClass, overlaySelector) {
    const  modalOverlay = document.querySelector(overlaySelector);
    modalOverlay.classList.remove(activeClass);
    document.body.style.overflow = '';
    document.body.style.marginRight = '0px';
}

function modal(overlaySelector, activeClass, openModalSelector, closeElemClass){
    const openBtns = document.querySelectorAll(openModalSelector),
    modalOverlay = document.querySelector(overlaySelector),
    scroll = calcScroll();

    function calcScroll() {
        const div = document.createElement('div');

        div.style.width = '50px';
        div.style.height = '50px';
        div.style.overflowY = 'scroll';
        div.style.visibility = 'hidden';
        document.body.append(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        return scrollWidth;
    }
    function openModal() {
        modalOverlay.classList.add(activeClass);
        document.body.style.overflow = 'hidden';
        document.body.style.marginRight = `${scroll}px`;
    }
    openBtns.forEach(item => {
        item.addEventListener('click', () => {
            openModal();
        });
    });
    modalOverlay.addEventListener('click', (event) => {
        if (event.target.classList.contains(closeElemClass)) {
            closeModal(activeClass, overlaySelector);
        }
    });
    modalOverlay.addEventListener('click', (event) => {
        if (event.target.classList.contains(overlaySelector.slice(1))) {
            closeModal(activeClass, overlaySelector);
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code == 'Escape') {
            closeModal(activeClass, overlaySelector);
        }
    });
}

export default modal;
export {closeModal};