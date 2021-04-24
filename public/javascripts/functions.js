const { post } = require("../../app")

const mainContener = document.querySelector("#mainContener")

const homeFunction = () => {

}

const loginFunction = () => {
    mainContener.innerHTML = ""
    mainContener.insertAdjacentHTML("afterbegin", `
    <form>
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" placeholder="Enter email" name="email">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" placeholder="Enter password" name="password">
        </div>
        <button type="submit" class="btn btn-primary" id="loginBtn">Submit</button>
    </form>
    <p  class="py-5">
        <button id="forRegisterBtn" class="btn btn-success">Register Now</button>
    </p>
    `)
    let forRegisterBtn = document.getElementById("forRegisterBtn")
    forRegisterBtn.addEventListener("click", registerFunction)
}

function registerFunction(){
    mainContener.innerHTML = ""
    mainContener.insertAdjacentHTML("afterbegin", `
    <form id="registerForm">
        <div class="form-group">
            <label for="username">User Name:</label>
            <input type="text" class="form-control" placeholder="Enter username" name="username">
        </div>
        <div class="form-group">
            <label for="email">Email address:</label>
            <input type="email" class="form-control" placeholder="Enter email" name="email">
        </div>
        <div class="form-group">
            <label for="pwd">Password:</label>
            <input type="password" class="form-control" placeholder="Enter password" name="password">
        </div>
        <button type="submit" class="btn btn-primary" id="loginBtn">Submit</button>
    </form>
    <p  class="py-5">
        <button id="forLoginbtn" class="btn btn-success">LogIn</button>
    </p>
    `)
    let registerForm = document.getElementById("registerForm")
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let registerUserInfo = {
            username: registerForm.elements["username"].value,
            email: registerForm.elements["email"].value,
            password: registerForm.elements["password"].value
        }
        fetch("/auth/register", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(registerUserInfo)
        }).then(res=>res.json())
        .then(data=>{
            
        })
    })

    let forLogin = document.getElementById("forLoginbtn")
    forLogin.addEventListener("click", loginFunction)
}