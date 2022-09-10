import { deleteControl as delControl, modalControl, formControl } from "./modules/control.js";
import serviceStorage from "./modules/serviceStorage.js";
import render from "./modules/render.js";

const { getStorage} = serviceStorage;
//const { delControl, modalControl, formControl } = control;
const { renderPhoneBook, renderContacts } = render;

const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {list, logo, btnAdd, btnDel, formOverlay, form} = renderPhoneBook(app, title);

    // функционал
    let data = getStorage('contacts');
    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    delControl(btnDel, list);
    formControl(form, list, closeModal);
}
window.phoneBookInit = init;