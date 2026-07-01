window.addEventListener('load', () => {
    const textoElemento = document.getElementById('texto-animado');
    const barra = document.getElementById('barra-progreso');
    const loader = document.getElementById('loader');
    const portafolio = document.getElementById('portafolio');

    if (sessionStorage.getItem("sinLoader")) {
        if (loader) loader.style.display = "none";
        if (portafolio) portafolio.style.display = "block";

        sessionStorage.removeItem("sinLoader");
        animarTexto();
        return; 
    }

    const saludo = 'Bienvenido';
    let i = 0;

    function escribirBienvenida() {
        if (i < saludo.length) {
            textoElemento.textContent += saludo.charAt(i);
            i++;

            if (barra) {
                const progreso = (i / saludo.length) * 100;
                barra.style.width = progreso + '%';
            }

            setTimeout(escribirBienvenida, 120);
        } else {

            setTimeout(finalizarCarga, 1000);
        }
    }

    function finalizarCarga() {
        loader.classList.add('loader-oculto');
        if (portafolio) {
            portafolio.style.display = 'block';
            animarTexto();
        }
        setTimeout(() => loader.remove(), 600);
    }

    escribirBienvenida();
});

const textoDinamico = document.getElementById('maquina-escribir');
const frases = ['Ingeniería de Sistemas', 'Desarrollador Frontend'];
let fraseIndex = 0;
let caracterIndex = 0;
let borrando = false;

function animarTexto() {
    const fraseActual = frases[fraseIndex];

    if (borrando) {
        textoDinamico.textContent = fraseActual.substring(0, caracterIndex - 1);
        caracterIndex--;
    } else {
        textoDinamico.textContent = fraseActual.substring(0, caracterIndex + 1);
        caracterIndex++;
    }

    let velocidad = borrando ? 50 : 100;

    if (!borrando && caracterIndex === fraseActual.length) {
        velocidad = 2000;
        borrando = true;
    } else if (borrando && caracterIndex === 0) {
        borrando = false;
        fraseIndex = (fraseIndex + 1) % frases.length;
        velocidad = 500;
    }

    setTimeout(animarTexto, velocidad);
}

const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
});