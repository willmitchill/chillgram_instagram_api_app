// $(function() {
//   $.getJSON('https://api.instagram.com/v1/media/popular?client_id=CLIENT-ID' + '/callback=?', function(image_url){
//     for (var i=0; i < 10; i++) {
//       $('ul').append("<li><img src='" + post[i].image_url + "'>" + "</li>");
//     };
//   });
// });

// $.getJSON( "ajax/test.json", function( data ) {
//   var items = [];
//   $.each( data, function( key, val ) {
//     items.push( "<li id='" + key + "'>" + val + "</li>" );
//   });
//
//   $( "<ul/>", {
//     "class": "my-new-list",
//     html: items.join( "" )
//   }).appendTo( "body" );
// });
$(document).ready(function(){


  $("#search").on("submit", function(e) {
    e.preventDefault();

    search = $("#query").val();
    console.log(search);



    url = "https://api.instagram.com/v1/tags/" + search + "/media/recent?&client_id=7e7a57487ca642278dd50158878e7aae&callback=?";

    $('#popular').empty();
    getResults();

    $("#name span").html(search);
  });





  var appendImage = function(image_url) {
    $("#popular").append("<img class='yolo' src=\"" + image_url + "\">");
  }

  var getResults = function(){

    $.ajax({
      url: url,

      // the name of the callback parameter, as specified by Instagram documentationhttp://instagram.com/developer/endpoints/
      jsonp: "callbackFunction",

      // tell jQuery we're expecting JSONP
      dataType: "jsonp"
    })
    .success(function( response ) {
      console.log("success", response ); // server response
      var posts = response.data;
      $.each(posts, function(index, post){
         console.log(post); appendImage(post.images.low_resolution.url);
      });
    })
    .error(function( response) {
      console.log("error", response);
    })

  }


});
