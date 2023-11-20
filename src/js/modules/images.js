const images = () => {
   const workSection = document.querySelector('.works');
   const imgPopup = document.createElement('div');
   const bigImg = document.createElement('img');

   imgPopup.classList.add('popup_works');
   bigImg.classList.add('correct_size');
   workSection.append(imgPopup);
   imgPopup.append(bigImg);

   workSection.addEventListener('click', (e) => {
      e.preventDefault();
      let target = e.target;

      if (target && target.classList.contains('preview')) {
         imgPopup.classList.add('popup_works_flex');
         document.body.classList.add('modal_open');
         let path = target.parentElement.getAttribute('href');
         bigImg.setAttribute('src', path);
      }

      if (target && target.classList.contains('popup_works')) {
         imgPopup.classList.remove('popup_works_flex');
         document.body.classList.remove('modal_open');
      }
   });
};

export default images;
