let pokedata;
const USE_CACHE = false;
const SAVE_CACHE = false;
const MAXGENS_TO_FETCH = 10 // MAX number of generations to fetch from api(includes all their pokemon)
const FETCH_LOCAL = true;
let perTypeChart;
let perContentgenChart;

const typesPk = ['Normal', 'Fire', 'Water', 'Grass', 'Flying', 'Fighting', 'Poison'
,'Electric', 'Ground', 'Rock', 'Psychic', 'Ice', 'Bug', 'Ghost', 'Steel', 'Dragon', 'Dark','Fairy'];

const colorsTypesPk = [
  'rgba(153,163,164, 0.4)','rgba(231, 76, 60, 0.4)','rgba(52 ,152,219, 0.4)','rgba(46 ,204,113, 0.4)','rgba(175,122,197, 0.4)',
  'rgba(123, 36, 28, 0.4)','rgba(108, 52,131, 0.4)','rgba(244,208, 63, 0.4)','rgba(228,170,127, 0.4)','rgba(178, 80, 8 , 0.4)',
  'rgba(195,49 ,215, 0.4)','rgba(65 ,234,224, 0.4)','rgba(113,156,104, 0.4)','rgba(108, 80,158, 0.4)','rgba(202,202,202, 0.4)',
  'rgba(105, 29,249, 0.4)','rgba(71, 44, 21 , 0.4)','rgba(250,192,250, 0.4)',
]

const progressBar = document.querySelector(".progress-bar");

let tablePokemon = new DataTable("#pokemon-table", {
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

function createBarCharGenPerType(idCanvasHtml){
  const ctx = document.getElementById(idCanvasHtml).getContext('2d');
  document.getElementById(idCanvasHtml).setAttribute("height", "270");
  let arrayBorderColor =[];
  for(let i = 0; i< typesPk.length; i++){
    arrayBorderColor[i] = colorsTypesPk[i].replace("0.4","0.9");
  }
  
  const data = {
    labels: typesPk,
    datasets: [{
      label: "Tipo",
      backgroundColor: colorsTypesPk,
      borderColor: arrayBorderColor,
      borderWidth: 1
    }]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 200
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Loading...'
        },
      skipNull: false
      }
    }
  };
   perTypeChart = new Chart(ctx,config);
}

function createBarCharNewContentPerGen(idCanvasHtml){
  const ctx = document.getElementById(idCanvasHtml).getContext('2d');
  
  const data = {
    labels: ["Pokemon", "Moves", "Abilities"],
    datasets: [{
      label: "Tipo",
      backgroundColor: [colorsTypesPk[0],colorsTypesPk[2], colorsTypesPk[3]],
      borderColor: [colorsTypesPk[0].replace("0.4","0.9")
      ,colorsTypesPk[2].replace("0.4","0.9"),
       colorsTypesPk[3].replace("0.4","0.9")],
      borderWidth: 1
    }]
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 250
        }
      },
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Loading..'
        },
      skipNull: false
      }
    }
  };
   perContentgenChart = new Chart(ctx,config);
}

function createLineCharNumPoke(idCanvasHtml){

  const ctx = document.getElementById(idCanvasHtml).getContext('2d');

  let dataArray = [];
 
  dataArray[0] =  Object.keys(pokedata['generation'][0]['pokemon']).length;

  for(let i = 1; i < Object.keys(pokedata['generation']).length; i++){

    dataArray[i]=Object.keys(pokedata['generation'][i]['pokemon']).length + dataArray[i-1];
  }

  const data = {
    labels: ["Gen 1","Gen 2","Gen 3","Gen 4","Gen 5","Gen 6","Gen 7","Gen 8"],
    datasets: [
      {
        label: 'Total Pokemones',
        data: dataArray,
        borderColor: colorsTypesPk[15],
        backgroundColor: colorsTypesPk[10],
        pointStyle: 'circle',
        pointRadius: 10,
        pointHoverRadius: 15
      }
    ]
  };

  const config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: (ctx) => 'Pokemones acumulativos por generación' + ctx.chart.data.datasets[0].pointStyle,
        }
      }
    }
  };

  const lineChart = new Chart(ctx,config);

}

function createPieCharMovesPerType(idCanvasHtml, dataPk){

  let dataArray = [];
  for(let i = 0; i< typesPk.length; i++){ 
    if(dataPk[typesPk[i].toLowerCase()]){
      dataArray[i] = dataPk[typesPk[i].toLowerCase()];
    }else{
      dataArray[i] = 0;
    }
  }

  const ctx = document.getElementById(idCanvasHtml).getContext('2d');

  let arrayBorderColor = [];

  for(let i = 0; i< typesPk.length; i++){
    arrayBorderColor[i] = colorsTypesPk[i].replace("0.4","0.9");
  }

  const data = {
    labels: typesPk,
    datasets: [{
      label: "Piechart1",
      data: dataArray,
      backgroundColor: colorsTypesPk,
      borderColor:arrayBorderColor,
      borderWidth: 1
    }]
  };
  const config = {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
    },
  };

   const pieChart = new Chart(ctx,config);
}

