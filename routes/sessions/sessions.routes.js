const { Router } = require('express');
const router = Router();
const usersModel = require('../../models/users.models');

router.post('/register', async (req, res) => {
    const { name, lastname, age, email, password } = req.body;
    if (!name || !lastname || !age || !email || !password) {
        res.json({
            status: 'error',
            payload: 'Data is required'
        });
    } else {
        const user = await usersModel.create({
            first_name: name,
            last_name: lastname,
            age: age,
            email: email,
            password: password
        });
        req.session.user = user;
        res.redirect('/profile');
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await usersModel.findOne({ email: email });
    if (!user || user.password !== password) {
        return res.status(400).json({ error: 'ERROR' });
    }
    req.session.user = user;
    res.redirect('/profile');
});

router.get('/logout', async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.json({ error: 'ERROR' });
        }
        res.redirect('/');
    });
});

module.exports = router;