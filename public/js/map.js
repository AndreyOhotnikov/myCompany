
// AIzaSyDxPuCehSdoeYqwK9Qc_90ZDXyn_joOgr4


// const ws = new WebSocket(window.location.href.replace(/^http/, 'ws'));

let map, infoWindow;

function initMap() {

  console.log(545646)
  const ULULU = { lat: 55, lng: 37 }; // наша метка
  const ULULU2 = { lat: 55, lng: 38 };
    // The map, centered at Uluru
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: ULULU,
      mapTypeId: 'hybrid'
    });
    // ///////////////////////////////////////////////// работа с массивом координат
  infoWindow = new google.maps.InfoWindow({
  });
  // const directionsRenderer = new google.maps.DirectionsRenderer({
  //   draggable: true,
  //   map,
  //   panel: document.getElementById("panel"),
  // });
  // directionsRenderer.setMap(map);
  // const directionsService = new google.maps.DirectionsService();
  // calculateAndDisplayRoute(directionsService, directionsRenderer);
  // document.getElementById("mode").addEventListener("change", () => {
  //   calculateAndDisplayRoute(directionsService, directionsRenderer);
  // });
  // directionsRenderer.addListener("directions_changed", () => {
  //   const directions = directionsRenderer.getDirections();

  //   if (directions) {
  //     computeTotalDistance(directions);
  //   }
  // });
  
  // const marker = new google.maps.Marker({
  //   position: ULULU,
  //   map: map,
  //   draggable: true

  // });
  // marker.addListener("click", () => {
  //     infoWindow.setContent('6848665468431831543843511341');
  //     infoWindow.open(map, marker);
  //   });
// //////////////////////////////////////////////// Cоздание маркера
  map.addListener("click", (e) => {
    console.log(e)
      placeMarkerAndPanTo(e.latLng, map);
    });
// ////////////////////////////////////////////////////// добавление маркера
    // google.maps.event.addListener(map, "click", (event) => {
    //   addMarker(event.latLng, map);
    // });
    // // Add a marker at the center of the map.
    // addMarker(bangalore, map);
// https://developers.google.com/maps/documentation/javascript/examples/event-click-latlng Получение широты / долготы из события клика 

// https://developers.google.com/maps/documentation/javascript/examples/event-simple  центрирует карту через 3 секунды на маркее
// https://developers.google.com/maps/documentation/javascript/examples/event-poi маршрут + клик на точку
// https://developers.google.com/maps/documentation/javascript/examples/directions-travel-modes Режимы движения в направлениях (выбор средства передвижения)
// https://developers.google.com/maps/documentation/javascript/examples/directions-draggable Перетскивание путей (по удерживанию клавиши)
// https://developers.google.com/maps/documentation/javascript/examples/marker-animations - перетаскивание маркеров
   // ///////////////////////////////////////////////// работа с массивом координат
// const bounds = {
//   north: -25.363882,
//   south: -31.203405,
//   east: 131.044922,
//   west: 125.244141,
// };

// // Display the area between the location southWest and northEast.
// map.fitBounds(bounds);

// // Add 5 markers to map at random locations.
// // For each of these markers, give them a title with their index, and when
// // they are clicked they should open an infowindow with text from a secret
// // message.
// const secretMessages = ["This", "is", "the", "secret", "message"];
// const lngSpan = bounds.east - bounds.west;
// const latSpan = bounds.north - bounds.south;

// for (let i = 0; i < secretMessages.length; ++i) {
//   const marker = new google.maps.Marker({
//     position: {
//       lat: bounds.south + latSpan * Math.random(),
//       lng: bounds.west + lngSpan * Math.random(),
//     },
//     map: map,
//   });

//   attachSecretMessage(marker, secretMessages[i]);
// }


// Attaches an info window to a marker with the provided message. When the
// marker is clicked, the info window will open with the secret message.


// /////////////////////////////////////////////////////////////////// геолокация
  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          return pos
          console.log(pos) // получаем свое местоположение !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
        );
        
        // console.log(pos)
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function getMyPosition () {
  const locationButton = document.createElement("button");
let pos;
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  // map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  // locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          
          infoWindow.setPosition(pos);
          // infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
          console.log(pos) // получаем свое местоположение !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
          return pos
        },
        () => {
          // handleLocationError(true, infoWindow, map.getCenter());
        }
        );
        
        // console.log(pos)
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
    }
    console.log('navigator.geolocation', navigator.geolocation)
    console.log('navigator.geolocation2', pos)

  // });
}








function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
  console.log(pos)

}
// /////////////////////////////////////////////////////////////////// геолокация
   // ///////////////////////////////////////////////// работа с массивом координат
// function attachSecretMessage(marker, secretMessage) {
//   const infowindow = new google.maps.InfoWindow({
//     content: secretMessage,
//   });

//   marker.addListener("click", () => {
//     infowindow.open(marker.get("map"), marker);
//   });
// }
   // ///////////////////////////////////////////////// работа с массивом координат

