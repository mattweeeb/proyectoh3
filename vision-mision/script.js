const valueButtons = document.querySelectorAll('.value-button');
const valueCopies = document.querySelectorAll('.value-copy');

valueButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const copy = document.getElementById(button.dataset.value);
    const isOpen = !copy.classList.contains('hidden');

    valueCopies.forEach((paragraph) => {
      paragraph.classList.add('hidden');
      paragraph.hidden = true;
    });
    valueButtons.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      copy.classList.remove('hidden');
      copy.hidden = false;
      button.classList.add('active');
      button.setAttribute('aria-expanded', 'true');
    }
  });
});
