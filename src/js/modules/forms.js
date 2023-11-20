import checkNumInputs from './checkNumInputs';
import { hideAllModals } from './modals';

const forms = (state) => {
   const formsSet = document.querySelectorAll('form');
   const inputs = document.querySelectorAll('input');

   checkNumInputs('input[name="user_phone"]');

   const message = {
      loading: 'Загрузка...',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...',
   };

   const postData = async (url, data) => {
      document.querySelector('.status-loading').textContent = message.loading;

      let res = await fetch(url, {
         method: 'POST',
         body: data,
      });

      return await res.text();
   };

   const clearInputs = () => {
      inputs.forEach((input) => {
         input.value = '';
      });
   };

   formsSet.forEach((form) => {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         let statusMessage = document.createElement('div');
         statusMessage.classList.add('status-loading');
         form.append(statusMessage);

         const formData = new FormData(form);

         if (form.dataset.calc === 'end') {
            for (let key in state) {
               formData.append(key, state[key]);
            }
         }

         postData('assets/server.php', formData)
            .then((res) => {
               statusMessage.textContent = message.success;
               statusMessage.classList.remove('status-loading');
               statusMessage.classList.add('status-success');
               console.log(res);
            })
            .catch(() => {
               statusMessage.textContent = message.failure;
               statusMessage.classList.remove('status-loading');
               statusMessage.classList.add('status-fail');
            })
            .finally(() => {
               clearInputs();

               for (let key in state) {
                  state[key] = '';
               }

               setTimeout(() => {
                  statusMessage.remove();
                  hideAllModals(document.querySelectorAll('[data-modal]'));
               }, 5000);
            });
      });
   });
};

export default forms;
