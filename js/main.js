let nameSignUp = document.getElementById('nameSignUp')
let mailSignUp = document.getElementById('mailSignUp')
let passSignUp = document.getElementById('passSignUp')
let btnSignUp = document.getElementById('btnSignUp')
let loginMail = document.getElementById('loginMail')
let loginPass = document.getElementById('loginPass')
let btnLogin = document.getElementById('btnLogin')
let array = []

if (localStorage.getItem('informationUser') != null) {
    array = JSON.parse(localStorage.getItem('informationUser'))
}

btnSignUp?.addEventListener('click', () => {
    if(check() && isExist()){
        let user = {
            name: nameSignUp.value,
            mail: mailSignUp.value,
            pass: passSignUp.value,
        }
        array.push(user)
        localStorage.setItem('informationUser', JSON.stringify(array))
        clear()
        setTimeout(()=>{
            window.location.href='login.html'
        },2000)
    }

})


function clear() {
    nameSignUp.value = ""
    mailSignUp.value = ""
    passSignUp.value = ""

    nameSignUp.classList.remove('is-valid', 'is-invalid')
    mailSignUp.classList.remove('is-valid', 'is-invalid')
    passSignUp.classList.remove('is-valid', 'is-invalid')
}

function validation(element) {
    if (element.value == "") {
        element.classList.remove('is-valid', 'is-invalid')
        element.nextElementSibling.classList.replace('d-block', 'd-none')
        return false
    }
    let regex = {
        nameSignUp: /^[A-Z][a-z]{2,6}$/,
        mailSignUp: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        passSignUp: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
    }
    if (regex[element.id].test(element.value)) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.replace('d-block', 'd-none')
    }
    else {
        element.classList.remove('is-valid')
        element.classList.add('is-invalid')
        element.nextElementSibling.classList.replace('d-none', 'd-block')
    }
}

document.querySelectorAll('input').forEach((input) => {
    input.addEventListener('input', () => {
        validation(input)
    })
})



function isExist() {
    for (let i = 0; i < array.length; i++) {
        if (array[i].mail == mailSignUp.value) {
            Swal.fire({
                title: 'Error',
                text: 'This email is already exist',
                icon: 'error',
            })
            return false
        }
    }
    Swal.fire({
        title: 'Success',
        text: 'You have been registered successfully',
        icon: 'success',
    })
    return true
}



function check(){
    let isValid = true
    if(nameSignUp.value=="" || mailSignUp.value=="" || passSignUp.value==""){
        Swal.fire({
            title: 'Error',
            text: 'Please fill all fields',
            icon: 'All inputs Is Required',
        })
        isValid = false
    }
    else {
        document.querySelectorAll('input').forEach((input)=>{
            if(!input.classList.contains('is-valid')){
                isValid = false
            }
        })
    }
    return isValid
}


btnLogin?.addEventListener('click' , ()=>{
    let userFound=false
    for (let i = 0; i < array.length; i++) {
        if(array[i].mail==loginMail.value && array[i].pass==loginPass.value){
            localStorage.setItem('loginUser' ,array[i].name)
            Swal.fire({
                title: 'Success',
                text: 'You have been logged in successfully',
                icon: 'success',
                confirmButtonText: 'Ok',
                timer:2000,
                willClose:()=>{
                    window.location.replace('welcome.html')
                }
            })
            userFound=true
            break;
        }        
    }
    if(!userFound){
        Swal.fire({
            title: 'Error',
            text: 'Invalid username or password',
            icon: 'error',
            confirmButtonText: 'Ok'

        })
    }
})

let userName = localStorage.getItem('loginUser')

function welcome(){
    document.getElementById('welcome').innerHTML='welcome ' + userName
}

window.addEventListener('load' , welcome)


let logOut = document.getElementById('logOut')
logOut?.addEventListener('click' , ()=>{
    localStorage.removeItem('loginUser')
    window.location.replace('login.html')

})