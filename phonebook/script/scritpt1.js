import control from "./modules/control.js";
import render from "./modules/render.js";
import serviceStorage from "./modules/serviceStorage.js";


const { getStorage, setStorage, removeStorage} = serviceStorage;
const { deleteControl, modalControl, formControl } = control;
const { renderPhoneBook, renderContacts } = render;

const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {list, logo, btnAdd, btnDel, formOverlay, form} = renderPhoneBook(app, title);

    // функционал
    let data = getStorage('contacts');
    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    console.log('bla bla');
}
window.phoneBookInit = init;