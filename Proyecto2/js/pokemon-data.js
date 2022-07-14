let pokedata;
const USE_CACHE = true;

const llenarTablaPoke = (pokemon, dexnum, table_body) => {
  let srcimg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dexnum}.png`;

  let tr = `
    <tr id="poke-td-${dexnum}">
        <td>${dexnum}</td>
        <td>${pokemon.name}</td>
        <td><img src='${srcimg}' alt='Imagen pokemon ${pokemon.name}'></td>
        <td><a href="${pokemon.url}">(Fetch)Más detalles</a></td>
    </tr>
    `;
  table_body.innerHTML += tr;
};

async function fetchPokeData(peticion) {
  let res = await fetch(`https://pokeapi.co/api/v2/${peticion}?limit=10000`);
  let data = await res.json();

  return data.results;
}

/*
Orden del array para cada pokemon
Pokedex(id), Nombre, Tipos, Generación ,Suma Stats ,Altura ,Peso, Color ,Flavor text, Img_url, stats_individualesv (11)
*/
async function pokeJsonToArray(poke_species_data) {
  let arr_Pokemones = [];

  for (let pk_datos of poke_species_data) {
    let res_species = await fetch(pk_datos["url"]);
    let data_specie = await res_species.json();

    let res_pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${data_specie["id"]}`
    );
    let data_pokemon = await res_pokemon.json();

    let pk_Completo = [];

    let tipoStr = data_pokemon["types"][0]["type"]["name"];

    if (data_pokemon["types"].length == 2)
      tipoStr += " " + data_pokemon["types"][1]["type"]["name"];

    let gen = data_specie["generation"]["name"].split("-")[1];
    
    switch (gen) {
      case "i":
        gen = "Gen-1";
        break;
      case "ii":
        gen = "Gen-2";
        break;
      case "iii":
        gen = "Gen-3";
        break;
      case "iV":
        gen = "Gen-4";
        break;
      case "v":
        gen = "Gen-5";
        break;
      case "vi":
        gen = "Gen-6";
        break;
      case "vii":
        gen = "Gen-7";
        break;
      case "viii":
        gen = "Gen-8";
        break;
    }

    let sum_stats = 0;
    let x = 0;
    let num_stats = [];
    for (let stat of data_pokemon["stats"]) {
      num_stats[x] = stat["base_stat"];
      sum_stats += num_stats[x];
      x++;
    }

    let flavor_text = "";

    for (let descripcion of data_specie["flavor_text_entries"]) {
      if (descripcion["language"]["name"] == "en") {
        flavor_text += descripcion["flavor_text"];
        break;
      }
    }

    let url_img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data_specie["id"]}.png`;

    pk_Completo.push(data_specie["order"]);
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

    arr_Pokemones.push(pk_Completo);
  }

  return arr_Pokemones;
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
          <p><small>${pokemon[3]}Height: ${pokemon[5]} | Weight: ${pokemon[6]}</small></p>
          <h5> Stats individuales </h5>
          <p>HP: ${pokemon[10][0]} | Atk:${ pokemon[10][1]} | Def:${pokemon[10][2]} | Sp. Atk:${pokemon[10][3]}
          |Sp. Def:${pokemon[10][4]} | Spd:${pokemon[10][5]}</p>
        </div> 
    </div> `;
  let margin = {top: 100, right: 100, bottom: 100, left: 100},
      width = Math.min(600, window.innerWidth - 10) - margin.left - margin.right
      height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);
  let data = [
    [
      //Stats
      { "area": "Hit Points", "value": pokemon[10][0] },
      { "area": "Attack", "value": pokemon[10][1] },
      { "area": "Defense", "value": pokemon[10][2] },
      { "area": "Special-Attack", "value": pokemon[10][3] },
      { "area": "Special-Defense", "value": pokemon[10][4] },
      { "area": "Speed", "value": pokemon[10][5] },
    ],
  ];
  // Config for the Radar chart
  let config = {
    w: width,
    h: height,
    maxValue: 255,
    levels: 4,
    ExtraWidthX: 200,
    color: d3.scaleOrdinal().range([pokemon[7]]) 
  }

  //Call function to draw the Radar chart
  PokeDiv.innerHTML += htmlPopup;
  RadarChart.draw("#offcanvasPokemon-div-info .card ", data, config);

  //Add responsive atributes to the svg
  let svg = document.querySelector("#offcanvasPokemon svg");
  svg.setAttribute("width","100%");
  svg.setAttribute("height","100%");
  svg.setAttribute("viewBox", "0 0 500 500");
  svg.setAttribute("preserveAspectRatio","xMidYMid meet");

};


document.getElementById("offcanvasPokemon").addEventListener('hide.bs.offcanvas', function () {
  
  const pokemonInfo =  document.querySelector("#offcanvasPokemon-div-info");
  pokemonInfo.parentElement.removeChild(pokemonInfo);

})

document.addEventListener("DOMContentLoaded", async (event) => {
  if (USE_CACHE && (pokedata = localStorage.getItem("poke_data"))) {
    console.log("LocalStorage data found");

    pokedata = JSON.parse(pokedata);
  } else {
    console.log("LocalStorage not used");

    let peticiones = ["pokemon-species?limit=10", "move", "item", "generation"];

    pokedata = {};

    for (let peticion of peticiones) {
      pokedata[peticion.split("?")[0]] = await fetchPokeData(peticion);
    }

    pokedata["pokemon-species"] = await pokeJsonToArray(
      pokedata["pokemon-species"]
    );

    localStorage.setItem("poke_data", JSON.stringify(pokedata));
  }

  let table = new DataTable("#pokemon-table", {
    ordering: false,
    info: false,
    data: pokedata["pokemon-species"],
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
  });

  $(document).ready(function () {
    var table = $("#pokemon-table").DataTable();

    $("#pokemon-table tbody").on("click", "tr", function () {
      var data = table.row(this).data();

      const bsOffcanvas = new bootstrap.Offcanvas('#offcanvasPokemon');

      bsOffcanvas.show();

      PokemonPopup(data);

    });
  });

  spinner();
});
