const imagem = document.querySelector('img');
const form = document.getElementById('form');
const inputId = document.getElementById('id');
const nome = document.getElementById('nome-pokemon');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const endpoint = inputId.value;

    fetch(`http://viacep.com.br/ws/${endpoint}/json/`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            nome.innerText = `${data.logradouro}`;
        });
})



// codigo assincrono