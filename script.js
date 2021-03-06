document.addEventListener('DOMContentLoaded', () => {
    const HEADER_MENU = document.querySelector('.navigation');
    const HEADER = document.getElementById('header');
    const FORM = document.getElementById('form');
    const BUTTON = document.getElementById('submit-btn');
    const CLOSE_BUTTON = document.getElementById('modal-close__btn');
    const MESSAGE = document.getElementById('modal__text');
    const MODAL = document.getElementById('modal');
    const INPUT_NAME = document.getElementById('input-name');
    const INPUT_EMAIL = document.getElementById('input-email');
    const MODAL_OVERLAY = document.getElementById('modal-overlay');
    const PORTFOLIO = document.querySelector('.layout-4-column');
    const PORTFOLIO_TAGS = document.querySelector('.portfolio__tags');
    const PHONES_WRAPPER = document.querySelector('.phones-wrapper');
    const ARROWS_WRAPPER = document.querySelector('.slider__wrapper');
    const SLIDES = document.querySelectorAll('.phone__slider');
    const ANCHORS = document.querySelectorAll('[data-anchor]');
    const HEADER_LINKS = HEADER_MENU.querySelectorAll('a');

    let imagesArray = [...PORTFOLIO.querySelectorAll('div')];
    let slideNumber = 0;
    let isEnable = true;
    
         
    window.onscroll = () => {
        let bodyScrollTop = document.documentElement.scrollTop || 
            document.body.scrollTop;
      
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

    const shuffle = array => {
        let j, temp;
        for (let i = array.length-1; i>=0; i--) {
            j = Math.floor(Math.random()*(i+1))
            temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    } 

    const renderParentNode = ((parentNode, array) => {
        array = shuffle(array);
        let child;
        while (child = parentNode.lastChild) parentNode.removeChild(child);
        imagesArray.forEach(el => {
            parentNode.appendChild(el);
        });
    });

    const windowScroll = event => {
        const currPos = window.scrollY;
        ANCHORS.forEach(el => {
            if (el.offsetTop <= currPos + HEADER.offsetHeight && 
                (el.offsetTop + el.offsetHeight) > currPos + HEADER.offsetHeight) {
                HEADER_LINKS.forEach(a => {
                    a.classList.remove('active');
                    if (el.dataset.anchor === a.getAttribute('href').slice(1)) {
                        a.classList.add('active');
                    }
                });
            }
        });
    };

    const renderPrevSlide = slideNumber => {
        hideSlide('to-right');
        changeSlideNumber(slideNumber+1);
        showSlide('from-left');
    };

    const renderNextSlide = slideNumber => {
        hideSlide('to-left');
        changeSlideNumber(slideNumber-1);
        showSlide('from-right');
    };

    const hideSlide = direction => {
        SLIDES[slideNumber].classList.add(direction);
        SLIDES[slideNumber].addEventListener('animationend', event => {
            event.currentTarget.classList.remove('shown', direction);
        });
        isEnable = false;
    };

    const changeSlideNumber = n => {
        slideNumber = n > SLIDES.length-1 ? 0 : n < 0 ? SLIDES.length-1 : n;
    }

    const showSlide = direction => {
        SLIDES[slideNumber].classList.add('next', direction);
        SLIDES[slideNumber].addEventListener('animationend', event => {
            event.currentTarget.classList.remove('next', direction);
            event.currentTarget.classList.add('shown');
            isEnable = true;
        });
    }
    
    document.addEventListener('scroll', windowScroll);

    HEADER_MENU.addEventListener('click', event => {
        HEADER_LINKS.forEach(el => 
            el.classList.remove('active'));
            event.target.classList.add('active');
    });

    PHONES_WRAPPER.addEventListener('click', event => {
        let id = event.target.dataset.toggleId;
        if (!id) return;
        let phoneContent = document.getElementById(id);
        phoneContent.hidden = !phoneContent.hidden;
    });

    ARROWS_WRAPPER.addEventListener('click', event => {
        let id = event.target.dataset.name;
        if (!id) return;
        (id.includes('left') && isEnable) ? renderPrevSlide(slideNumber) :
            (id.includes('right') && isEnable) ? renderNextSlide(slideNumber) : ''; 
    });


    PORTFOLIO_TAGS.addEventListener('click', event => {
        let target = event.target;
        const li = PORTFOLIO_TAGS.querySelectorAll('li');
        if (!target.classList.contains('portfolio__tag')) return;
        if (target.classList.contains('active')) return;
        li.forEach(el => el.classList.remove('active'));
        target.classList.add('active');
        renderParentNode(PORTFOLIO, imagesArray);
    });

    PORTFOLIO.addEventListener('click', event => {
        imagesArray.forEach(el => el.classList.remove('selected'));
        event.target.classList.add('selected');
    });

    BUTTON.addEventListener('click', event => {
        event.preventDefault();

        if (validateInput(INPUT_NAME) && validateInput(INPUT_EMAIL)) {
            [...FORM.querySelectorAll('.input')]
                .filter(el => el.classList.value.includes('subject') 
                    || el.classList.value.includes('description'))
                .forEach(el => {
                    MESSAGE.innerHTML += 
                    el.classList.value.includes('subject') && 
                    el.value.trim() ? `<p><span> Тема:</span> ${el.value} </span></p>` : 
                    el.classList.value.includes('subject') && 
                    !el.value.trim() ? `<p> Без темы </p>` :
                    el.classList.value.includes('description') && 
                    el.value.trim() ? `<p><span> Описание: </span> ${el.value}</p>` :
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

});