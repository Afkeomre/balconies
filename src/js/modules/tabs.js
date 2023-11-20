const tabs = (
   headerSelector,
   tabSelector,
   contentSelector,
   activeClass,
   showClass = 'show'
) => {
   const header = document.querySelector(headerSelector);
   const tabElements = document.querySelectorAll(tabSelector);
   const content = document.querySelectorAll(contentSelector);

   function hideTabContent() {
      content.forEach((item) => {
         item.classList.add('hide');
         item.classList.remove(showClass);
      });

      tabElements.forEach((tab) => tab.classList.remove(activeClass));
   }

   function showTabContent(i = 0) {
      content[i].classList.add(showClass);
      content[i].classList.remove('hide');
      tabElements[i].classList.add(activeClass);
   }

   hideTabContent();
   showTabContent();

   header.addEventListener('click', (e) => {
      const target = e.target;

      if (
         target &&
         (target.classList.contains(tabSelector.slice(1)) ||
            target.parentNode.classList.contains(tabSelector.slice(1)))
      ) {
         tabElements.forEach((tab, i) => {
            if (target === tab || target.parentNode === tab) {
               hideTabContent();
               showTabContent(i);
            }
         });
      }
   });
};

export default tabs;
