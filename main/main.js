const bth = document.querySelector('.btn--open')
const modal = document.querySelector('.modal')

const openModal = () => {
    modal.classList.add('modal--open')
    body.classList.add('body--fixed')
}


const closeModal = () => {
    modal.classList.add('modal--open')
    body.classList.remove('body--fixed')
}

bth.addEventListener('click', () => {
    modal.classList.add('modal--open')
})

modal.addEventListener('click', event => {
    const target = event.target

    if(target && target.classList.contains('modal') || target.classList.contains('modal__close--btn')) {
        modal.classList.remove('modal--open')
    }
    
})

document.addEventListener('keydown', event =>{
    console.log(event.code)

    if(event.code === 'Escape' && modal.classList.contains('modal--open')){
        modal.classList.toggle('modal--open')
    }
})