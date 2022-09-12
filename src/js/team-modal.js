const refs = {
  openTeamModal: document.querySelector('[data-team-modal-open]'),
  closeTeamModal: document.querySelector('[data-team-modal-close]'),
  teamModal: document.querySelector('[data-team-modal]'),
};

refs.openTeamModal.addEventListener('click', toggleTeamModal);
refs.closeTeamModal.addEventListener('keydown', toggleTeamModal);
refs.closeTeamModal.addEventListener('click', toggleTeamModal);

export function toggleTeamModal() {
  refs.teamModal.classList.toggle('is-hidden');
}
