

window.addEventListener('load', (event) => {

    let selector = document.querySelector("#productsNameSelector");
    let tabla = document.querySelector("#productsTable");


    selector.addEventListener("change", (event)=>{

        console.log(event.target)

        let nombreProducto = event.target.value;
    
        console.log(nombreProducto);
    
        fetch("https://dawmproject-default-rtdb.firebaseio.com/collection")
        .then( response => response.json)
        .then(data =>{
    
            let datos = data.filter(obj => obj.productoNombre == nombreProducto );
    
            // for(let i = datos.length - 1; i >= 0; i--){
    
            //     let htmlDato = ` <tr>  
            //     <td>${datos[i].id}</td>  
            //     <td>${datos[i].nombre}</td>   
            //     <td>${datos[i].cantidad}</td>  
            //     <td>${datos[i].createdAt.toLocaleDateString('en-US')}></td>  
            //     <td>  
            //         <a href="#" class="settings" title="Settings" data-toggle="tooltip"><i class="material-icons">&#xE8B8;</i></a>  
            //         <a href="#" class="delete" title="Delete" data-toggle="tooltip"><i class="material-icons">&#xE5C9;</i></a>  
            //     </td>  
            //   </tr>  
            //   `
    
            // }
    
    
        });
        
    
    });
 




});

