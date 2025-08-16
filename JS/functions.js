"use strict";//Don't forget to add "use strict"

/***************************JS*************************************
// ANASTASIIA ALTSHULER 
// AND EVGENY ALTSHULER 
/************************************************************************/


/////////////////////////////////////////////START//////////////////////////////////////////////

/////////////////////////////////ADD HTML ELEMENT INTO UL VIA JS///////////////////////////

//Function for upload to the page all exist objects
//Chosed UL for add into it all info about contacts
const contactsListElement = document.querySelector('.user-list');
const countOfContact = document.getElementById('count-people')//Choise element from html. It's span with count of all contacts
//This function will be removed all contacts when clinet click on "remove-all-btn" (img)
const removeAllBTN = document.querySelector('.remove-all-btn')//get class on elem img
let searchInput = document.getElementById('searchInput')//Search area. Inout area from html file

//Setting of popup. Take elements of popup from HTML
const generalPopup = document.getElementById('generalPopup');
const contactName = document.querySelector('.popup-user-name');
const contactPhone = document.querySelector('.popup-user-phone');
const contactAddress = document.querySelector('.popup-user-address');
const contactAge = document.querySelector('.popup-user-age');
const contactImageURL = document.querySelector('.popup-user-image');
//Take element from html. It's add img
const addNewContact = document.getElementById('add-Person')

//Get X that close the popup
const closeGeneralPopup = document.getElementById('closeModal');

//Created function forEach that will upload all elementson the page
//contact is our Array with objects
function showContactsList() {
  contactsListElement.replaceChildren();
  
  contacts
  //Added alphabetical sorting
  .sort((a,b) => a.name.localeCompare(b.name))
  .forEach((contact) => {
    //Created new element into html
    contactsListElement.insertAdjacentHTML('beforeend', createContacthtml(contact));//Added new contect into UL (html)
  })
   showContactsCount()//call function that calculates current count of contacts
}


//Function that return content of contact according to position in the array
function createContacthtml(contact) {
  return ` <li class="user-items" data-id="${contact.id}" data-name="${contact.name}" data-phone="${contact.phone}">
            <div class="user-info">
            <img src="${contact.imageUrl}" alt="contact1" title="${contact.name}" class="avatar">
            <span class="user-name" >${contact.name}</span>
          </div>
          <div class="user-actions">
            <i class="info action-icon"><img class="info-img" src="./image/infoicon.png" alt="infoicon" title="info"></i>
            <i class="edit action-icon"><img class="edit-img"src="./image/linepenpencilicon.png" alt="penicon" title="edit"></i>
            <i class="delete action-icon"><img class="delete-img" src="./image/trashbasketdeleteremoveicon2.png" alt="trashbasket2"
                title="delete"></i>
          </div>
          </li>
        `
}


/////////////////////////////////////////////////END/////////////////////////////////////////////////


function removeAllContacts(){
removeAllBTN.addEventListener('click', () => {//created event - click and function that give to our array, length value = 0
  if(confirm('You want to delete all contacts?'))
  {
  contacts.length = 0;
  }
  showContactsList();//Call the function that upload all element(contacts) the page. Now it's - 0
})
}


///////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////Function Sum of Contact Count on top of site page//////////////////
function showContactsCount() {
  countOfContact.textContent = contacts.length + " people";
}
////////////////////////////////////////////////////////////////////////////////


/////////////////////////////////////////Search INPUT/////////////////////////////////////////////
//////////////////////////////////////////Search CONTACT///////////////////////////////// 

// Function that reacts to keyboard actions
function searchInputContacts(){
searchInput.addEventListener('input', (e) => {//reacted if something write in this input
  //New variable that take value of input search
  const filter = e.target.value.toLowerCase();//filter get value
  //Get LI content from UL that we added above
  const searchContactList = contactsListElement.querySelectorAll('.user-items');

  //Function that checked all elements with class .user-items (our LI)
  searchContactList.forEach(contact => {
    //New Variable that take value from .user-items (our LI)
        const name = contact.getAttribute('data-name').toLowerCase();
        const phone = contact.getAttribute('data-phone').toLowerCase();

    //If element contain printed text on input area it removed class with style display: none;
    if (name.includes(filter) || phone.includes(filter)) {
      contact.classList.remove('displayNone')
    }
    else {
      contact.classList.add('displayNone')//if not display style change to displayNone
    }
  })
})
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


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
        
          if(confirm('You want to delete user?'))
          {
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
          }
        
            //In the end we call function that show our array
        showContactsList();
      }
    })
    }


//Create popup that show current information about the contact
function showInfoContact(){
   //Adding event click on ul area 
  contactsListElement.addEventListener('click', (e) =>{
      //Checking if area where target the user is a element with class info-img
      if (e.target.classList.contains('info-img')) {
        //if yes we save container what located near the target area
        const contactEL = e.target.closest('.user-items');
        //And also save attribute of this contact
        const contactID = +contactEL.getAttribute('data-id');
        //Created new variable that take value of object from array with same ID as contactID
        const elem = contacts.find(el => el.id == contactID)
      
        //Popup lines take the value of the contact the user clicked on
        document.querySelector('.current-user-name').textContent = elem.name;
        document.querySelector('.current-user-phone').textContent = elem.phone;
        document.querySelector('.current-user-age').textContent = elem.age; 
        document.querySelector('.current-user-address').textContent = elem.address;
        
        //Display the main popup
        generalPopup.style.display = 'block';

        //display the popup body. In this case is info popup
        document.querySelector('.info-form').style.display='block';
        }
      })
}


