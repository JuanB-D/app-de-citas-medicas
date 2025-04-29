const infoDeLaCuenta = JSON.parse(localStorage.getItem('infoDeLaCuenta'));
const citasContainer = document.querySelector('.citas-container');
const userData = JSON.parse(localStorage.getItem('datosDelUsuario'))
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
if(infoDeLaCuenta){
    for(let i =0; i< infoDeLaCuenta[0].citas_medicas.length; i++){
        let data = infoDeLaCuenta[0].citas_medicas[i];






        let div =  document.createElement('div');
        let div2 =  document.createElement('div');
        let strong = document.createElement('strong');
        let p = document.createElement('p');
        let div3 =  document.createElement('div');
        let strong2 = document.createElement('strong');
        let p2 = document.createElement('p');
        let div4 =  document.createElement('div');
        let strong3 = document.createElement('strong');
        let p3 = document.createElement('p');
        let div5 = document.createElement('div');
        let button = document.createElement('button');
        let button2 = document.createElement('button');
        let p5 = document.createElement('p');
        let strong5 = document.createElement('strong');
        let div6 = document.createElement('div6');
        div.classList.add("cita-card");
        div2.classList.add("cita-info");
        strong.innerText = 'tipo:';
        p.innerText = data.tipo;
        div2.append(strong, p);
        div3.classList.add('cita-info');
        strong2.innerText = 'fecha de agendamiento:';
        p2.innerText = data.fechaD;
        div3.append(strong2, p2);
        div4.classList.add('cita-info');
        strong3.innerText = 'fecha de la cita:';
        p3.innerText = data.fechaA;
        div4.append(strong3, p3);
        div5.classList.add('acciones');
        button.classList.add('btn','btn-editar');
        button.innerText = 'Editar';
        button2.classList.add('btn','btn-eliminar');
        button2.dataset.id = data.uuid;
        button2.innerText = 'Eliminar';
        
        strong5.innerText = 'ID'
        p5.innerText = data.uuid;
        div6.append(strong5, p5)
        div5.append(button, button2);
        div.append(div2, div3, div4, div5, div6);
        citasContainer.append(div)
    }
    document.addEventListener('DOMContentLoaded', () => {
        const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    
        botonesEliminar.forEach(boton => {
            boton.addEventListener('click', (event) => {
                const citaId = event.target.getAttribute('data-id');
    
                fetch('http://localhost:3000/Citas/deleteCita', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-user-id': infoDeLaCuenta.uuid // Opcional, por si quieres pasar el uuid en headers también
                    },
                    body: JSON.stringify({
                        uuid: infoDeLaCuenta[0].uuid,
                        cita_uuid: citaId
                    })
                })
                .then(response => {
                    if (response.ok) {
                        console.log('✅ Cita eliminada exitosamente');
                        // Opcional: recargar o actualizar la lista de citas
                        location.reload(); 
                    } else {
                        console.error('❌ Error al eliminar la cita');
                    }
                })
                .catch(error => console.error('❌ Error en la solicitud:', error));
            });
        });
    });
}
else{
    window.location.href = '../calendario&formulario/index.html'
}