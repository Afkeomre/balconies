const hideAllModals = (windows) => {
   windows.forEach((window) => {
      window.classList.add('hide');
      window.classList.remove('show');
      document.body.classList.remove('modal-open');
      document.body.style.marginRight = '0px';
   });
};

const modals = (state) => {
   function bindModal(
      triggerSelector,
      modalSelector,
      closeSelector,
      closeClickOverlay = true
   ) {
      const triggers = document.querySelectorAll(triggerSelector);
      const modalWindow = document.querySelector(modalSelector);
      const close = document.querySelector(closeSelector);
      const windowsSet = document.querySelectorAll('[data-modal]');
      const scrollSize = calcScroll();

      triggers.forEach((trigger) =>
         trigger.addEventListener('click', (e) => {
            if (e.target) {
               e.preventDefault();
            }

            if (
               triggerSelector === '.popup_calc_button' &&
               (state.width === '' || state.height === '')
            ) {
               createElement(document.querySelector('.popup_calc_content'));
            } else if (
               triggerSelector === '.popup_calc_profile_button' &&
               state.profile === ''
            ) {
               createElement(
                  document.querySelector('.popup_calc_profile_content')
               );
            } else {
               hideAllModals(windowsSet);
               showModal(modalWindow, scrollSize);
               clearTimeout(modalTimerId);
            }
         })
      );

      close.addEventListener('click', () => {
         hideAllModals(windowsSet);
         hideModal(modalWindow);
      });

      modalWindow.addEventListener('click', (e) => {
         if (e.target === modalWindow && closeClickOverlay) {
            hideAllModals(windowsSet);
            hideModal(modalWindow);
         }
      });
   }

   function showModal(modal, scroll) {
      modal.classList.add('show');
      document.body.classList.add('modal-open');
      document.body.style.marginRight = `${scroll}px`;
   }

   function hideModal(modal) {
      modal.classList.remove('show');
      document.body.classList.remove('modal-open');
      document.body.style.marginRight = '0px';
   }

   function createElement(parent) {
      let div = document.createElement('div');
      div.classList.add('status-fail');
      div.style.marginTop = '10px';
      div.textContent = 'Заполните все поля формы';
      parent.append(div);

      setTimeout(() => {
         div.remove();
      }, 5000);
   }

   function calcScroll() {
      let div = document.createElement('div');
      div.style.width = '50px';
      div.style.height = '50px';
      div.style.overflowY = 'scroll';
      div.style.visibility = 'hidden';
      document.body.append(div);

      let scrollWidth = div.offsetWidth - div.clientWidth;
      div.remove();

      return scrollWidth;
   }

   bindModal(
      '.popup_engineer_btn',
      '.popup_engineer',
      '.popup_engineer .popup_close'
   );
   bindModal('.phone_link', '.popup', '.popup .popup_close');
   bindModal('.popup_calc_btn', '.popup_calc', '.popup_calc_close');
   bindModal(
      '.popup_calc_button',
      '.popup_calc_profile',
      '.popup_calc_profile_close',
      false
   );
   bindModal(
      '.popup_calc_profile_button',
      '.popup_calc_end',
      '.popup_calc_end_close',
      false
   );
   const modalTimerId = setTimeout(() => {
      showModal(document.querySelector('.popup'), calcScroll());
   }, 60000);
};

export default modals;
export { hideAllModals };
