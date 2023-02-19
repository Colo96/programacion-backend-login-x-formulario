const { Router } = require('express');
const auth = require('../../middlewares/auth.middleware');
const sessionUser = require('../../middlewares/sessions.middleware');
const router = Router();
const usersModel = require('../../models/users.models');

router.get('/', sessionUser, async (req, res) => {
    const admin = await usersModel.findOne({ email: 'adminCoder@coder.com', password: 'adminCod3r123' });
    if (!admin) {
        await usersModel.create({
            first_name: 'Admin',
            last_name: 'Istrador',
            age: 30,
            email: 'adminCoder@coder.com',
            password: 'adminCod3r123',
            rol: 'admin'
        });
    }
    res.render('login');
});

router.get('/register', sessionUser, async (req, res) => {
    res.render('register');
});

router.get('/profile', auth, async (req, res) => {
    const user = await req.session.user;
    res.render('profile', { user });
});

module.exports = router;