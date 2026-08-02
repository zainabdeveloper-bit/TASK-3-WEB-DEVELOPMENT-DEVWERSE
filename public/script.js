let editId = null;
// Backend API URL
const API_URL = "http://localhost:3000/contacts";


// =======================
// GET ALL CONTACTS
// =======================
async function getContacts() {

    const response = await fetch(API_URL);

    const contacts = await response.json();

    const contactList = document.getElementById("contactList");

    contactList.innerHTML = "";

    contacts.forEach((contact) => {

        contactList.innerHTML += `
            <div class="contact-card">

                <h3>${contact.name}</h3>

                <p>Phone: ${contact.phone}</p>

                <p>Email: ${contact.email}</p>

                <button class="delete-btn" onclick="deleteContact(${contact.id})">
                    Delete
                </button>
                <button onclick="editContact(${contact.id})">
    Edit
</button>

            </div>
        `;

    });
}



// =======================
// ADD NEW CONTACT
// =======================
async function addContact() {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;


    const newContact = {
        name: name,
        phone: phone,
        email: email
    };


    await fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(newContact)

    });


    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";


    // Refresh contacts list
    getContacts();

}

// DELETE CONTACT

async function deleteContact(id) {


    await fetch(`${API_URL}/${id}`, {

        method: "DELETE"

    });


    getContacts();

}



// Load contacts when page opens
getContacts();
// =======================
// UPDATE CONTACT
// =======================
// =======================
// LOAD CONTACT FOR EDIT
// =======================

async function editContact(id) {

    const response = await fetch(`${API_URL}/${id}`);

    const contact = await response.json();


    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    document.getElementById("email").value = contact.email;


    editId = id;


    document.getElementById("addBtn").style.display = "none";
    document.getElementById("updateBtn").style.display = "block";

}

async function updateContact() {


    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;


    const updatedContact = {
        name,
        phone,
        email
    };


    await fetch(`${API_URL}/${editId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(updatedContact)

    });


    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";


    document.getElementById("addBtn").style.display = "block";
    document.getElementById("updateBtn").style.display = "none";


    editId = null;


    getContacts();

}
