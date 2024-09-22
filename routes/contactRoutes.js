const express = require('express');
const router = express.Router();
const { getContacts, addContact, updateContact, deleteContact } = require('../controllers/contactController');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/', authMiddleware, getContacts);
router.post('/', authMiddleware, addContact);
router.put('/:id', authMiddleware, updateContact);
router.delete('/:id', authMiddleware, deleteContact);

module.exports = router;