function updateChartPerType(chart, dataPk,title){



  let dataArray =[];
  for(let i = 0; i< typesPk.length; i++){ 
    if(dataPk[typesPk[i].toLowerCase()]){
      dataArray[i] = dataPk[typesPk[i].toLowerCase()];
    }else{
      dataArray[i] = 0;
    }

  }

  chart.data.datasets.forEach((dataset) => {

    for(let i =0 ; i < dataArray.length; i++){
      dataset.data[i] = dataArray[i];
    }
  });
  chart.options.scales.y = {
    beginAtZero: true,
    max: Math.max.apply(null, dataArray)+ 5
  };

  chart.options.plugins.title.text = title;

  chart.update({ type: 'color', properties: ['borderColor', 'backgroundColor'], to: 'transparent' });
}

function updateChartNewContentPerGen(chart, dataPk,title, isTotal){

  let dataArray =[]

  if(isTotal){
    dataArray = [pokedata['totalPokemon'], pokedata['totalMoves'], pokedata['totalAbilidades']];
  }else{
    dataArray =[Object.keys(dataPk['pokemon']).length , dataPk['moves'],dataPk['abilities']];
  }
  

  chart.data.datasets.forEach((dataset) => {

    for(let i =0 ; i < dataArray.length; i++){
      dataset.data[i] = dataArray[i];
    }
  });

  chart.options.scales.y = {
    beginAtZero: true,
    max: Math.max.apply(null, dataArray)+ 5
  };

  chart.options.plugins.title.text = title;

  chart.update({ type: 'color', properties: ['borderColor', 'backgroundColor'], to: 'transparent' });
}

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

function cargarDataTable(datosGen,table){
  let datosPk = datosGen['pokemon'];

  table.rows.add(
    Object.values(datosPk)
    ).draw()
    .nodes()
    .to$()
    .addClass(`${datosGen['name']}pk`)

 //Prevents multiple calls to PokemonPopup
 $(document).ready(function () {
    $(`#pokemon-table tbody`).on("click", `tr.${datosGen['name']}pk`, function () {
      
      var data = table.row(this).data();

      const bsOffcanvas = new bootstrap.Offcanvas("#offcanvasPokemon");

      bsOffcanvas.show();

      PokemonPopup(data);
    });
  });

}

function cargarTotalesHeader(totalPokemones,totalMoves,totalItems,totalGeneraciones){
  
  document.querySelector(
    "#h6-totalPokemones"
  ).innerHTML = `${ totalPokemones}`;

  document.querySelector(
    "#h6-totalMovimientos"
  ).innerHTML = `${ totalMoves}`;

  document.querySelector(
    "#h6-totalItems"
  ).innerHTML = `${  totalItems}`;

  document.querySelector(
    "#h6-totalGeneraciones"
  ).innerHTML = `${totalGeneraciones}`;

}

