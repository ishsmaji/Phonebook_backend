const Contact = require('../models/Contact');

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.addContact = async (req, res) => {
  try {
    const { name, phone, address } = req.body;
    const newContact = new Contact({ name, phone, address, user: req.user.id });
    const contact = await newContact.save();
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { name, phone , address } = req.body;
    let contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });
    if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    contact = await Contact.findByIdAndUpdate(req.params.id, { name, phone,address, }, { new: true });
    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Contact not found' });
    if (contact.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};