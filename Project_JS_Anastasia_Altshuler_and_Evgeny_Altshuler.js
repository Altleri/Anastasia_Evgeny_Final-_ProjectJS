"use strict";//Don't forget to add "use strict"

/***************************JS*************************************
// ANASTASIIA ALTSHULER 
// AND EVGENY ALTSHULER 
/************************************************************************/

//Added array with conacts 
let contacts = [
  {
    id: 1,
    name: 'Bertie Yates',
    address: "Haifa",
    phone: "054999000",
    age: '25',
    imageUrl: "./image/contact1.png",
  },
  {
    id: 2,
    name: 'Hester Hogan',
    address: "Haifa",
    phone: "054996669",
    age: '25',
    imageUrl: "./image/contact2.png"
  },
  {
    id: 3,
    name: 'Larry Little',
    address: "Haifa",
    phone: "054966699",
    age: '25',
    imageUrl: "./image/contact3.png"
  },
  {
    id: 4,
    name: 'Sean Walsh',
    address: "Haifa",
    phone: "054555999",
    age: '25',
    imageUrl: "./image/seanWalsh.png"
  },
  {
    id: 5,
    name: 'Carry Jonh',
    address: "Haifa",
    phone: "054555999",
    age: '25',
    imageUrl: "./image/carryJonh.png"
  },
]

/////////////////////////////////////////////START//////////////////////////////////////////////

/////////////////////////////////ADD HTML ELEMENT INTO UL VIA JS///////////////////////////

//Function for upload to the page all exist objects
//Chosed UL for add into it all info about contacts
const contactsListElement = document.querySelector('.user-list');

//Created function forEacb that will upload all elementson the page
//contact is our Array with objects
function showContactsList() {
  contactsListElement.replaceChildren();
  contacts.forEach((contact) => {
    //Created new element into html
    contactsListElement.insertAdjacentHTML('beforeend', createContacthtml(contact));//Added new contect into UL (html)
  })
}

//Function that return content of contact according to position in the array
function createContacthtml(contact) {
  return ` <li class="user-items" data-id="${contact.id}" data-name="${contact.name.toLowerCase()}" data-phone="${contact.phone}">
            <div class="user-info">
            <img src="${contact.imageUrl}" alt="contact1" title="${contact.name}" class="avatar">
            <span class="user-name" >${contact.name}</span>
          </div>
          <div class="user-actions">
            <i class="info action-icon"><img src="./image/infoicon.png" alt="infoicon" title="info"></i>
            <i class="edit action-icon"><img src="./image/linepenpencilicon.png" alt="penicon" title="edit"></i>
            <i class="delete action-icon"><img class="delete-img" src="./image/trashbasketdeleteremoveicon2.png" alt="trashbasket2"
                title="delete"></i>
          </div>
          </li>
        `
}

showContactsList();//Call the function that upload all element(contacts) the page
/////////////////////////////////////////////////END/////////////////////////////////////////////////


//This function will be removed all contacts when clinet click on "remove-all-btn" (img)
const removeAllBTN = document.querySelector('.remove-all-btn')//get class on elem img
removeAllBTN.addEventListener('click', () => {//created event - click and function that give to our array, length value = 0
  contacts.length = 0;
  showContactsList();//Call the function that upload all element(contacts) the page. Now it's - 0
})