// function coll

   // Cоздание кликабельного маркера 
   function placeMarkerAndPanTo(latLng, map) {
   //  function placeMarkerAndPanTo(latLng, map) {
    const marker = new google.maps.Marker({
      position: latLng, // можно передавать координаты в виде обьекта {lat: 55.9642736, lng: 37.9065324}
      map: map,
    });
    // console.log(latLng)
    map.panTo(latLng); // можно передавать координаты в виде обьекта {lat: 55.9642736, lng: 37.9065324}
    marker.addListener("click", () => {
      // console.log(latLng)
      infoWindow.setContent('latLng'); // сюда можно вставить конечную точку
      infoWindow.open(map, marker);
      const coordPoint = infoWindow.map.mapUrl.slice(infoWindow.map.mapUrl.indexOf('=') + 1, infoWindow.map.mapUrl.indexOf('&')).split(',')
      const coordPointInObject = {lat: Number(coordPoint[0]), lng: Number(coordPoint[1])}
      console.log(coordPointInObject) // получаем координаты в виде обьекта {lat: 55.9642736, lng: 37.9065324}
      setTimeout(() => {
        const window = [...document.getElementsByClassName ('gm-style-iw-d')]
        // console.log(infoWindow)
        // console.log(window[0].innerHTML)// получаем текст из описания
        window[0].innerHTML += `<button id="btnSendCoord">отправить<br>координаты</button> <button id="btnGo">Проложить<br>маршрут</button>`
        const btnSendCoord = document.getElementById('btnSendCoord')
        const btnGo = document.getElementById('btnGo')
        //////////////////////////////////////////////////////// здесь отправляем координаты
        btnSendCoord.addEventListener('click', async () => {
          console.log('Координаты отправлены', coordPointInObject)
          // console.log('Координаты отправлены', window[0].innerText.slice(0, window[0].innerText.indexOf(`\nа b`)))
                            const containerChat2 = [...document.getElementsByClassName('containerChat2')];
                            const roomTitle = [...document.getElementsByClassName('roomTitle')];

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
                              ws.send(JSON.stringify(coordPointInObject));
                              inpSendMess.value = ''
                              containerChat2[0].innerHTML = `<div class="massageSend"   id="${this.id}">
                              <h3 ><b>${this.name}</b></h3><br>
                                ${this.text}       
                              </div>` + containerChat2[0].innerHTML;

        })
        btnGo.addEventListener('click', () => {
          // console.log('Маршрут прокладывается', window[0].innerText.slice(0, window[0].innerText.indexOf(`\nа b`)))
          // calculateAndDisplayRoute(directionsService, directionsRenderer)
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const directionsRenderer = new google.maps.DirectionsRenderer({
                draggable: true,
                map,
                panel: document.getElementById("panel"),
              });
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              
              infoWindow.setPosition(pos);
              // infoWindow.setContent("Location found.");
              infoWindow.open(map);
              map.setCenter(pos);
              console.log(pos) // получаем свое местоположение !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
              console.log('Маршрут прокладывается', coordPointInObject)
              directionsRenderer.setMap(map);
              const directionsService = new google.maps.DirectionsService();
              const mode = document.getElementById("mode")
              console.log(mode)
              calculateAndDisplayRoute(directionsService, directionsRenderer, pos, coordPointInObject);
              mode.addEventListener("change", () => {
                calculateAndDisplayRoute(directionsService, directionsRenderer, pos, coordPointInObject);
              });
              directionsRenderer.addListener("directions_changed", () => {
                const directions = directionsRenderer.getDirections();
            
                if (directions) {
                  computeTotalDistance(directions);
                }
              });
   
            },
            () => {
              // handleLocationError(true, infoWindow, map.getCenter());
            }
            );
          // console.log('---------------', pos)
        })


      }, 500)
    });
  }
  
  // const containerChat2 = [...document.getElementsByClassName('containerChat2')];
  // const roomTitle = [...document.getElementsByClassName('roomTitle')];

  //   const response = await fetch('/room/message', {
  //     method: "POST",
  //     credentials: 'include',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({message : inpSendMess.value, room_id: roomTitle[0].id, coord: false})
  //   });
  //   const {newMessage, userlogIn} = await response.json();
  //   console.log(newMessage, userlogIn)
  //   inpSendMess.value = ''
  //   containerChat2[0].innerHTML = `<div class="massageSend"   id="${this.id}">
  //   <h3 ><b>${this.name}</b></h3><br>
  //     ${this.text}       
  //   </div>` + containerChat2[0].innerHTML;
  















  // ////////////////////////////////////////////////////// добавление маркера

  function calculateAndDisplayRoute(directionsService, directionsRenderer, pos, coordPointInObject) { // путь по нью йорку, сделать вызов по клику и передавать в аргументах маркер и местоположение
    const selectedMode = document.getElementById("mode").value;
    console.log(google.maps.TravelMode[selectedMode], selectedMode)
    directionsService 
      .route({
        origin: pos,
        destination: coordPointInObject,
        travelMode: google.maps.TravelMode[selectedMode],
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
      })
      .catch((e) => window.alert("Directions request failed due to " + status));
  }

  function computeTotalDistance(result) {
    const myroute = result.routes[0];
    
    if (!myroute) return;
    
    let total = myroute.legs.reduce((acc, dist) => acc += dist.distance.value, 0) ||  0;
    if (total < 1000) document.getElementById("total").innerHTML = total + " м";
    else document.getElementById("total").innerHTML = (total / 1000).toFixed(2) + " км";
    
  }


// 55555555555
// 666666666666
// 777777777777
// 8888888888888
// 9999999999999
