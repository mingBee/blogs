import todoList from '../controllers/todoList'

import koa_router from 'koa-router'

const router = koa_router();

router.get('/getAll',todoList.findAll);
router.post('/create',todoList.create);
router.get('/del/:id',todoList.del);
router.post('/finish',todoList.finish);
router.post('/restore',todoList.restore);

module.exports=router;
