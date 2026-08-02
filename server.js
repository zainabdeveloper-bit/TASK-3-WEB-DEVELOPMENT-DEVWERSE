const express = require("express");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Temporary storage (data is lost when server restarts)
let contacts = [];
let nextId = 1;

// =======================
// // GET All Contacts
// =======================
app.get("/", (req, res) => {
    res.send("Welcome to Contacts API");
});
app.get("/contacts", (req, res) => {
    res.json(contacts);
});

// =======================
// // GET Single Contact
// =======================
app.get("/contacts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const contact = contacts.find((c) => c.id === id);

    if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
    }

    res.json(contact);
});

// =======================
// // CREATE Contact
// =======================
app.post("/contacts", (req, res) => {
    const { name, phone, email } = req.body;

    if (!name || !phone || !email) {
        return res
            .status(400)
            .json({ error: "Name, phone and email are required." });
    }

    const newContact = {
        id: nextId++,
        name,
        phone,
        email,
    };

    contacts.push(newContact);

    res.status(201).json(newContact);
});

// =======================
// UPDATE Contacts
// =======================
app.put("/contacts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const { name, phone, email } = req.body;

    const contact = contacts.find((c) => c.id === id);

    if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
    }

    if (name !== undefined) {
    contact.name = name;
}
    

    if (phone !== undefined) {
    contact.phone = phone;
}

if (email !== undefined) {
    contact.email = email;
}

    res.json(contact);
});

// =======================
// DELETE Contact
// =======================
app.delete("/contacts/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = contacts.findIndex((c) => c.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "Contact not found" });
    }

    contacts.splice(index, 1);

    res.json({
        message: "Contact deleted successfully",
    });
});

// =======================
// Start Server
// =======================
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Contacts API running at http://localhost:${PORT}`);
});

setInterval(() => {}, 1000);