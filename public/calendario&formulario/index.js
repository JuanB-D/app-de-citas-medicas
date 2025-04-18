const forms = {
    login: document.querySelector(".login_form"),
    register: document.querySelector(".register_form")
}
forms.login.addEventListener('submit', (e) =>{
    e.preventDefault();
    const formData = new FormData(forms.login);
    let data = {};

    formData.forEach((value, key) =>{
        data[key] = value;
    })

    fetch("http://localhost:3000/Auth&/Log&n", {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
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
        window.location.href = 'calendario.html'
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    console.log(data);
    localStorage.setItem('datosDelUsuario', JSON.stringify(data));
})
forms.register.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(forms.register);
    let data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    fetch("http://localhost:3000/Auth&/Reg&ster", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
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
        window.location.href = 'calendario.html'
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
    localStorage.setItem('datosDelUsuario', JSON.stringify(data));
    console.log(data);
});