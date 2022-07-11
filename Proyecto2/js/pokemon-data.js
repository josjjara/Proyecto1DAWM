let pokedata;
const USE_CACHE = true;

const llenarTablaPoke = (pokemon, dexnum ,table_body) => {

    let srcimg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexnum}.png`

    let tr = `
    <tr id="poke-td-${dexnum}">
        <td>${dexnum}</td>
        <td>${pokemon.name}</td>
        <td><img src='${srcimg}' alt='Imagen pokemon ${pokemon.name}'></td>
        <td><a href="${pokemon.url}">(Fetch)Más detalles</a></td>
    </tr>
    `
    table_body.innerHTML += tr;
}

async function fetchPokeData(peticion){

    let res = await fetch(`https://pokeapi.co/api/v2/${peticion}?limit=10000`);
    let data = await res.json();
    
    return data.results;
    
}

/*
Orden del array para cada pokemon
Pokedex(id), Nombre, Tipos, Generación ,Suma Stats ,Altura ,Peso, Color ,Flavor text, Img_url
*/
async function pokeJsonToArray(poke_species_data){

    let arr_Pokemones = [];
    
    for(let pk_datos of poke_species_data){

        let res_species = await fetch(pk_datos["url"]);
        let data_specie = await res_species.json();

        let res_pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${data_specie['id']}`);
        let data_pokemon = await res_pokemon.json();
          
        let pk_Completo = [];

        pk_Completo.push(data_specie["order"]);

        pk_Completo.push(data_specie["name"]);

        let tipoStr =  data_pokemon["types"][0]["type"]["name"];

        if(data_pokemon["types"].length == 2)
            tipoStr+= " "+ data_pokemon["types"][1]["type"]["name"];
        
        pk_Completo.push(tipoStr);
        let gen = data_specie['generation']['name'].split("-")[1];

        switch(gen){   
            case "i":
                gen =1; break;         
            case "ii":
                gen = 2; break;
            case "iii":
                gen =3; break;      
            case "iV":
                gen = 4; break;    
            case "v":
                gen =5; break;      
            case "vi":
                gen = 6; break;
            case "vii":
                gen =7; break;                            
            case "viii":
                gen = 8; break;       
        }
        pk_Completo.push(gen);

        let sum_stats = 0;
        for(let stat of data_pokemon['stats']){
            sum_stats += stat["base_stat"];
        }

        pk_Completo.push(sum_stats);
        pk_Completo.push(data_pokemon['height']);
        pk_Completo.push(data_pokemon['weight']);
        pk_Completo.push(data_specie['color']['name']);

        let flavor_text = '';

        for(let descripcion of data_specie['flavor_text_entries']){

            if(descripcion['language']['name']== 'en'){
                flavor_text += descripcion['flavor_text'];
                break;
            }

        }
        
        pk_Completo.push(flavor_text);

        let url_img  = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data_specie['id']}.png`
        
        pk_Completo.push(url_img);
        arr_Pokemones.push(pk_Completo);
    }

    return arr_Pokemones;

}

document.addEventListener("DOMContentLoaded", async (event) => {
    
    if(USE_CACHE && (pokedata = localStorage.getItem("poke_data"))){
        
        console.log("LocalStorage data found");

        pokedata = JSON.parse(pokedata);

    }else{
        

        let peticiones = ["pokemon-species?limit=10", "move", "item", "generation"];

        pokedata = {};

        for(let peticion of peticiones ){

            pokedata[peticion.split("?")[0]] = await fetchPokeData(peticion);

        }

        pokedata["pokemon-species"] = await pokeJsonToArray(pokedata["pokemon-species"]);
        
        localStorage.setItem("poke_data",JSON.stringify(pokedata));
   
    }

    console.log(pokedata["pokemon-species"]);

    let table = new DataTable('#pokemon-table', {
        ordering: false,
        info:     false,
        data: pokedata["pokemon-species"],
        columns: [
            { title: 'Pokedex' },
            { title: 'Nombre' },
            { title: 'Tipos' },
            { title: 'Generación' },
            { title: 'Suma Stats' },
            { title: 'Altura' },
            { title: 'Peso' },
            { title: 'Color' }
        ],
    });

    document.querySelector('#pokemon-table tbody').addEventListener('click', function(e){

        var data = table.row( e.target ).data();
        console.log(data);


    });


});




