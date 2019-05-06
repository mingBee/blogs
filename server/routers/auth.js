const auth=require('../controllers/user')
const router= require('koa-router')()

router.get('/user/:id',auth.getUserById);
router.post('/user',auth.postUserAuth);
router.post('/user/regist',auth.postCreateUser);

module.exports=router;