async function processAllFetchData(){
    pokedata = {};
    let poketemp = {};
    let peticiones = [
      'pokemon-species',
      'move',
      'item',
      `generation?limit=${MAXGENS_TO_FETCH}`,
      "type",
      "ability"
    ];

    for (let peticion of peticiones) {
      poketemp[peticion.split("?")[0]] = await fetchPokeApi(peticion);
    }

    pokedata['totalPokemon'] = poketemp['pokemon-species']['count'];
    pokedata['totalMoves'] = poketemp['move']['count'];
    pokedata['totalItems'] = poketemp['item']['count'];
    pokedata['totalAbilidades'] = poketemp['ability']['count'];

    cargarTotalesHeader(
      pokedata['totalPokemon'],
      pokedata['totalMoves'],
      pokedata['totalItems'],
      poketemp["generation"]['count']);

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

    spinner(); //Let the user see the page while its loading other generations

    let selctTypesPerGen = document.querySelector("#bar-char-TiposPk-select");
    let selctNewPerGen = document.querySelector("#bar-char-NewPkGen-select");
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

      cargarDataTable(pokedata["generation"][i],tablePokemon);

      progressBar.setAttribute("style",`width : ${(100*i)/poketemp["generation"]['count']}%`)
      
      i++;

      let text =  gen_data['name'].split('-')[0] + ` ${i}`
      text  = text.charAt(0).toUpperCase() + text.slice(1);

      let htmlOption = `<option value= "${i-1}">${text}</option>`

      selctTypesPerGen.innerHTML += htmlOption;
      selctNewPerGen.innerHTML+= htmlOption;

    }

    dataForGraphPie = {};
  
    for (let key in pokedata['type']) {
      dataForGraphPie[key]= pokedata['type'][key]['moves'];
    }

    
    updateChartPerType(perTypeChart,pokedata['generation'][0]['pokemonPerType'],"Generacion 1");
    updateChartPerType(perContentgenChart, pokedata['generation'][0],"Generacion 1",false);

    createPieCharMovesPerType("pie-char-Move-canvas",dataForGraphPie);

    createLineCharNumPoke("line-char-PokeCant-canvas");

    if(SAVE_CACHE) localStorage.setItem("poke_data", JSON.stringify(pokedata));

    selctTypesPerGen.innerHTML +=`<option value= "-1">Todas las Generaciones</option>`;
    selctNewPerGen.innerHTML += `<option value= "-1">Todas las Generaciones</option>`;

    progressBar.parentNode.parentNode.removeChild(progressBar.parentNode);
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
  let col = pokemon[7];
  if(col == 'white') col = 'teal';

  let config = {
    w: width,
    h: height,
    maxValue: 255,
    levels: 4,
    ExtraWidthX: 200,
    color: d3.scaleOrdinal().range([col]),
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

  if ((USE_CACHE && (pokedata = localStorage.getItem("poke_data"))) || FETCH_LOCAL) {

    if(FETCH_LOCAL){

      let localData = await fetch("./../data/poke_data.json");
      pokedata = await localData.json();

    }else if(!pokedata && USE_CACHE){

      pokedata = JSON.parse(pokedata);

    }

    spinner();
    let selectGenPerType = document.querySelector("#bar-char-TiposPk-select");
    let selectNewPerGen = document.querySelector("#bar-char-NewPkGen-select");

    let genNum = 1
    for(let generation of pokedata['generation']){
      cargarDataTable(generation,tablePokemon);
      /*let option = document.createElement('option');
        option.value = genNum -1;

      */
      let text = generation['name'].split('-')[0] + ` ${genNum}`
      text  = text.charAt(0).toUpperCase() + text.slice(1);

      let htmlOption = `<option value= "${genNum-1}">${text}</option>`

      selectGenPerType.innerHTML += htmlOption;
      selectNewPerGen.innerHTML += htmlOption;
      progressBar.setAttribute("style",`width='${(genNum*100)/pokedata['generation'].length}%'`);
      genNum++;

    }
    
    let htmlOption = `<option value= "-1">Todas las Generaciones</option>`

    selectGenPerType.innerHTML+= htmlOption;
    selectNewPerGen.innerHTML += htmlOption;
    cargarTotalesHeader(pokedata['totalPokemon'],
    pokedata['totalMoves'],
    pokedata['totalItems'],
    pokedata['generation'].length);

    progressBar.parentNode.parentNode.removeChild(progressBar.parentNode);

    let dataForGraph = {}; 
    for (let key in pokedata['type']) {
      dataForGraph[key]= pokedata['type'][key]['pokemon'];
    }
    dataForGraphPie = {};

  
    for (let key in pokedata['type']) {
      dataForGraphPie[key]= pokedata['type'][key]['moves'];
    }


    createPieCharMovesPerType("pie-char-Move-canvas",dataForGraphPie);

    createLineCharNumPoke("line-char-PokeCant-canvas");

    updateChartPerType(perTypeChart,dataForGraph,"Todas las Generaciones");

    updateChartNewContentPerGen(perContentgenChart,null,"Todas las Generaciones", true);

  } else {

    processAllFetchData();

  }
}

document.getElementById("offcanvasPokemon").addEventListener("hide.bs.offcanvas", function () {
    const pokemonInfo = document.querySelector("#offcanvasPokemon-div-info");
    pokemonInfo.parentElement.removeChild(pokemonInfo);
  });

document.addEventListener("DOMContentLoaded", async (event) => {

  createBarCharGenPerType("bar-char-TiposPk-canvas");

  createBarCharNewContentPerGen("bar-char-NewPkGen-canvas");
  await cargarDatos();

});

document.querySelector("#bar-char-TiposPk-select").addEventListener("change", function() {
  
  if(this[this.selectedIndex].value == "-1")
  {
    let dataForGraph = {}; 

    for (let key in pokedata['type']) {
      dataForGraph[key]= pokedata['type'][key]['pokemon'];
    }

    updateChartPerType(perTypeChart,dataForGraph,this[this.selectedIndex].text);

  }else{

    updateChartPerType(perTypeChart,pokedata['generation'][this.value]['pokemonPerType'],this[this.selectedIndex].text);

  }

});

document.querySelector("#bar-char-NewPkGen-select").addEventListener("change", function() {
  
  if(this[this.selectedIndex].value == "-1")
  {
    updateChartNewContentPerGen(perContentgenChart,null,this[this.selectedIndex].text,true);

  }else{

    updateChartNewContentPerGen(perContentgenChart,pokedata['generation'][this.value],this[this.selectedIndex].text,false);

  }

});