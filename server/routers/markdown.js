import markdown from '../controllers/markdown'

import koa_router from 'koa-router'

const router = koa_router();

router.get('/getById/:id',markdown.getMarkdownById);
router.get('/getByType/:type',markdown.getMarkdownByType);
router.get('/del/:id',markdown.del);
router.get('/getByUser/:user_id',markdown.getMarkdownByUser);
router.post('/create',markdown.create);

module.exports=router;