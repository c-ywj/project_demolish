$(() => {

  

});


//   const getMenu = () => {
//     $.ajax({
//       method: 'GET',
//       url: '/menu'
//     })
//     .then((menu_items) => {
//       loadMenuItems(menu_items);
//     })
//     .catch(() => {
//       console.error('There was an error in loading the menu...');
//     })
//   };

//   // load menu on document ready
//   getMenu();

//   $('#ORDER-BUTTON').on('click', (e) => {
//     e.preventDefault();

//     $.ajax({
//       method: 'POST',
//       url: '/order',
//       data: $orderItems.serialize()
//     })
//     .then((order_item) => {
//       // what we want to do with the order stuff
//     })
//     .catch(() => {
//       console.error('There was a problem processing the order...');
//     });
//   });





//   // $.ajax({
//   //   method: "GET",
//   //   url: "/api/users"
//   // }).done((users) => {
//   //   for(user of users) {
//   //     $("<div>").text(user.name).appendTo($("body"));
//   //   }
//   // });;

// });

//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });
// });
