const modalWrapper = document.getElementById('modal-wrapper');
const peopleCards = document.querySelectorAll('li.person');

const modalHeader = modalWrapper.querySelector('.modal .modal-header');
const modalBody = modalWrapper.querySelector('.modal .modal-body');
const modalFooter = modalWrapper.querySelector('.modal .modal-footer');
const modalCloseButtons = modalWrapper.querySelectorAll('.modal-close');

function clearModal() {
    modalHeader.innerHTML = '';
    modalBody.innerHTML = '';
    modalFooter.innerHTML = '';
}

function openModal() {
    document.body.classList.add('modal-open');
}

function closeModal() {
    document.body.classList.remove('modal-open');
    clearModal();
}

modalCloseButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        closeModal();
    });
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

function setModalContent(card) {
    const name = card.querySelector('.person-name');
    const title = card.querySelector('.title');
    const iwi = card.querySelector('.iwi');
    const profile = card.querySelector('.profile');

    clearModal();

    if (modalHeader !== null && (title !== null || name !== null || iwi !== null)) {
        if (title)
            modalHeader.innerHTML = title.outerHTML;
        if (name)
            modalHeader.innerHTML += name.outerHTML;
        if (iwi)
            modalHeader.innerHTML += iwi.outerHTML;
    }

    if (modalBody !== null && profile !== null) {
        if (profile) {
            modalBody.innerHTML += profile.innerHTML;
        }
    }
}

peopleCards.forEach((card) => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (modalWrapper !== null && typeof modalWrapper !== 'undefined') {
            setModalContent(card);
            openModal();
        }
    });
});