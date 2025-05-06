const listaPokemons = document.getElementById('lista-pokemons');
const btnGetTodos = document.getElementById('btn-todos');
const inputId = document.getElementById('input-id-busca');
const formId = document.getElementById('form-busca-id');
const inputNome = document.getElementById('input-nome-novo');
const inputPeso = document.getElementById('input-peso-novo');
const formPost = document.getElementById('form-post');
const formPut = document.getElementById('form-put');
const formDelete = document.getElementById('form-delete');
const apiURL = 'http://localhost:5255/pokemons';

const getPokemons = async () => {
    listaPokemons.innerHTML = '';

    try {
        const response = await fetch(apiURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao buscar os pokemons!");         
        }

        const pokemons = await response.json();

        pokemons.forEach(pokemon => {
            const newLi = document.createElement('li');
            newLi.innerText = `ID: ${pokemon.id} | Nome: ${pokemon.nome} | Peso: ${pokemon.peso}`;
            listaPokemons.appendChild(newLi);
        });
        

    } catch (error) {
        console.log(error.message);
        listaPokemons.innerText = `${error.message}`;
    }
}

const getPokemonPorId = async (id) => {
    listaPokemons.innerHTML = '';
    
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Pokemon não encontrado!");         
        }

        const pokemon = await response.json();

        const newLi = document.createElement('li');
        newLi.innerText = `ID: ${pokemon.id} | Nome: ${pokemon.nome} | Peso: ${pokemon.peso}`;
        listaPokemons.appendChild(newLi);
    } catch (error) {
        console.log(error.message);
        listaPokemons.innerText = `${error.message}`;
        alert(error.message);
    }
}

const postPokemon = async (novoPokemon) => {
    listaPokemons.innerHTML = '';
    
    try {
        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoPokemon)
        });

        if (!response.ok) {
            throw new Error("Erro ao criar o pokemon");         
        }

        const pokemon = await response.json();

        alert(`O Pokémon ${pokemon.nome} foi adicionado com sucesso!`);
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
}

const putPokemon = async () => {
    const id = document.getElementById('input-id-update').value;
    const nome = document.getElementById('input-nome-update').value;
    const peso = document.getElementById('input-peso-update').value;
    
    listaPokemons.innerHTML = '';
    
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome, 
                peso
            })
        });

        if (!response.ok) {
            throw new Error("Erro ao atualizar o pokemon");         
        }

        const pokemon = await response.json();

        alert(`O Pokémon ${pokemon.nome} foi atualizado com sucesso!`);
    } catch (error) {
        console.log(error.message);
        alert(error.message);
    }
}

const deletePokemon = async () => {
    const id = document.getElementById('input-id-delete').value;
    listaPokemons.innerHTML = '';
    
    try {
        const response = await fetch(`${apiURL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erro ao deletar Pokemon!");         
        }

        const resultado = await response.text();

        alert(resultado);
    } catch (error) {
        alert(error.message);
    }
}

btnGetTodos.addEventListener('click', (event) => {
    event.preventDefault();
    getPokemons();
});

formId.addEventListener('submit', (event) => {
    event.preventDefault();
    getPokemonPorId(inputId.value);
});

formPost.addEventListener('submit', (event) => {
    event.preventDefault();
    postPokemon({
        nome: inputNome.value,
        peso: inputPeso.value
    });
});

formPut.addEventListener('submit', (event) => {
    event.preventDefault();
    putPokemon();
});

formDelete.addEventListener('submit', (event) => {
    event.preventDefault();
    deletePokemon();
});