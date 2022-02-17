// @ts-nocheck
const express = require('express');;
const ws = require('ws');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

const port = process.env.PORT ?? 3000;

const httpServer = app.listen(port, () => {
  console.log('Server started at: http://localhost:%s', port);
});

const wsServer = new ws.WebSocketServer({
  server: httpServer,
});

// EventEmitter  Эхо сервер для одного клиента
// wsServer.on('connection', (client) => { // on('connection' - когда присоединился клиент
//   console.log('>>>> client connected <<<<<');
//   client.on('message', (data) => { // client.on('message') - дожидаемся от клиента сообщений (прилетает дата)
//     console.log('>>client send message<<', data.toString('utf-8'));
//     client.send(data); // отправляет сообщение обратоно
//   });
// });


// EventEmitter Эхо сервер для многих клиентов
wsServer.on('connection', (currentClient) => {

  console.log('>>>> client connected. clients: ',  wsServer.clients.size); // wsServer.clients -  итерируемый обьект Set
  // https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Set

  currentClient.on('message', (data) => {
    const message = data.toString('utf-8')
    console.log('>>> send messages to all clients', message);
    wsServer.clients.forEach((client) => {
      client.send(message);
    });
  });

  currentClient.on('close', (client) => {
    console.log('>>>> client disconnected. clients: ',  wsServer.clients.size);
  });
});
