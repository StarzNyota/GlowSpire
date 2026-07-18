function founderLogin(){

let password =
document.getElementById("founderPassword").value;


if(password === "FoUnDerOnLyZ"){

window.location.href="founder.html";

}

else{

alert("Incorrect Founder Password ❌");

}

}




function ownerLogin(){

let password =
document.getElementById("ownerPassword").value;


if(password === "NSNRCOOWNERS"){

window.location.href="coworker.html";

}

else{

alert("Incorrect Co-Owner Password ❌");

}

}
