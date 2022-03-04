window.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.nav-menu__content');
  const menuItem = menu.querySelectorAll('.nav-menu__item');
  const hamburger = document.querySelector('.hamburger');
  const hamburgerItem = hamburger.querySelectorAll('.hamburger__line');

  hamburger.addEventListener('click', () => {
    hamburgerItem.forEach(item => {
      item.classList.toggle('hamburger__line_active');
    });
    menu.classList.toggle('nav-menu__content_active');
  });

  menuItem.forEach(item => {
    item.addEventListener('click', () => {
      hamburgerItem.forEach(item => {
        item.classList.toggle('hamburger__line_active');
      });
      menu.classList.toggle('nav-menu__content_active');
    });
  });
});
