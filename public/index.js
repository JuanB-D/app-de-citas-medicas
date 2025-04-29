const nameP = document.querySelector('.name');
const citasAgendadas = document.querySelector('.citas_agendadas');
const optionR = document.querySelector('.option_r');
citasAgendadas.addEventListener('click', () =>{
    window.location.href = './citasAgendadas/index.html'
})
const rdrctButton = document.querySelectorAll('.rdrct');
const userData = JSON.parse(localStorage.getItem('datosDelUsuario'))
if(userData){
    optionR.innerHTML = 'Cerrar Sesion'
    optionR.addEventListener('click', () =>{
        localStorage.clear();
        location.reload()
    })
}else{
    optionR.innerHTML= 'Iniciar Sesion';
    optionR.addEventListener('click', () =>{
        window.location.href = './calendario&formulario/index.html'
    })
}
rdrctButton.forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = "./agendarCitas/index.html"
    })
})
function getData(email){
    return new Promise((resolve, reject) =>{
        fetch('http://localhost:3000/Auth&/UserData',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                email: email
            })
        })
        .then(response =>{
            if(!response.ok){
                reject('Error in response: '+ response.status)
            }
            return response.json();
        })
        .then(data =>{
            localStorage.setItem('infoDeLaCuenta', JSON.stringify(data))
            resolve(data)
        })
        .catch(err =>{
            reject('Error in fetch ' + err)
        })
    })
}
if(userData){
    getData(userData.email);
}
const infoDeLaCuenta = JSON.parse(localStorage.getItem('infoDeLaCuenta'));
if(infoDeLaCuenta){
    nameP.innerHTML = `Bienvenido! ${infoDeLaCuenta[0].name}`
}