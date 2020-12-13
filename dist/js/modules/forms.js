import {postData} from '../services/services';
import {closeModal} from './modal';

function forms(form){
    const forms = document.querySelectorAll(form),
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
            postData('mailer/smart.php', json)
                .then(() => {
                    showThanksModal(message.success);
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    }

    function showThanksModal(message) {
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
            closeModal('overlay_active', '.overlay');
        }, 2500);
        setTimeout(() => {
            modalThanks.remove();
            modalPrev.classList.add('show');
            modalPrev.classList.remove('hide');
        }, 4000);
    }
}

export default forms;