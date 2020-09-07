const router = require('express').Router();
const File = require('../models/file');

router.get('/api/files', async (req, res) => {
    try{
        return res.render('home');

    } catch(err){
        return res.render('home', {error: 'Something went wrong'});
    }
    
})


module.exports = router; 