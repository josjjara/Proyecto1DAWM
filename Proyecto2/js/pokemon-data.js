let pokedata;
const USE_CACHE = false;  //Clasue for cache
const MAXGENS_TO_FETCH = 10 // MAX number of generations to fetch from api(includes all their pokemon)
const FETCH_LOCAL = false;

let table = new DataTable("#pokemon-table", {
  ordering: false,
  info: false,
  columns: [
    { title: "Pokedex" },
    { title: "Nombre" },
    { title: "Tipos" },
    { title: "Generación" },
    { title: "Suma Stats" },
    { title: "Altura" },
    { title: "Peso" },
    { title: "Color" },
  ],
  responsive: true,
});

let progressBar = document.querySelector(".progress-bar");

//Functions

async function fetchPokeApi(peticion) {
  let res = await fetch(`https://pokeapi.co/api/v2/${peticion}`);
  let data = await res.json();
  return data;
}

async function fetchUrl(url) {
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

async function processAllFetchData(){
    pokedata = {};
    let poketemp = {};

    let peticiones = [
      'pokemon-species',
      'move',
      'item',
      `generation?limit=${MAXGENS_TO_FETCH}`,
      "type"
    ];


    for (let peticion of peticiones) {
      poketemp[peticion.split("?")[0]] = await fetchPokeApi(peticion);
    }

    pokedata['totalPokemon'] = poketemp['pokemon-species']['count'];
    pokedata['totalMoves'] = poketemp['move']['count'];
    pokedata['totalItems'] = poketemp['item']['count'];
    pokedata["generation"] = [];
    pokedata["type"] = {};

    for (let type of poketemp["type"]["results"]) {

      let type_data = await fetchUrl(type['url']);

      pokedata["type"][type_data['name']] = {
        "moves": type_data['moves'].length,
        "pokemon":type_data['pokemon'].length
      }
    }

    let i = 0;

    document.querySelector(
      "#h6-totalPokemones"
    ).innerHTML = `${  pokedata['totalPokemon']}`;
  
    document.querySelector(
      "#h6-totalMovimientos"
    ).innerHTML = `${  pokedata['totalMoves']}`;
  
    document.querySelector(
      "#h6-totalItems"
    ).innerHTML = `${  pokedata['totalItems']}`;
  
    document.querySelector(
      "#h6-totalGeneraciones"
    ).innerHTML = `${poketemp["generation"]['count']}`;
  

    spinner(); //Let the user see the page while its loading

    for (let gen of poketemp["generation"]["results"]) {

      let gen_data = await fetchUrl(gen['url']); 

      pokedata["generation"].push( {
        "name": gen_data['name'],
        "abilities": gen_data['abilities'].length,
        "moves":gen_data['moves'].length,
        "pokemon": [],
        "pokemonPerType": {}
        });

      pokedata['generation'][i]['pokemon'] = await pokeJsonToArray(gen_data['pokemon_species'], pokedata['generation'][i]);

      /*
      CODIGO PARA OTROS DATOS EN GRAFICOS POR CADA GENERACION
      */ 

      table.rows.add(

        Object.values( pokedata["generation"][i]['pokemon'])
        
        ).draw()

      progressBar.setAttribute("width",`${100/poketemp['generation']['results'].length-i}%`)
      
      i++;

      $(document).ready(function () {
        var table = $("#pokemon-table").DataTable();
    
        $("#pokemon-table tbody").on("click", "tr", function () {
          var data = table.row(this).data();
    
          const bsOffcanvas = new bootstrap.Offcanvas("#offcanvasPokemon");
  
          bsOffcanvas.show();
    
          PokemonPopup(data);
        });
      });
  

    }
    localStorage.setItem("poke_data", JSON.stringify(pokedata));

}

/*
Orden del array para cada pokemon
Pokedex(id), Nombre, Tipos, Generación ,Suma Stats ,Altura ,Peso, Color ,Flavor text, Img_url, stats_individuales[] (11)
*/
async function pokeJsonToArray(poke_species_data, pokedataGen) {
  
  let dic_Pokemones = {};


  for (let pk_datos of poke_species_data) {
    let data_specie = await fetchPokeApi("pokemon-species/" + pk_datos["name"]);

    let data_pokemon = await fetchPokeApi("pokemon/" + data_specie['id']);

    let pk_Completo = [];

    let tipoStr= '';

    for (let types of data_pokemon["types"]) {

      if (!pokedataGen["pokemonPerType"][types['type']['name']])
        
      pokedataGen["pokemonPerType"][types['type']['name']] = 0;

      pokedataGen["pokemonPerType"][types['type']['name']] += 1;

      tipoStr += types['type']['name'] + " ";

    }

    let gen = data_specie["generation"]["name"].split("-")[1];

    switch (gen) {
      case "i": gen = "Gen-1"; break;
      case "ii": gen = "Gen-2"; break;
      case "iii": gen = "Gen-3"; break;
      case "iV": gen = "Gen-4"; break;
      case "v": gen = "Gen-5"; break;
      case "vi": gen = "Gen-6"; break;
      case "vii": gen = "Gen-7"; break;
      case "viii": gen = "Gen-8"; break;
      case "iv": gen = "Gen-9"; break;
    }

    let sum_stats = 0, x = 0;
    let num_stats = [];
    for (let stat of data_pokemon["stats"]) {
      num_stats[x] = stat["base_stat"];
      sum_stats += num_stats[x];
      x++;
    }

    let flavor_text = "No flavor text found";
    for (let descripcion of data_specie["flavor_text_entries"]) {
      if (descripcion["language"]["name"] == "en") {

        flavor_text = descripcion["flavor_text"].replace('\f','');
        break;
      }
    }

    let url_img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data_specie["id"]}.png`;
    pk_Completo.push(data_specie['id']);
    pk_Completo.push(data_specie["name"]);
    pk_Completo.push(tipoStr);
    pk_Completo.push(gen);
    pk_Completo.push(sum_stats);
    pk_Completo.push(data_pokemon["height"]);
    pk_Completo.push(data_pokemon["weight"]);
    pk_Completo.push(data_specie["color"]["name"]);
    pk_Completo.push(flavor_text);
    pk_Completo.push(url_img);
    pk_Completo.push(num_stats);

    dic_Pokemones[data_specie['id']] = pk_Completo;

  }

  return dic_Pokemones;
}

const PokemonPopup = (pokemon) => {

  let PokeDiv = document.querySelector("#offcanvasPokemon .offcanvas-body");

  const htmlPopup = ` 
    <div class="d-flex p-2" id="offcanvasPokemon-div-info"> 
        <div class="card"> 
          <img class="card-image img-fluid max-width: 100%" heigth="auto" src="${pokemon[9]}"/> 
          <h2 class="card-title">(${pokemon[0]}) ${pokemon[1]} </h2> 
          <p>${pokemon[8]}</p>
          <h6>Type: ${pokemon[2]}  </h5>
          <p><small>${pokemon[3]} | Height: ${pokemon[5]} | Weight: ${pokemon[6]}</small></p>
          <h5> Stats individuales </h5>
          <p>HP: ${pokemon[10][0]} | Atk:${pokemon[10][1]} | Def:${pokemon[10][2]} | Sp. Atk:${pokemon[10][3]}
          |Sp. Def:${pokemon[10][4]} | Spd:${pokemon[10][5]}</p>
        </div> 
    </div> `;
  
  let margin = { top: 100, right: 100, bottom: 100, left: 100 },
    width = 600 - margin.left - margin.right;
  height = width;
  let data = [
    [
      //Stats
      { area: "Hit Points", value: pokemon[10][0] },
      { area: "Attack", value: pokemon[10][1] },
      { area: "Defense", value: pokemon[10][2] },
      { area: "Special-Attack", value: pokemon[10][3] },
      { area: "Special-Defense", value: pokemon[10][4] },
      { area: "Speed", value: pokemon[10][5] },
    ],
  ];
  // Config for the Radar chart
  let config = {
    w: width,
    h: height,
    maxValue: 255,
    levels: 4,
    ExtraWidthX: 200,
    color: d3.scaleOrdinal().range([pokemon[7]]),
  };

  PokeDiv.innerHTML += htmlPopup;

  //Call function to draw the Radar chart
  RadarChart.draw("#offcanvasPokemon-div-info .card ", data, config);

  //Add responsive atributes to the svg
  let svg = document.querySelector("#offcanvasPokemon svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", "0 0 500 500");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
};

async function cargarDatos(){

  if (USE_CACHE && (pokedata = localStorage.getItem("poke_data"))) {

    console.log("Using LocalStorage");

    pokedata = JSON.parse(pokedata);

    spinner();

  } else if (FETCH_LOCAL) {

    let localData = await fetch("./data/poke_data.json");
    let pokedata = await localData.json();

    spinner();

  } else {

    console.log("LocalStorage not used");
    processAllFetchData();
  }

  console.log(JSON.stringify(pokedata));

}

document
  .getElementById("offcanvasPokemon")
  .addEventListener("hide.bs.offcanvas", function () {
    const pokemonInfo = document.querySelector("#offcanvasPokemon-div-info");
    pokemonInfo.parentElement.removeChild(pokemonInfo);
  });

document.addEventListener("DOMContentLoaded", async (event) => {

  await cargarDatos();


});
