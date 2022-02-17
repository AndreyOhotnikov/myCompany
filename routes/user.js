// const {sortWays, sortRating} = require('../middleWares/sortWays')
// const {ratingController} = require('../controllers/ratingController') // 1111

const express = require('express');
// const { userInfo } = require('os');
const {
  checkUserAndCreateSession,
  createUserAndSession, destroySession,
  isValid,
  renderSignInForm,
  renderSignUpForm,
  // renderFormEditUser,
  // editUserProfile,
  // renderUserProfile,
  // EditIsAdmin
  // renderProfile
} = require('../controllers/userControllers');

// const { isAdmin } = require('../middleWares/isAdmin')
// const { isAuth } = require('../middleWares/isAuth')
// const { isRedactorProfile } = require('../middleWares/isRedactor')
const router = express.Router();
const {Room, User, UserInfo} = require('../db/models/');





router
  .route('/signup')
  // Страница регистрации пользователя
  .get(renderSignUpForm)
  // Регистрация пользователя
  .post(isValid,  createUserAndSession);

router
  .route('/signin')
  // Страница аутентификации пользователя
  .get(renderSignInForm)
  // Аутентификация пользователя
  .post(checkUserAndCreateSession);

router.get('/signout', destroySession);
router.get('/hello', async (req, res) => {
  let userlogIn;
  try {
        userlogIn = await User.findOne({
          where: {id: req.session.user.id},
          raw: true
          });
  // console.log('----------------------------------3')
  } catch (error) {
    return res.render('error',{ message: 'user router.get(/:id - Не получить данный из базы даных.' });
  }
  res.render('infoMessage', {userlogIn});
})

router.get('/profile/:id', async (req, res) => {
  console.log('----------------------------------1')

  let user, userlogIn, rooms;
  try {
     user = await User.findOne({
            where: {id: req.params?.id || req.session.user.id},
            include: [{
              model: UserInfo,
              attributes: ['fullname', 'age', 'city', 'about_me', 'role']
            }],
             raw: true
            });
            console.log('----------------------------------2')

            userlogIn = await User.findOne({
              where: {id: req.session.user.id},
              include: [{
                model: UserInfo,
                attributes: ['role'] 
              }],
              raw: true
              });
              rooms = await Room.findAll({ raw:true})
              console.log('----------------------------------3', rooms)
            // const ways1 = await Way.findAll({order:[['id', 'DESC']], where: {user_id: user.id}, raw: true});
          return res.render('userProfile', {user, rooms});
        } catch (error) {
          return res.render('error',{ message: 'user router.get(/:id - Не получить данный из базы даных.' });
        }
})
// router
//   .route('/edit/:id')                          //  1111 роутер перенаправлен
//   // Генерация страницы, редактирования профиля
//   .get(isAuth, isRedactorProfile, renderFormEditUser)
//   // Получение данных - редактирования профиля
//   .put(editUserProfile);

// router
//   .route('/admin/:id')
//   // редактирование прав админа
//   .put(isAdmin, EditIsAdmin);
  
// router
//   .route('/:id')
//   // Генерация формы информации о пользователе
//   .get(isAuth, renderUserProfile);

router.get('/', async (req, res) => {
  res.redirect('/') // если не введены данные то редиректим на главную страницу
})

module.exports = router;



