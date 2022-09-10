import serviceStorage from "./serviceStorage.js";
import createElements from "./createElements.js";
import render from "./render.js"
const { setStorage, removeStorage } = serviceStorage;
const { addContactPage } = createElements;
const {renderContacts} = render;
export const deleteControl = (btnDel,list ) => {
    btnDel.addEventListener('click', () => {
        const tel = prompt('Введите номер телефона');
        let data = removeStorage(tel);
        renderContacts(list, data);
        document.querySelectorAll('.delete').forEach(del => {
            del.classList.toggle('is-visible');

        });
    });

    list.addEventListener('click', e => {
        const target = e.target;
        if(target.closest('.del-icon')){
            target.closest('.contact').remove();
        }
    });
};
export const modalControl = (btnAdd,formOverlay ) => {

    const openModal = () => {
        formOverlay.classList.add('is-visible');
        document.querySelectorAll('.delete').forEach(del => {
            del.classList.remove('is-visible');
        });
    };
    const closeModal = () => {
        formOverlay.classList.remove('is-visible');
    };
    btnAdd.addEventListener('click', openModal);
    // блокировка всплытия событий
    // form.addEventListener('click', e => {
    //     e.stopPropagation();
    // })
    formOverlay.addEventListener('click', (e) => {
        const target = e.target;
        if(target === formOverlay || target.classList.contains('close')) {
            closeModal();
        }
    });
    return {
        closeModal,
    };
};

export const formControl = (form, list, closeModal) => {
    form.addEventListener('submit', e => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newContact = Object.fromEntries(formData);
        addContactPage(newContact, list);
        setStorage('contacts', newContact);

        form.reset(); // очистка формы после отправки
        closeModal();
    });
};
    // export default {
    //     deleteControl,
    //     modalControl,
    //     formControl,
    // };
