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




$("#btn-register").click(function () {
    firebase.initializeApp(config);
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('inputPassword').value;
    var reType = document.getElementById('retype').value;

    if (password.length < 6) {
        alert("Use at least 6 characters for Password!");
    } else if (password != reType) {
        alert("Re-typed password doesn't match!");
    } else {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
            var nUser = firebase.auth().currentUser;
            createUser(nUser);
            console.log("User Registered");
            window.location.replace('login.html');
        },function (error) {
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

$("#btn-login").click(function () {

    var email = document.getElementById('user-email').value;
    var password = document.getElementById('user-inputPassword').value;

        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
                console.log(errorMessage);
            }
            console.log(error);

        });

        firebase.auth().onAuthStateChanged(function(user){
            if(user){
                console.log("user");
                window.location.replace('search.html');
            }else {
                console.log("not a user");
            }
        });
});

$("#logout").click(function () {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });

});

function createUser(nUser) {
    var refe = firebase.database().ref('Users/'+nUser.uid);
    var details = {
        "name" : document.getElementById('name').value,
        "email" : document.getElementById('email').value
    };
    refe.set(details);
}



