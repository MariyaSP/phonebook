// 'use strict';

const getStorage = (key) => {
    let data;
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
export default {
    getStorage,
    setStorage,
    removeStorage,
};