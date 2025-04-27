const form = document.querySelector('.form-calendary');
function obtenerFechaHoraFormatoForm() {
    const ahora = new Date();
  
    const año = ahora.getFullYear();
    const mes = String(ahora.getMonth() + 1).padStart(2, '0');
    const dia = String(ahora.getDate()).padStart(2, '0');
    const fechaFormato = `${año}-${mes}-${dia}`;
  

    const horas = String(ahora.getHours()).padStart(2, '0');
    const minutos = String(ahora.getMinutes()).padStart(2, '0');
    const horaFormato = `${horas}:${minutos}`;
  
    return {
      fecha: fechaFormato,
      hora: horaFormato
    };
  }

form.addEventListener('submit', (e) =>{
    e.preventDefault(form);
    const formData = new FormData(form);
    let data = {};

    formData.forEach((value, key) =>{
        data[key] =value;
    })
    const fechaHoraActual = obtenerFechaHoraFormatoForm();
    data.fechaA = fechaHoraActual.fecha;
    const dataL = JSON.parse(localStorage.getItem('datosDelUsuario'));
    data.email = dataL.email;
    fetch('http://localhost:3000/gmail/agendar-cita', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(datas => {
        console.log('all ok')
        window.location.href = '../index.html'
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    console.log(data)
})