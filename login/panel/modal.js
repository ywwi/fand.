// modal
const modal = document.querySelector('.modal-container')
const resumeAdditionalRegister = document.querySelectorAll('.resume-additional-register')
const modalCancelButton = document.querySelector('#cancel-modal')
const content = document.querySelector('.content')

let parent, mainH2Modal, spanModal, placeholderModal

resumeAdditionalRegister.forEach(button => {
    button.addEventListener('click', (clickEvent) =>
    {
        parent = clickEvent.path[1].classList[0]

        switch (parent)
        {
            case 'abilities':
                mainH2Modal = 'Adicionar nova habilidade'
                spanModal = 'Habilidade'
                placeholderModal = 'Digite sua habilidade (você deve ter alguma!)'
                break
            case 'competences':
                mainH2Modal = 'Adicionar nova competência'
                spanModal = 'Competência'
                placeholderModal = 'Digite sua competência (você deve ter alguma!)'
                break
            case 'educations':
                mainH2Modal = 'Adicionar nova educação'
                spanModal = 'Educação'
                placeholderModal = 'Digite sua educação'
                break
            case 'professional-experiences':
                mainH2Modal = 'Adicionar nova experiência profissional'
                spanModal = 'Experiência Profissional'
                placeholderModal = 'Digite sua experiência profissional'
                break
        }

        modal.classList.add('active-modal')
        sidebar.classList.add('blur')
        content.classList.add('blur')
    })
})
modalCancelButton.addEventListener('click', () => {
    modal.classList.remove('active-modal')
    sidebar.classList.remove('blur')
    content.classList.remove('blur')
})