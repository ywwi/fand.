const mobileMenu = document.querySelector('.panel-mobile-menu')
const sidebar = document.querySelector('.sidebar-menu')
let flagg = true
mobileMenu.onclick = () =>
{
    if(flagg === true) {
        sidebar.style.visibility = 'visible'
        sidebar.style.transform = 'translateX(0%)'
        mobileMenu.children[0].style.transform = 'translateX(100%)'
        mobileMenu.children[1].style.transform = 'translateY(-200%)'
        document.body.style.overflow = 'hidden'
        flagg = false
    } else {
        sidebar.style.transform = 'translateX(-100%)'
        mobileMenu.children[0].style.transform = 'translateX(0%)'
        mobileMenu.children[1].style.transform = 'translateY(0%)'
        document.body.style.overflow = 'hidden scroll'
        flagg = true
    }
}

const linkSidebar = document.querySelectorAll('.link-sidebar')

const lerp = (start, end, amt) =>
{
    return (1.0 - amt)*start+amt*end
}

const tick = () =>
{
    current.x = lerp(current.x, destination.x, 0.1)
    current.y = lerp(current.y, destination.y, 0.1)
    cursor.style.left = current.x + 'px'
    cursor.style.top = current.y + 'px'

    window.requestAnimationFrame(tick)
}
tick()

// Hide - show buttons
const resumeAdditionalBtnsWrapper = document.querySelectorAll('.resume-additional-btns-wrapper')

const openedEye = document.querySelectorAll('.hide-eye')


openedEye.forEach(eye =>
{
    const eyesArray = [eye.previousElementSibling, eye]


    eyesArray.forEach(clickedEye => {
        clickedEye.addEventListener('click', () => {
            clickedEye.classList.toggle('hide-eye')

            let elementSibling = clickedEye.nextElementSibling
            let parentElement = clickedEye.parentElement
            parentElement.classList.toggle('resume-additional-btns-clicked')

            parentElement.previousElementSibling.classList.toggle('information-hover')

            if(elementSibling === null) {
                elementSibling = clickedEye.previousElementSibling
            }
            elementSibling.classList.toggle('hide-eye')

        })
    })
})