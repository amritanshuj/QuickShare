const router = require('express').Router();
const File = require('../models/file');

router.get('/', async (req, res) => {
    try{
        return res.render('home', {
            file: File
        });

    } catch(err){
        return res.render('home', {error: 'Something went wrong'});
    }
    
})


module.exports = router; 