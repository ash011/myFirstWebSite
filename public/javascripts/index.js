if(localStorage.getItem("accessToken")){
    homeFunction()
} else {
    loginFunction()
}