//Function that get to edit contact information
function editContact(){
   //Adding event click on ul area 
  contactsListElement.addEventListener('click', (e) =>{
      //Checking if area where target the user is a element with class edit-img
      if(e.target.classList.contains('edit-img')) {

              //Created new value that take elements from html.
              const editForm = document.querySelector('.edit-form');
              const saveBotton = editForm.querySelector('.save-botton');

              //if yes we save container what located near the target area
              const contactEL = e.target.closest('.user-items');
              //And also save attribute of this contact
              const contactID = +contactEL.getAttribute('data-id');
              //Created new variable that take value of object from array with same ID as contactID
              const elem = contacts.find(el => el.id == contactID )
              
              //Show the popup
              generalPopup.style.display ='block';
              editForm.style.display='block';

              //Open popup will be in personal data of the cintact in inputs
              editForm.querySelector('.popup-user-name').value = elem.name;
              editForm.querySelector('.popup-user-phone').value = elem.phone;
              editForm.querySelector('.popup-user-age').value = elem.age;
              editForm.querySelector('.popup-user-address').value = elem.address;
              editForm.querySelector('.popup-user-image').value = elem.imageUrl;

              
                      function saveEditChanging (e)  {
                      e.preventDefault();//for inputs
                      
                      //Conacts that we choosed in function that opened edit popup
                      //Saved new provided information 
                      elem.name = editForm.querySelector('.popup-user-name').value;
                      elem.phone = editForm.querySelector('.popup-user-phone').value;
                      elem.address = editForm.querySelector('.popup-user-address').value;
                      elem.age = editForm.querySelector('.popup-user-age').value;
                      elem.imageUrl = editForm.querySelector('.popup-user-image').value;
                      //Message
                      alert("Saved")
                      //Call two functions. Clean inputs liners from data and show contact to update showing information
                      cleanTheInputFormArea();
                      showContactsList();
                      closeAllPopup()
                      saveBotton.removeEventListener('click', saveEditChanging);
                    }

                    //Added event on click
                    saveBotton.addEventListener('click', saveEditChanging);
                    
                  }

         })
      }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function addNewContactToArray(){
//Added event on click on this element
addNewContact.addEventListener('click', () => {

  //Created new value that take value of html element
  const createForm = document.querySelector('.create-form')
  //Save botton from create-form
  const createSaveBotton = createForm.querySelector('.save-botton');

  //Show general popup, and form for creating contact 
  generalPopup.style.display ='block';
  createForm.style.display='block';

   //Created function
    const addSendData = (e) =>{
      e.preventDefault();//for inputs form

      //Created new variable that will take new value from inputs of creatForm
      const newContactName = createForm.querySelector('.popup-user-name').value;
      const newContactPhone = createForm.querySelector('.popup-user-phone').value;
      const newContactAddress = createForm.querySelector('.popup-user-address').value;
      const newContactAge = createForm.querySelector('.popup-user-age').value;
      const newContactImage = createForm.querySelector('.popup-user-image').value;

      //Check if inputs they are not empty
      if (!newContactName.trim() || !newContactPhone.trim() || !newContactAddress.trim() || !newContactAge.trim() || !newContactImage.trim()) {
        alert("All fields required!")//if one of them empty, show this message
      } else {
        //Of all good, create new object this provided data
        const newObj = {
            id: contacts.length + 1,
            name: newContactName,
            address: newContactAddress,
            age: newContactAge,
            phone: newContactPhone,
            imageUrl: newContactImage
    }
            //Add new object to our array
            contacts.push(newObj);
            alert("DONE")//Show message

            //Close popups
            generalPopup.style.display = 'none'
            createForm.style.display ='none';

            //call function that cleane the inputs area
            cleanTheInputFormArea();
            //call show contact for update our contact list
            showContactsList();
            closeAllPopup()
            createSaveBotton.removeEventListener('click',addSendData);
    }
}//close thw function addSendData

//Added event click to our save botton and call the function addSendData
createSaveBotton.addEventListener('click',addSendData);

})
}


function hidePopupByClickOnClose(){
//The event on click on close popup botton. This click will close all opened popups
  closeGeneralPopup.addEventListener('click', () => {
    generalPopup.style.display = 'none';
    document.querySelector('.info-form').style.display ='none';
    document.querySelector('.create-form').style.display ='none';
    document.querySelector('.edit-form').style.display ='none';
  })
}


  function closeAllPopup(){
    generalPopup.style.display = 'none';
    document.querySelector('.info-form').style.display ='none';
    document.querySelector('.create-form').style.display ='none';
    document.querySelector('.edit-form').style.display ='none';
}

//Create function for clear input area
function cleanTheInputFormArea()
{
  contactName.value="";
  contactPhone.value="";
  contactAddress.value="";
  contactAge.value="";
  contactImageURL.value="";
}
  
  
function userAreaColorChanging(){
          contactsListElement.addEventListener('mouseover', (e) =>{
            const contactLI = e.target.closest('.user-items')
            if(contactLI){
              contactLI.classList.add('userItems-colorchanging')
            }
        })
          contactsListElement.addEventListener('mouseout', (e) =>{
            const contactLI = e.target.closest('.user-items')
            if(contactLI){
              contactLI.classList.remove('userItems-colorchanging')
            }
          })
        }

