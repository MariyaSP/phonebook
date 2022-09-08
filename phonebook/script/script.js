'use strict';
const {
    deleteControl,
    modalControl,
    formControl,
} = require('./modules/control');
const {
    renderPhoneBook,
    renderContacts,
} = require('./modules/render');

const {
    getStorage,
    setStorage,
    removeStorage,
} = require('./modules/serviceStorage');


{   let data;
    const hoverRow = (allRow, logo) => {
        const text = logo.textContent;
        allRow.forEach(contact => {
            contact.addEventListener('mouseenter', () => {
                logo.textContent = contact.phoneLink.textContent;
            });
            contact.addEventListener('mouseleave', () => {
                logo.textContent = text;
            });
        });
    };

    const init = (selectorApp, title) =>{
        const app = document.querySelector(selectorApp);
        const { list, logo, btnAdd, btnDel, formOverlay, form } = renderPhoneBook(app, title);

        // функционал
        data = getStorage('contacts');
        const allRow = renderContacts(list, data);
        const {closeModal} = modalControl(btnAdd,formOverlay);

        hoverRow(allRow, logo);
        deleteControl(btnDel,list );
        formControl(form, list, closeModal);
        // setTimeout(() => {
        //     const contact = createRow({
        //         name: 'Мария',
        //         surname: 'Карцева',
        //         phone: '+7987111111',
        //     });
        //     list.append(contact);
        // }, 2000);
        // действия на телефоне пальцами
        document.addEventListener('touchstart', e => {
            console.log(e.type);
        });
        document.addEventListener('touchmove', e => {
            console.log(e.type);
        });
        document.addEventListener('touchend', e => {
            console.log(e.type);
        });
        // ========================
    };
    window.phoneBookInit = init;
}