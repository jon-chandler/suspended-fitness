const menuBtn = document.querySelector('.menu-btn')
const navModal = document.getElementById('nav-overlay')
const clsModal = document.querySelector('.modal__close')

menuBtn.addEventListener('click', ()=> {
    navModal.classList.toggle('is-open')
})

clsModal.addEventListener('click', ()=> {
    navModal.classList.remove('is-open')
})