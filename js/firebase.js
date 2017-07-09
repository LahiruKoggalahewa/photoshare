/**
 * Created by Kushan Sameera on 7/9/2017.
 */
var config = {
    apiKey: "AIzaSyBGq3d3AzgS7kd_39_zaTlNIzMKN0kO9Is",
    authDomain: "photoshare-e2d7c.firebaseapp.com",
    databaseURL: "https://photoshare-e2d7c.firebaseio.com",
    projectId: "photoshare-e2d7c",
    storageBucket: "",
    messagingSenderId: "784977229016"
};

firebase.initializeApp(config);




$( "#btn-register" ).click(function() {

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('inputPassword').value;
    var reType = document.getElementById('retype').value;

    if(password.length<6){
        alert("Use at least 6 characters for Password!");
    }else if(password != reType){
        alert("Re-typed password doesn't match!");
    }else {
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }

        });
    }


});