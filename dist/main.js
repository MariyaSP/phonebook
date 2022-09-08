(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

const {
    renderContacts,
} = require('./render');

const{
    createRow,
} = require('./createElements');

const {
    setStorage,
    removeStorage,
} = require('./serviceStorage');

const deleteControl = (btnDel,list ) => {
    btnDel.addEventListener('click', () => {
        const tel = prompt('Введите номер телефона');
        data = removeStorage(tel);
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
const modalControl = (btnAdd,formOverlay ) => {

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
const addContactPage = (contact, list) =>{
    list.append(createRow(contact));
};
const formControl = (form, list, closeModal) => {
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
    module.exports =  {
        deleteControl,
        modalControl,
        formControl,
    };
},{"./createElements":2,"./render":3,"./serviceStorage":4}],2:[function(require,module,exports){
'use strict';
const createContainer = () => {
    const container = document.createElement('div');
    container.classList.add('container');
    return container;
};
const createHeader = () =>{
    const header = document.createElement('header');
    header.classList.add('header');
    const headerContainer = createContainer();
    header.append(headerContainer);
    header.headerContainer = headerContainer;
    return header;
};
const createLogo = title => {
    const h1 = document.createElement('h1');
    h1.classList.add('logo');
    h1.textContent = `Телефонный справочник. ${title}`;
    return h1;
};
const createMain = () => {
    const main = document.createElement('main');
    const mainContainer = createContainer();
    main.append(mainContainer);
    main.mainContainer = mainContainer;
    return main;
};
const createButtonsGroup = params => {
    const btnWrapper = document.createElement('div');
    btnWrapper.classList.add('btn-wrapper');

    const btns = params.map(({className, type, text}) => {
        const button = document.createElement('button');
        button.type = type;
        button.className = className;
        button.textContent = text;
        return button;
    });
    btnWrapper.append(...btns);

    return {
        btnWrapper,
        btns,
    };
};
const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table', 'table-striped');

    const thead = document.createElement('thead');
    thead.insertAdjacentHTML('beforeend', `
            <tr>
                <th class="delete"> Удалить</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
            </tr>   
        `);

    const tbody = document.createElement('tbody');
    table.append(thead, tbody);
    table.tbody = tbody;

    return table;
};
const createForm = () => {
    const overlay = document.createElement('div');
    overlay.classList.add('form-overlay');

    const form = document.createElement('form');
    form.classList.add('form');
    form.insertAdjacentHTML('beforeend', `
        <button class="close" type="button"></button>
        <h2 class="form-title"> Добавить контакт</h2>
            <div class="form-group">
                <label for="name" class="form-label"> Имя</label>
                <input type="text" class="form-input" id="name" name="name" required>
            </div>
            <div class="form-group">
                <label for="surname" class="form-label"> Фамилия</label>
                <input type="text" class="form-input" id="surname" name="surname" required>
            </div>
            <div class="form-group">
                <label for="phone" class="form-label"> Телефон</label>
                <input type="number" class="form-input" id="phone" name="phone" required>
            </div>
        `);
    const buttonGroup = createButtonsGroup([
        {
            className: 'btn btn-primary mr-3',
            type: 'submit',
            text: 'Добавить',
        },
        {
            className: 'btn btn-danger',
            type: 'reset',
            text: 'Отмена',
        },
    ]);
    form.append(...buttonGroup.btns);
    overlay.append(form);
    return {
        overlay,
        form,
    };
};
const createFooter = (title) => {
    const footer = document.createElement('footer');
    footer.classList.add('footer');
    const footerContainer = createContainer();
    footerContainer.insertAdjacentHTML('beforeend', `<span>Все права защищены &copy; ${title}</span>`)
    footer.append(footerContainer);
    footer.footerContainer = footerContainer;
    return footer;
}
const createRow = ({name, surname, phone}) => {

    const tr = document.createElement('tr');
    tr.classList.add('contact');
    const tdDel = document.createElement('td');
    tdDel.classList.add('delete');
    const buttonDel = document.createElement('button');
    buttonDel.classList.add('del-icon');
    tdDel.append(buttonDel);
    const tdName = document.createElement('td');
    tdName.textContent = name;
    const tdSurname = document.createElement('td');
    tdSurname.textContent = surname;
    const tdPhone = document.createElement('td');
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel: ${phone}`;
    phoneLink.textContent = phone;
    tr.phoneLink = phoneLink;
    tdPhone.append(phoneLink);
    tr.append(tdDel, tdName, tdSurname, tdPhone);
    return tr;
};

module.exports = {
    createHeader,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createFooter,
    createRow,
};
},{}],3:[function(require,module,exports){
'use strict';

const{
    createHeader,
    createLogo,
    createMain,
    createButtonsGroup,
    createTable,
    createForm,
    createFooter,
    createRow,
} = require('./createElements');

const renderPhoneBook = (app, title) =>{
    const header = createHeader();
    const logo = createLogo(title);
    const main = createMain();
    const buttonGroup = createButtonsGroup([
        {
            className: 'btn btn-primary mr-3',
            type: 'button',
            text: 'Добавить',
        },
        {
            className: 'btn btn-danger',
            type: 'button',
            text: 'Удалить',
        },
    ]);

    const table = createTable();
    const {form, overlay} = createForm();
    const footer = createFooter(title);
    header.headerContainer.append(logo);
    main.mainContainer.append(buttonGroup.btnWrapper, table, overlay);

    app.append(header, main, footer);
    return {
        list: table.tbody,
        logo,
        btnAdd: buttonGroup.btns[0],
        btnDel: buttonGroup.btns[1],
        formOverlay: overlay,
        form,
    }
};
const renderContacts = (elem, data) => {
    const allRow = data.map(createRow);
    elem.innerHTML = '';
    elem.append(...allRow);
    return allRow;
};

module.exports = {
    renderPhoneBook,
    renderContacts,
    };
},{"./createElements":2}],4:[function(require,module,exports){
'use strict';

const getStorage = (key) => {
    data = localStorage.getItem(key) !== null ?  JSON.parse(localStorage[key]) : [];
    return  data;
};
const setStorage = (key, item) => {
    let contactList = getStorage(key);
    contactList.push(item);
    localStorage[key] = JSON.stringify(contactList);

};
const removeStorage = (phone) => {
    let contactList = getStorage('contacts');
    let flagDel = 0;
    contactList.forEach((contact, i) => {
        if (contact.phone === phone){
            contactList.splice(i, 1);
            localStorage.contacts = JSON.stringify(contactList);
            alert('Номер удален');
            flagDel = 1;
        }
    });
    if (flagDel === 0){
        alert('Контакта с таким номером телефона нет');
    }

    return contactList;
};
module.exports = {
    getStorage,
    setStorage,
    removeStorage,
};
},{}],5:[function(require,module,exports){
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
},{"./modules/control":1,"./modules/render":3,"./modules/serviceStorage":4}]},{},[5]);
