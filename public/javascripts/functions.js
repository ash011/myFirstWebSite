const mainContener = document.querySelector("#mainContener")

const homeFunction = () => {

}

const loginFunction = () => {
    mainContener.innerHTML = ""
    mainContener.insertAdjacentHTML("afterbegin", `
    <form id="loginForn">
        <p id="loginErrPtag" class="text-danger"></p>
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
    let loginErrPtag = document.getElementById("loginErrPtag")
    let loginForn = document.getElementById("loginForn")
    loginForn.addEventListener("submit", (e) => {
        e.preventDefault()
        let loginUserInfo = {
            email: loginForn.elements["email"].value,
            password: loginForn.elements["password"].value
        }
        fetch("/auth/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(loginUserInfo)
        }).then(res=>res.json())
        .then(data=>{
            let {error, accessToken, refreshToken} = data
            if(error){
                return loginErrPtag.innerHTML = error
            } 
            
            localStorage.setItem("accessToken", accessToken)
            localStorage.setItem("refreshToken", refreshToken)
            location.hresh = "/"
            
        })
    })

    let forRegisterBtn = document.getElementById("forRegisterBtn")
    forRegisterBtn.addEventListener("click", registerFunction)
}

function registerFunction(){
    mainContener.innerHTML = ""
    mainContener.insertAdjacentHTML("afterbegin", `
    <form id="registerForm">
        <p id="regErrPtag" class="text-danger"></p>
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
    let regErrPtag = document.getElementById("regErrPtag")
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
            let {error, emailSent, id} = data;
            if(error){
                return regErrPtag.innerHTML = error
            } 
            if(emailSent){
                verifyFunction(id)
            }
            else {
                loginFunction()
            }
        })
    })

    let forLogin = document.getElementById("forLoginbtn")
    forLogin.addEventListener("click", loginFunction)
}

function verifyFunction(userId) {
    mainContener.innerHTML = ""
    mainContener.insertAdjacentHTML("afterbegin", `
    <form id="verifyForm">
        <p id="verifyErrPtag" class="text-danger"></p>
        <div class="form-group">
            <label for="code">Your Code:</label>
            <input type="text" class="form-control" placeholder="Enter Your Code" name="code">
        </div>
        <div class="form-group">
            <input type="hidden" class="form-control" value="${userId}" name="userId">
        </div>
        <button type="submit" class="btn btn-primary">Verify Email</button>
    </form>
    <p  class="py-5">
        <button id="forLoginbtn" class="btn btn-success">LogIn</button>
    </p>
    `)
    let verifyErrPtag = document.getElementById("verifyErrPtag")
    let verifyForm = document.getElementById("verifyForm")
    verifyForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let verifyInfo = {
            code: verifyForm.elements["code"].value,
            id: verifyForm.elements["userId"].value
        }
        fetch("/auth/verifyemail", {
            method: "POST",
            headers: {
                "Content-Type":"application/json",
                "Accept":"application/json"
            },
            body: JSON.stringify(verifyInfo)
        }).then(res=>res.json())
        .then(data=>{
            let {error, result, id} = data
            if(error){
                return verifyErrPtag.innerHTML = error
            } 
            loginFunction()
        })
    })
}