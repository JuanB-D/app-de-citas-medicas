const btn = document.querySelectorAll('.btn');
const tipos = {
    A:document.querySelector('.A'),
    B:document.querySelector('.B'),
    C:document.querySelector('.C')
}
tipos.A.addEventListener('click', () =>{
    localStorage.setItem('tipo', 'Consulta General')
})
tipos.B.addEventListener('click', () =>{
    localStorage.setItem('tipo', 'Consulta Nutricionista')
})
tipos.C.addEventListener('click', () =>{
    localStorage.setItem('tipo', 'Consulta Pediatria')
})
const userData = localStorage.getItem('datosDelUsuario')
btn.forEach(btnes =>{
    btnes.addEventListener('click', () =>{
        if(userData){
            window.location.href = '../calendario&formulario/calendario.html'
        }else{
            window.location.href = '../calendario&formulario/index.html'
        }
    })
})