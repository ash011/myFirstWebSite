const URL = "http://localhost:3000/";

const socket = io(URL,{
    autoConnect: false
});

function newUserConnected(){
    try{
        let token = localStorage.getItem("accessToken");
        socket.auth = {
            token
        };
        socket.connect()
    }catch(err){
        console.log(err)
    }
};

socket.on("connect_error", (err) => {
    if(err.message == "jwt expired"){
        refreshTokensFunction(newUserConnected)
    }else{
        alert(err.message);
        loginFunction()
    }
})

socket.on("online users", data=>{
    data.forEach(user => {
        oneOnlineUser(JSON.parse(user))
    });
});

socket.on("user connected", data=>{
    oneOnlineUser(data)
});

socket.on("user disconnect", (userId) => {
    nowOnlinesContainer.querySelector(`#o${userId}`).remove();
});


function oneOnlineUser(user){
    if(nowOnlinesContainer.querySelector(`#o${user.id}`)) return;
    nowOnlinesContainer.insertAdjacentHTML("afterbegin", `
    <section class="oneOnlineUserContainer" id="o${user.id}">
        <img src="/images/${user.image}" alt="" class="onlineUserImage">
        <img src="/images/circle.png" alt="" class="onlineUserIcon">
        ${user.username}
    </section>    
    `)
}