var firebaseConfig = {
    apiKey: "AIzaSyBbT6Nrjho8zBfvTCXjiM6cwYNl79vec_k",
    authDomain: "webblogapp-900b0.firebaseapp.com",
    databaseURL: "https://webblogapp-900b0.firebaseio.com",
    projectId: "webblogapp-900b0",
    storageBucket: "webblogapp-900b0.appspot.com",
    messagingSenderId: "213600692806",
    appId: "1:213600692806:web:92791a92dcc22b6124b847",
    measurementId: "G-5FB8KWZTYC"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function(){
      var email = $("#email").val();
      var password = $("#password").val();
      console.log(email, password);

      if(email != "" && password != ""){
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            
            console.log(errorCode);
            console.log(errorMessage);
            window.alert("Message : " + errorMessage);
          });
      }
      else {
          window.alert("Form is incomplete. Please fill out all fields.");
      }
  });

  $("#btn-logout").click(function(){
      firebase.auth().signOut();
  });

  $("#btn-update").click(function(){
      var phone = $("#phone").val();
      var address = $("#address").val();
      var bio = $("#bio").val();
      var fName = $("#firstName").val();
      var sName = $("#secondName").val();
      var country = $("#country").val();
      var gender = $("#gender").val();

      var rootRef = firebase.database().ref().child("Users");
      var userID = firebase.auth().currentUser.uid;
        var userRef = rootRef.child(userID);

        if(fName!="" && sName!="" && phone!="" && country!="" && gender!="" && bio!="" && address!=""){
            var userData={
                "phone": phone,
                "address": address,
                "bio": bio,
                "firstName": fName,
                "secondName": sName,
                "country": country,
                "gender": gender,               
            };

            userRef.set(userData, function(error){
                if(error){
                    var errorCode = error.code;
                    var errorMessage = error.message;
            
                    console.log(errorCode);
                    console.log(errorMessage);
            
                    window.alert("Message : " + errorMessage);
                }
                else {
                    window.location.href = "index.html";
                }
            });
        }
  });


  $("#btn-signup").click(function(){
    var email = $("#email").val();
    var password = $("#password").val();
    var cPassword = $("#confirmPassword").val();
    console.log(email, password);

    if(email != "" && password != "" && cPassword!=""){
        if(password == cPassword){
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
    
            console.log(errorCode);
            console.log(errorMessage);
    
            window.alert("Message : " + errorMessage);
          });
        }
        else{
            window.alert("Password do not match with the confrim password.");
        }
    }
    else {
        window.alert("Form is incomplete. Please fill out all fields.");
    }
});