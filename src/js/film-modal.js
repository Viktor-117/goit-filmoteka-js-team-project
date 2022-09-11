const refs = {
    openFilmModal: document.querySelector("[data-modal-open]"),
    closeFilmModal: document.querySelector("[data-modal-close]"),
    filmModal: document.querySelector("[data-film-modal]"),
};

refs.openFilmModal.addEventListener("click", toggleModal);
refs.closeFilmModal.addEventListener("keydown", toggleModal)
refs.closeFilmModal.addEventListener("click", toggleModal)


export function toggleModal() {
    refs.filmModal.classList.toggle("is-hidden")
}

