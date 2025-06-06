const express = require('express');
const router=express.Router();
const demoController=require('../Controller/DemoController');


router.post('/demo',demoController.demoapp);
router.get('/demo',demoController.demoappget);
router.get('/demo/:id',demoController.getdemoid);
router.put('/demo/:id',demoController.demoUpdate);
router.delete('/demo/:id',demoController.demoDelete);
router.post('/logindemo',demoController.logindemo);
router.post('/forgot',demoController.forgotPassword);
router.post('/reset-password',demoController.resetPassword);

module.exports=router;