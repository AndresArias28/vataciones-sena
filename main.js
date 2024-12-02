

fetch("https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json")
    .then(respuesta => respuesta.json()) // Convertimos la respuesta a JSON
    .then(datos => {

        fetch("https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/administrador.json")
            .then(respuesta => respuesta.json()) // Convertimos la respuesta a JSON
            .then(administrador => {
                console.log(administrador);
                
                let el = document.querySelector("#bot");
                let username = document.querySelector("#input");
                let password = document.querySelector("#input2");
                let botonIniciar = document.querySelector("#botonIniciar");
                botonIniciar.addEventListener("click", () => {
                    let aux = false;
                    if (administrador.username === username && administrador.password === password) {
                        aux = true;
                        console.log("datos correctos");
                    } else {
                        aux = false;
                        console.log("datpos incorrectos");
                    }

                })

                if (administrador.username === "admin" && administrador.password === "adso2874057") {
                    aux = true;
                } else {
                    aux = false;
                    console.log("datpos incorrectos");


                    card.querySelector("img").addEventListener("click", () => {

                    })
                }
            });


        let candidatos = document.querySelector("#candidatos");
        datos.forEach(candidato => {
            let contadorVotosBlanco = 0;
            let contadorVotosAna = 0;
            let contadorVotosJuan = 0;
            let contadorVotosCarlos = 0;

            let card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
       <h2>Curso: ${candidato.curso}</h2>
        <img src="${candidato.foto}" >
       
        <p> <strong>Aprendiz:</strong> ${candidato.nombre} ${candidato.apellido}</p>
        <p>Ficha: ${candidato.ficha}</p>
        `;

            //ayudame a registrar el voto al dar clkieck en la imagen
            card.querySelector("img").addEventListener("click", () => {

                if (candidato.nombre === "Blanco") {
                    contadorVotosBlanco++;
                }
                if (candidato.nombre === "Ana") {
                    contadorVotosAna++;
                }
                if (candidato.nombre === "Juan") {
                    contadorVotosJuan++;
                }
                if (candidato.nombre === "Carlos") {
                    contadorVotosCarlos++;
                }
            })


            candidatos.appendChild(card);
            //dame estilos
            card.style.border = '1px solid black';
            card.style.padding = '10px';
            card.style.margin = '10px';
            card.style.borderRadius = '5px';
            card.style.width = '200px';
            card.style.height = '200px';

        })
    })