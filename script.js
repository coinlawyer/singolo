// document.addEventListener('DOMContentLoaded', () => {
    const HEADER_MENU = document.querySelector('.navigation');
    const HEADER = document.getElementById('header');
    const FORM = document.getElementById('form');
    const BUTTON = document.getElementById('submit-btn');
    const CLOSE_BUTTON = document.getElementById('modal-close__btn');
    const MESSAGE = document.getElementById('modal__text');
    const MODAL = document.getElementById('modal');
    const TEXTAREA_DESCR = document.getElementById('description');
    const INPUT_NAME = document.getElementById('input-name');
    const INPUT_EMAIL = document.getElementById('input-email');
    const INPUT_SUBJECT = document.getElementById('input-subject');
    const MODAL_OVERLAY = document.getElementById('modal-overlay');

         
    window.onscroll = () => {
        let bodyScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      
        if (bodyScrollTop > HEADER.offsetHeight) {
        HEADER.classList.add('fixed');
        } else {
        HEADER.classList.remove('fixed');
        }
    };

    const validateInput = elem => {
        if (!elem.value) {
            alert(`Please input your ${elem.name}`);
            elem.focus();
            return false;
        }
        const pattern = new RegExp(elem.pattern);
        if (elem.pattern && !(pattern).test(elem.value)) {
            alert(`Please input correct ${elem.name}`);
            elem.focus();
            return false;
        }
        if (!elem.checkValidity()) {
            alert(`Please input correct ${elem.name}`);
            elem.focus();
            return false;
        }
        return true;
    };

      
    HEADER_MENU.addEventListener('click', event => {
        HEADER_MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    });

    BUTTON.addEventListener('click', event => {
        event.preventDefault();

            if (validateInput(INPUT_NAME) && validateInput(INPUT_EMAIL)) {
                [...FORM.querySelectorAll('.input')]
                .filter(el => el.classList.value.includes('subject') || el.classList.value.includes('description'))
                .forEach(el => {
                    MESSAGE.innerHTML += 
                    el.classList.value.includes('subject') && el.value.trim() ? `<p><span> Тема:</span> ${el.value} </span></p>` : 
                    el.classList.value.includes('subject') && !el.value.trim() ? `<p> Без темы </p>` :
                    el.classList.value.includes('description') && el.value.trim() ? `<p><span> Описание: </span> ${el.value}</p>` :
                    `<p> Без описания </p>`;
                });

                MODAL.classList.remove('hidden');
                MODAL_OVERLAY.classList.remove('hidden');
            }
    });
    
    CLOSE_BUTTON.addEventListener('click', event => {
        event.preventDefault();
        FORM.reset();
        MESSAGE.innerText = '';
        MODAL.classList.add('hidden');
        MODAL_OVERLAY.classList.add('hidden');

    });


// });