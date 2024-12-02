document.addEventListener("DOMContentLoaded", () => {

    // URLs de los archivos JSON

    const URL_CANDIDATOS = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/candidatos.json";
    const URL_ADMINISTRADOR = "https://raw.githubusercontent.com/cesarmcuellar/Elecciones/refs/heads/main/administrador.json";

    const botonIniciar = document.querySelector("#botonIniciar");
    let usernameInput = document.querySelector("#input");
    let passwordInput = document.querySelector("#input2");
    let candDiv = document.querySelector("#divCandidatos");
    const contenedorResultados = document.querySelector("#resultados");
    let candidatos = [];
    candDiv.classList.add("bloqueado");
    // Obtener datos de los candidatos y administrador
    fetch(URL_CANDIDATOS)
        .then(respuesta => respuesta.json())
        .then(data => {
            candidatos = data;
            fetch(URL_ADMINISTRADOR)
                .then(respuesta => respuesta.json())
                .then(administrador => {
                    configurarInicioSesion(administrador); // Configurar inicio de sesión
                    mostrarCandidatos(candidatos); // Mostrar candidatos
                })
                .catch(error => console.error("Error al obtener administrador:", error));
        })
        .catch(error => console.error("Error al obtener candidatos:", error));

    // Configurar lógica para el inicio de sesión
    function configurarInicioSesion(administrador) {

        botonIniciar.addEventListener("click", () => {
            // Obtener los valores de los campos de texto
            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();

            // Verificar las credenciales
            if (username === administrador.username && password === administrador.password) {
                // Alternar el estado de "bloqueado" y "desbloqueado"
                if (candDiv.classList.contains("desbloqueado")) {
                    candDiv.classList.remove("desbloqueado");
                    botonIniciar.textContent = "Abrir votación";
                    crearBotonResultados(candidatos);
                } else {
                    candDiv.classList.add("desbloqueado");
                    botonIniciar.textContent = "Cerrar votación";
                    eliminarBotonResultados();
                }
            } else {
                console.log("Datos incorrectos");
            }
            // Limpia las cajas de texto después de hacer clic
            usernameInput.value = "";
            passwordInput.value = "";
        });
    }

    // Mostrar candidatos en la interfaz
    function mostrarCandidatos(datos) {
        const contenedorCandidatos = document.querySelector("#divCandidatos");

        // Contadores de votos
        let contadorVotos = {
            Blanco: 0,
            Ana: 0,
            Juan: 0,
            Carlos: 0
        };

        datos.forEach(candidato => {
            // Crear tarjeta para el candidato
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
            <h2> ${candidato.curso}</h2>
            <img src="${candidato.foto}" alt="Foto de ${candidato.nombre}">
            <p><strong>Aprendiz:</strong> ${candidato.nombre} ${candidato.apellido}</p>
            <p>Ficha: ${candidato.ficha}</p>
        `;

            // Registrar el voto al hacer clic en la imagen
            card.querySelector("img").addEventListener("click", () => {

                if (contadorVotos[candidato.nombre] !== undefined) {
                    contadorVotos[candidato.nombre]++;
                    // console.log(`Voto registrado para ${candidato.nombre}. Total: ${contadorVotos[candidato.nombre]}`);
                    //almacenar en local storage
                    localStorage.setItem(candidato.nombre, contadorVotos[candidato.nombre]);

                } else {
                    console.log(`Candidato no reconocido: ${candidato.nombre}`);
                }
            });

            // Aplicar estilos a la tarjeta
            card.style.border = "1px solid black";
            card.style.padding = "10px";
            card.style.margin = "10px";
            card.style.borderRadius = "5px";
            card.style.width = "200px";
            card.style.height = "200px";

            // Agregar tarjeta al contenedor
            contenedorCandidatos.appendChild(card);
        });
    }

    function crearBotonResultados(candidatos) {
        // Crear botón
        const botonResultados = document.createElement("button");
        botonResultados.textContent = "Mostrar resultados";
        botonResultados.id = "botonResultados";
        botonResultados.style.marginTop = "20px";

        // Agregar evento para mostrar los resultados
        botonResultados.addEventListener("click", () => {
            mostrarResultados(candidatos);
        });

        // Agregar botón al contenedor de resultados
        contenedorResultados.appendChild(botonResultados);
    }

    function eliminarBotonResultados() {
        const botonResultados = document.querySelector("#botonResultados");
        if (botonResultados) {
            botonResultados.remove();
        }
    }

    function mostrarResultados(candidatos) {
        contenedorResultados.innerHTML = "<h2>Resultados:</h2>";
        candidatos.forEach(candidato => {
            const resultado = document.createElement("p");
            const votos = localStorage.getItem(candidato.nombre) || 0;
            resultado.textContent = `${candidato.nombre} ${candidato.apellido}: ${votos} votos`;
            contenedorResultados.appendChild(resultado);
        });
    }
});