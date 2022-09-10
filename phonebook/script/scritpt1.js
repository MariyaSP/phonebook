import control from "./modules/control.js";
import serviceStorage from "./modules/serviceStorage.js";

const { getStorage} = serviceStorage;
const { deleteControl, modalControl, formControl } = control;

const init = (selectorApp, title) => {
    const app = document.querySelector(selectorApp);
    const {list, logo, btnAdd, btnDel, formOverlay, form} = renderPhoneBook(app, title);

    // функционал
    data = getStorage('contacts');
    const allRow = renderContacts(list, data);
    const {closeModal} = modalControl(btnAdd, formOverlay);
    deleteControl(btnDel, list);
    formControl(form, list, closeModal);
    console.log('bla bla');
}
window.phoneBookInit = init;