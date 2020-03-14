document.addEventListener('DOMContentLoaded', () => {
    const headerNavBar = document.querySelector('.navigation');

    const addActive = event => {
        const target = event.target;
        headerNavBar.querySelectorAll('a').forEach(el => el.classList.remove('active'));
        event.target.classList.add('active');
    };


    headerNavBar.addEventListener('click', addActive);

    // console.log(headerNavBar);
});