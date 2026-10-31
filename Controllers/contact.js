import { Contact } from "../Models/Contact.js";

// get all contact.
export const getAllContact = async (req, res) => {
    const userContact = await Contact.find();

    if (!userContact) return res.json({ message: "contact not found", sucess: "false" });

    res.json({ message: "all contact fatched", userContact, sucess: true });
}

// create new contact.
export const newContact = async (req, res) => {
    const { name, email, phone, type } = req.body;
    if (name == "" || email == "" || phone == "" || type == "")
        return res.json({ message: "all fields are required", sucess: false })

    let saveContact = await Contact.create({
        name, email, phone, type, user: req.user
    })
    res.json({ message: "contact saved sucessfully", saveContact, sucess: true })
}

// update contact by id.
export const updateContactById = async (req, res) => {
    const id = req.params.id
    const { name, email, phone, type } = req.body;

    let updateContact = await Contact.findByIdAndUpdate(id,
        { name, email, phone, type },
        { new: true }
    );
    if (!updateContact) return res.json({ message: "data not exist", sucess: false })

    res.json({ message: "contact updated sucessfully", updateContact, sucess: true })
};

// delete contact by id.
export const deleteContactById = async (req, res) => {
    const id = req.params.id
    let deleteContact = await Contact.findByIdAndDelete(id,);

    if (!deleteContact) return res.json({ message: "contact not exist", sucess: false })

    res.json({ message: "contact deleted  sucessfully", deleteContact, sucess: true })
};

// get contact by id.
export const getContactById = async (req, res) => {
    const id = req.params.id

    const userContact = await Contact.findById(id)
    if (!userContact) return res.json({ message: "contact not found", sucess: false })

    res.json({ message: "contact fatched", userContact, sucess: true })
}

// get contact by user id.
export const getContactByUserId = async (req, res) => {
    const id = req.params.id

    const userContact = await Contact.find({ user: id })
    if (!userContact) return res.json({ message: "contact not found", sucess: false })

    res.json({ message: "user specific contact fatched", userContact, sucess: true })
}