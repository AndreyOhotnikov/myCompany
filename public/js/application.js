let infoBtn = [...document.getElementsByClassName('btnInfo')];
const ws = new WebSocket(window.location.href.replace(/^http/, 'ws'));

infoBtn?.forEach((el,index) => {
  el.addEventListener('click', () => {
    window.location = `/room/${el.id}`;
  });
});

function deletRoom() {
  const delRoom = [...document.getElementsByClassName('btnDelet')];
  const commentList = [...document.getElementsByClassName('commentList')];
  delRoom.forEach((del, ind) => {
    del.addEventListener('click', async (event) => {
      event.preventDefault();
      const response = await fetch(`/room/${del.id}`, {
        method: "DELETE",
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
       });
      const {delet} = await response.json();
      if (delet) commentList[ind].parentNode.removeChild(commentList[ind]);
      deletRoom();
    });
  });
}
deletRoom()


const btnNewWay = [...document.getElementsByClassName('btnNewWay')];
btnNewWay[0]?.addEventListener('click', () => {
  createEntryesWay();
})

async function createEntryesWay() {
  const dataNewRoom = {
    roomTitle: wayTitle.value,
    roomCity: wayCity.value,
    roomImage: wayImage.value,
    roomText: wayText.value,
    
    // distance: distance[0]?.textContent || 0
  }
  console.log(dataNewRoom)
  const response = await fetch('/room/new', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataNewRoom)
  });
  const {newRoom} = await response.json();
  window.location = `/room/${newRoom.id}`;
}



{/* <input type="text" id="inpSendMess"> <button id="btnSendMess">Отправить сообщение</button> */}

const inpSendMess = document.getElementById('inpSendMess')
const btnSendMess = document.getElementById('btnSendMess')
const containerChat2 = [...document.getElementsByClassName('containerChat2')];
const roomTitle = [...document.getElementsByClassName('roomTitle')];


btnSendMess.addEventListener('click', async () => {
  // console.log(inpSendMess.value)
  const ws = new WebSocket(window.location.href.replace(/^http/, 'ws'));

  const response = await fetch('/room/message', {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({message : inpSendMess.value, room_id: roomTitle[0].id, coord: false})
  });
  const {newMessage, userlogIn} = await response.json();
  console.log(newMessage, userlogIn)
  // ws.send(JSON.stringify({message : inpSendMess.value, room_id: roomTitle[0].id, coord: false}))
  inpSendMess.value = ''
  containerChat2[0].innerHTML = `<div class="massageSend"   id="${newMessage.id}">
    <h3 ></h3><b>${userlogIn.name} Имя пользователя</b></h3><br>
    ${newMessage.text}
    </div>` + containerChat2[0].innerHTML;
})

// ws.onopen = () => {
//   // sendForm.sendButton.disabled = false;
// };


// ws.onmessage = (event) => {
//   const { nickname, message } = JSON.parse(event.data);
//   console.log(nickname, message)
//   containerChat2[0].innerHTML = `<div class="massageSend"   id="${newMessage.id}">
//     <h3 ></h3><b>${userlogIn.name} Имя пользователя</b></h3><br>
//     ${newMessage.text}
//     </div>` + containerChat2[0].innerHTML;
//   // messages.insertAdjacentHTML('beforeend', template(nickname, message));
// };

// ws.onclose = () => {
//  console.log('ws socket closed...')
// }

