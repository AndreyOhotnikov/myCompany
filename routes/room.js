const router = require('express').Router();

const {
//   renderAllWays,
//   renderSortAllWays,
//   commentDelete,
  renderNewMessage,
renderFormNewRoom,
//   renderFormEditWay,
//   editWay,
  createNewRoom,
//   deleteWay, 
  renderFormInfoRoom
} = require('../controllers/roomControllers');

// const { isRedactor } = require('../middleWares/isRedactor')
const { isAuth } = require('../middleWares/isAuth')

// router.get('/', isAuth, renderAllWays);

// router.get('/sort/:id', isAuth, renderSortAllWays);

// router.delete('/comment/delete/:id', isAuth, isRedactor, commentDelete)

router.post('/message', isAuth, renderNewMessage)

router.get('/new', isAuth, renderFormNewRoom)
router.post('/new', isAuth, createNewRoom)
// router.route('/edit/:id')
//         .get( isAuth, isRedactor, renderFormEditWay)
//         .put( editWay)

// router.post('/new/add', isAuth, createNewWay)

// router.get('/delete/:id',isAuth, isRedactor,  deleteWay)

router.get('/:id',isAuth, renderFormInfoRoom)



module.exports = router;
