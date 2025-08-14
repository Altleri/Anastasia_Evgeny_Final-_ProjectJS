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
const countOfContact = document.getElementById('count-people')//Choise element from html. It's span with count of all contacts

//Created function forEacb that will upload all elementson the page
//contact is our Array with objects
function showContactsList() {
  contactsListElement.replaceChildren();
  contacts.forEach((contact) => {
    //Created new element into html
    contactsListElement.insertAdjacentHTML('beforeend', createContacthtml(contact));//Added new contect into UL (html)
  })
   showContactsCount()//call function that calculates current count of contacts
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
///////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////Function Sum of Contact Count on top of site page//////////////////
function showContactsCount() {
  countOfContact.textContent = contacts.length + " people";
}
////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////Search INPUT/////////////////////////////////////////////
//////////////////////////////////////////Search CONTACT//////////////////////////////////
//Choses all needed variables. 
let searchInput = document.getElementById('searchInput')//Search area. Input area from html file
// Function that reacts to keyboard actions
searchInput.addEventListener('input', () => {//reacted if something write in this input
  //New variable that take value of input search
  const filter = searchInput.value.toLowerCase();//filter get value
  //Get LI content from UL that we added above
  const searchContactList = contactsListElement.querySelectorAll('.user-items');

  //Function that checked all elements with class .user-items (our LI)
  searchContactList.forEach(contact => {
    //New Variable that take value from .user-items (our LI)
    const name = contact.getAttribute('data-name');
    const phone = contact.getAttribute('data-phone');

    //If element contain printed text on input area it removed class with style display: none;
    if (name.includes(filter) || phone.includes(filter)) {
      contact.classList.remove('displayNone')
    }
    else {
      contact.classList.add('displayNone')//if not display style change to displayNone
    }
  })
})
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Function for deleteting specified user.
function deleteContact(){

  //Adding event click on ul area 
  contactsListElement.addEventListener('click', (e) =>{
        //Checking if area where target the user is a element with class delete-img
        if (e.target.classList.contains('delete-img')) {
          //if yes we save container what located near the target area
          const contactEL = e.target.closest('.user-items');
          //And also save attribute of this contact
          const contactID = +contactEL.getAttribute('data-id');
        
          //Here we use the filter function for showing contacts that not contains choose id from past step
          contacts = contacts//If not contains it return new array with other contacts only
            .filter((elem) => elem.id !== contactID)
            //now we use function map for return correct ID data. 
            //Becouse if we delete contact in the middle of list, we also need to change data-id of all contacts that following after
            .map((elem) => {
              //if deleted element was from the end, no need to change anythink
              if (elem.id < contactID) {
                return elem;
              }
             //but if deleted contact was in the middle, need to update data-id attribute of  all contact following after
              return { ...elem, id: elem.id - 1 }
            })
        
            //In the end we call function that show our array
        showContactsList();
      }
    })
    }

/////////////////////////////////////////////////////////////////////////////////////////////////////////

