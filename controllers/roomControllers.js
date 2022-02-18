const router = require('express').Router();
const {Room, User, UserInfo, Message} = require('../db/models/');
// const {sortWays, sortRating, sortDistance } = require('../middleWares/sortWays');
// const {ratingController} = require('./ratingController');

require('dotenv').config();

// exports.renderAllWays = async (req, res, next) => {
//   let ways, ways1, userlogIn;
//   try {
//     userlogIn = await User.findOne({where: {name: res.locals?.username}, raw: true});
//     ways1 = await Way.findAll({order:[['id', 'DESC']], raw: true});
//     ways = await ratingController(ways1);
//   } catch (error) {
//     return res.render('error', {message: 'Не удалось не удалось подключиться к базе данных.',  error: {}});
//   }
//   return res.render('index', { ways, userlogIn });
// }
// exports.renderSortAllWays =  async (req, res) => {
//   let ways, ways1, userlogIn;
//   try {
//     userlogIn = await User.findOne({where: {name: res.locals?.username}, raw: true});
//     ways1 = await sortWays(req.params.id);
//     ways = await ratingController(ways1);
    
//     if(req.params?.id == 1) ways = sortRating(ways);
//     if(req.params?.id == 3) ways = sortDistance(ways);
    
//   } catch (error) {
//     return res.render('error', {message: 'Не удалось не удалось подключиться к базе данных.',  error: {}});

//   }
//   return res.json({ ways, userlogIn });
// }

// exports.commentDelete = async (req, res) => {
//   let delet;
//   try {
//       delet = await Comment.destroy({where:{id:req.params.id}});
//   } catch (error) {
//     return res.render('error', {message: 'Не удалось удалить комментарий из базы данных.',  error: {}});
//   }
//   return res.json({delet});

// }

exports.renderNewMessage =  async (req, res) => {
  let newMessage, userlogIn, newRating;
  console.log(req.body)
  try {
    userlogIn = await User.findOne({ where: { id: req.session.user.id }, raw: true });

    if (req.body.coord) {
      newMessage = await Message.create({ text: req.body.message, user_id: userlogIn.id, room_id: req.body.room_id, coord: true},{returning: true,plain: true, raw: true});
    } else newMessage = await Message.create({ text: req.body.message, user_id: userlogIn.id, room_id: req.body.room_id},{returning: true,plain: true, raw: true});
    // // newRating = Number((comment.reduce((acc, el) => acc+= el.rating, 0) / comment.length).toFixed(2)) || 0; //'рейтинг отсутствует';
    // newMessage.dataValues.username = user.name;
    console.log('-----------------------------------11', newMessage)
    
    return res.json({ newMessage, userlogIn });
  } catch (error) {
    return res.json({ isUpdateSuccessful: false, errorMessage: 'Не удалось обновить запись в базе данных.' });
  }
}

exports.renderFormNewRoom =  (req, res) => res.render('newRoad');

// exports.renderFormEditWay = async (req, res) => {
//   let userlogIn, way;
//   try {
//     userlogIn = await User.findOne({
//       where: {name: res.locals?.username},
//       include: [{
//         model: UserInfo,
//         attributes: ['role']
//       }],
//        raw: true
//       })
//     way = await Way.findOne({where: {id: req.params?.id}, raw: true});
//     if (userlogIn.id === way.user_id || userlogIn['UserInfo.role'] === 'admin'  || userlogIn.name === 'admin835') userlogIn.isEditor = true;
//     else res.render('error', {message: 'Нет прав для редактирования записи',  error: {}});
//   } catch (error) {
//     return res.render('error', {message: 'Не удалось не удалось подключиться к базе данных.',  error: {}});
//   }
//   return res.render(`newRoad`, {way, userlogIn});
// }
// exports.editWay =  async (req, res) => {
//   let userlogIn, way;
//   try {
//     userlogIn = await User.findOne({where: {name: res.locals?.username}, raw: true  });
//     way = await Way.update({
//                               title: req.body.wayTitle,  
//                               body: req.body.wayText, 
//                               city: req.body.wayCity,
//                               user_id: userlogIn.id,
//                               distance: req.body.distance,
//                               xy_start: req.body.xy1.join('_'),
//                               xy_end: req.body.xy2.join('_'),
//                               url_img: req.body.wayImage,
//                             }, { where: {id: req.body.id} }, { returning: true, plain: true });

//   } catch (error) {
//     return res.render('error', {message: 'Не удалось не удалось подключиться к базе данных.',  error: {}});  }
//   res.json({way});
// }

exports.createNewRoom =  async (req, res) => {
  let newRoom, userlogIn;
  // console.log('-----------------------------------1')
  try {
    userlogIn = await User.findOne({ where: { id: req.session.user.id }, raw: true });
    // console.log('-----------------------------------2')

    newRoom = await Room.create({ title: req.body.roomTitle,  
                                body: req.body.wayText, 
                                city: req.body.roomCity,
                                user_id: userlogIn.id,
                                // url_img: req.body.roomImage,
                              }, { returning: true, plain: true });
                              // console.log('-----------------------------------3')

  } catch (error) {
    return res.render('error', {message: 'Не удалось не удалось подключиться к базе данных.',  error: {}});
  }
  res.json({newRoom});
}
// 
// exports.deleteWay =  async (req, res) => {
//   try {
//      await Way.destroy({where:{id : req.params.id}});
//   } catch (error) {
//     return res.render('error', {message: 'Не удалось не удалось подключиться к базе данных.',  error: {}});  }
//   return res.redirect('/ways');
// }

exports.renderFormInfoRoom =  async (req, res) => {
  let room, message, userlogIn, key2;
  // console.log('------------------------------------------1')
  try {
    userlogIn = await User.findOne({where: {id: req.session.user.id}, raw: true});
    room = await Room.findOne({where:{id:req.params.id}, raw: true});
    // console.log('------------------------------------------2', room)
    message = await Message.findAll({where:{room_id: room.id}, order:[['id', 'DESC']], include: [{model: User, attribute: ['name']}], raw: true});
    // // way.rating = Number((comment.reduce((acc, el) => acc += el.rating, 0) / comment.length).toFixed(2)) || 0 //'рейтинг отсутствует';
    // // way.nameUser = way['User.name']

    message.forEach(el => {
    //   // if (el.user_id === userlogIn.id || userlogIn['UserInfo.role'] === 'admin'  || userlogIn.name === 'admin835') el.isGrantDelComm = true;
      el.name = el['User.name'];
      return el;
    })
    // console.log('------------------------------------------3', message)
    key2 = {api: process.env.API}
  } catch (error) {
    return res.render('error', {message: 'Не удалось не удалось подключиться к базе данных.',  error: {}});
  }
  // comment.forEach(el => el.nameUser = el['User.name']);
  // if (userlogIn.id === way.user_id || userlogIn['UserInfo.role'] === 'admin'  || userlogIn.name === 'admin835') userlogIn.isEditor = true;
  return res.render('infoRoad', { room, message, userlogIn, key2 });
}

