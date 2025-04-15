const imagem = document.querySelector('img');

const data = fetch("https://pokeapi.co/api/v2/pokemon/7")
    .then((res) => res.json())
    .then((data) => data);

imagem.src = `${data}`;

// codigo assincrono