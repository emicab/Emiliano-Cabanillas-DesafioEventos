let btnAtras = document.querySelector('.btnAtras');
let contenedor = document.getElementById('contenedor');
let btnMenu = document.getElementById('mainMenu')
let formulario = document.getElementById('form')
let btnIngresar = document.getElementById('btnIngreso')


const intereses = (prestamo, cuotas) => {
    for (let i = 1; i <= cuotas; i++) {
        let tasa = 1.5;
        calculo = (prestamo * tasa) / cuotas;
        valorCuota = (calculo + prestamo) / cuotas;
        totalPrest = calculo * cuotas;
        alert(`El valor de la cuota numero ${i} es: $${calculo}`);
    }
}
const retirar = () =>{
    contenedor.innerHTML = `
    <div class="contenido_Deposito" >
            <h2 class="text-center text-white">Ingrese el monto a retirar</h2>
            <input class="input monto" type="number" name="" id="monto">
            <h2 class="text-center text-white">Ingrese su clave bancaria</h2>
            <input class="input claveUser" type="password" name="" id="claveUser">
            <input type="submit" class="input btnEnviar" id="btnEnviar" value="Aceptar">
    </div>`
    let claveUsuario = document.getElementById('claveUser');
    let montoRetirar = document.getElementById('monto');

    let btnEnviar = document.getElementById('btnEnviar');
    btnEnviar.addEventListener('click', () =>{
        if (claveUsuario.value == Usuario1.clave) {
            if(montoRetirar.value <= Usuario1.dinero.Pesos){
                Usuario1.dinero.Pesos -= parseInt(montoRetirar.value);
                contenedor.innerHTML = `
                    <h2 class="consultasHead text-center text-white">Monto Retirado</h2>
                    <div class="dineroConsulta">
                        <div class="dinero montoDepo">
                        <h3>Retirado:</h3>
                            <span>$${montoRetirar.value}<span>
                        </div>
                        <div class="dinero">
                            <h3>Pesos:</h3>
                            <span>$${Usuario1.dinero.Pesos}<span>
                        </div>
                    </div>`
                    Object.entries(Usuario1.dinero).forEach(e =>{
                        localStorage.setItem(`dinero${e[0]}`, e[1])
                    })
                    Swal.fire({
                        icon: 'success',
                        title: 'Retiro Exitoso',
                        text: 'El dinero se ha retirado con exito!',
                    })
                let movRetiro = 'Has retirado: $' + montoRetirar.value;
                MOVIMIENTOS_CUENTA.push(movRetiro);
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Parece que no tienes saldo suficiente!',
                })
            }
        }else{
            claveUsuario.style.borderColor = '#f00'
            claveUsuario.style.borderStyle = 'solid'
            claveUsuario.style.borderWidth = '2px'
            }
    })
}

class CuentaBanco{
    constructor(nombre, dinero, clave){
        this.nombre = nombre;
        this.dinero = dinero;
        this.clave = clave;
    }
}

btnIngresar.addEventListener('click', () =>{
    ingresoUser();
})

function ingresarDatosForm(){
    formulario.onsubmit = (event) => ingresoUser(event)
}

let nombreUserInput = document.getElementById('nombreUser');
let dineroUserInput = document.getElementById('dineroUser');
let claveUserInput = document.getElementById('claveUser');

const validarIngreso = () =>{
    if(typeof localStorage.nombreUsuario === 'string'){
        menuPricipal()
        nombreLS = localStorage.getItem('nombreUsuario');
        Usuario1.nombre = nombreLS;
        dineroLS = localStorage.getItem('dineroPesos')
        Usuario1.dinero.Pesos = dineroLS;
    }else{
        
    }
}
//Boton Ingresar. Obtiene datos de los inputs y los envia al Objeto Usuario1 y al localStorage.
function ingresoUser(){    
    document.title = `??Bienvenido ${nombreUserInput.value}!`
    Usuario1.nombre = nombreUserInput.value
    Usuario1.clave = claveUserInput.value
    Usuario1.dinero.Pesos = parseInt(dineroUserInput.value)
    localStorage.setItem('nombreUsuario', Usuario1.nombre)
    Object.entries(Usuario1.dinero).forEach(e =>{
        localStorage.setItem(`dinero${e[0]}`, e[1])
    })
    localStorage.setItem('claveUser', Usuario1.clave)
    
    console.log(Usuario1.clave);
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: `Bienvenido ${Usuario1.nombre}`,
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        menuPricipal();
      }, 2000);
}
let Usuario1 = new CuentaBanco('', {Pesos: 0, Dolares: 100, Euros: 500, Reales: 460}, claveUserInput)

// boton Salir. Refresca la pagina y elimina datos de localStorage
let btnSalir = document.getElementById('btnSalir')
btnSalir.addEventListener('click', _ => {
    location.reload();
    for(datos in localStorage){
        localStorage.removeItem(datos)
    }
});



const MONEDAS_EXTRANJERAS = [[{Divisa: "Dolar Venta", Precio: "130,25"},{Divisa: "Dolar Compra", Precio: "124.25"}], [{Divisa: "Euro Venta", Precio: "135,00"}, {Divisa: "Euro Compra", Precio: "128.00"}], [{Divisa: "Real Venta", Precio: "25,80"}, {Divisa: "Real compra", Precio: "21.80"}]]

let impuestoSolidario = 0.30;
let impuesto = 0.35;
const MONEDA_IMPUESTO = MONEDAS_EXTRANJERAS.map(moneda =>{
    if(moneda[0].Divisa == 'Real Venta' ) moneda.Precio   
    return{
        ...moneda.Precio,
        moneda : parseFloat(moneda[0].Precio) + (parseFloat(moneda[0].Precio) * (impuesto + impuestoSolidario))
    }
})

const MOVIMIENTOS_CUENTA = [];

const menuPricipal = () => {
    btnMenu.style.display = 'block'
    btnSalir.style.display = 'block'
    const bienvenida = document.querySelector('.bienvenida');
    bienvenida.innerHTML = `??Bienvenido ${Usuario1.nombre}!`;
    contenedor.innerHTML = `
    <h3 class="tituloMenu text-center h2 mb-3 text-uppercase text-white">Menu Principal</h3>
            <div class="row d-flex justify-content-center gap-4">
                <div id="consultas" class="opciones col-lg-3 col-sm-5 col-4 text-center" onclick="consultar()">
                    <h2>Consultas</h2>
                    <i class="fa-solid fa-circle-question"></i>
                </div>
                <div id="deposito" class="opciones col-lg-3 col-sm-5 col-4 text-center" onclick="deposito()">
                    <h2>Depositar</h2>
                    <i class="fa-solid fa-arrow-down-to-line"></i>
                </div>
                <div id="retiro" class="opciones col-lg-3 col-sm-5 col-4 text-center" onclick="retirar()">
                    <h2>Retirar</h2>
                </div>
                <div id="divisas" class="desabilitado opciones col-lg-3 col-sm-5 col-4 text-center" "onclick="compraDivisa()"">
                    <h2>Divisas</h2>
                </div>
                <div id="prestamos" class="desabilitado opciones col-lg-3 col-sm-5 col-4 text-center" onclick="prestamo()">
                    <h2>Prestamos</h2>
                </div>
                <div id="movimientos" class="desabilitado opciones col-lg-3 col-sm-5 col-4 text-center" "onclick="movimientos()"">
                    <h2>Movimientos</h2>
                </div>
            </div>
            
        `
    }
    
// menuPricipal();


const consultar = () =>{
    // contenedor = '';
    contenedor.innerHTML =
    `<h2 class="consultasHead text-center mb-5 text-white">Tu dinero disponible:</h2>
    <div class="dineroConsulta ">
        <div class="dinero">
        <h3>Pesos:</h3>
        <span>$${Usuario1.dinero.Pesos}<span>
        </div>
        <div class="dinero">
            <h3>Dolar:</h3>
            <span>USD$${Usuario1.dinero.Dolares}<span>
        </div>
        <div class="dinero">
            <h3>Euros:</h3>
            <span>???${Usuario1.dinero.Euros}<span>
        </div>
        <div class="dinero">
            <h3>Real:</h3>
            <span>R$${Usuario1.dinero.Reales}<span>
        </div>
    </div>
            `
        }
const deposito = () => {
    contenedor.innerHTML = 
    `
    <div class="container-depo">
        <div class="contenido_Deposito" >
            <h2 class="text-center">Ingrese el monto a depositar</h2>
            <input class="input monto" type="number" name="" id="monto">
            <input type="submit" class="input" id="btnEnviar" value="Aceptar">
        </div>
    </div>
    <button id="mainMenu">Regresar al Menu Principal</button>
    `
    let btnEnviar = document.getElementById('btnEnviar');
    let deposito = document.getElementById("monto");
    
    btnEnviar.addEventListener('click', () =>{
        Usuario1.dinero.Pesos += parseInt(deposito.value);
        contenedor.innerHTML = `
        <h2 class="consultasHead text-white text-center">Monto Depositado</h2>
        <div class="dineroConsulta">
            <div class="dinero montoDepo">
            <h3>Depositado:</h3>
                <span>$${deposito.value}<span>
            </div>
            <div class="dinero">
                <h3>Pesos:</h3>
                <span>$${Usuario1.dinero.Pesos}<span>
            </div>
        </div>
        <button id="mainMenu" onclick="menuPrincipal()">Regresar al Menu Principal</button>
        `
        Object.entries(Usuario1.dinero).forEach(e =>{
            localStorage.setItem(`dinero${e[0]}`, e[1])
        })
        Swal.fire({
            icon: 'success',
            title: 'Deposito Exitoso',
            text: 'El dinero se ha depositado con exito!',
        })
    })
                let movDepo = 'Has depositado: $' + deposito;
                    MOVIMIENTOS_CUENTA.push(movDepo) 
}
const prestamo = () => {
    /*contenedor.innerHTML = 
    `
    <h2>Ingrese el monto a solicitar</h2>
    <input type="number" name="" id="montoSolicitado">
    `
    let prestamo = parseInt(prompt(''));
                let cuotas = parseInt(prompt('Ingrese el numero de cuotas desea devolver el prestamo'));
                intereses(prestamo, cuotas);
                // alert(`Lo que debera pagar es: ${cuotas} cuotas de $${calculo} con un total de $${totalPrest}`);
                let aprobarPrestamo = confirm('Desea confirmar el prestamo?');
                if (aprobarPrestamo == true) {
                    Usuario1.dinero.Pesos += prestamo;
                    contenedor.innerHTML = `
                    <h2 class="consultasHead">Prestamo Solcitado</h2>
                    <div class="dineroConsulta">
                        <div class="dinero">
                        <h3>Prestamo:</h3>
                            <span>$${prestamo}<span>
                        </div>
                        <div class="dinero">
                            <h3>Pesos:</h3>
                            <span>$${Usuario1.dinero.Pesos}<span>
                        </div>
                    </div>`
                    // alert('Su saldo actual es: $' + Usuario1.dinero.Pesos);
                    let movPres = 'Has solicitado un prestamo de: $' + prestamo;
                        MOVIMIENTOS_CUENTA.push(movPres)
                } else {
                    
                    contenedor.innerHTML = `
                    <h3>El prestamo ha sido cancelado</h3>
                    `
                } */
}
const compraDivisa = () => {
    let divisasComprar = prompt('Seleccione la moneda que quiere comprar: \n 1. Dolar \n 2. Euro \n 3. Real')
                if(divisasComprar == 1){
                    let dolares = prompt('Por favor, indique cuantos dolares quiere comprar')
                    monto = dolares * MONEDA_IMPUESTO[0].moneda;
                    if (monto > Usuario1.dinero.Pesos) {
                        contenedor.innerHTML = `
                        <h2 class="noSaldo">No tienes saldo suficiente para realizar la compra.</h2>
                        <h2 class="noSaldo">Estas intentando comprar USD$${monto}.</h2>
                        <h2 class="noSaldo">Tu saldo en pesos es de $${Usuario1.dinero.Pesos}.</h2>
                        `
                    }else{
                        alert(`Has comprado USD$${monto}.`);
                        Usuario1.dinero.Dolares += monto;
                        Usuario1.dinero.Pesos -= MONEDA_IMPUESTO[0].moneda * dolares;
                        contenedor.innerHTML = `
                        <h2 class="consultasDivisasHead">Precio de Divisas</h2>
                        <div class="precioDivisas">
                            <div class="divisa">
                                <h3>Dolar Venta</h3>
                                <span>$${MONEDAS_EXTRANJERAS[0][0].Precio}<span>
                            </div>
                            <div class="divisa">
                                <h3>Dolar Compra</h3>
                                <span>$${MONEDAS_EXTRANJERAS[0][1].Precio}<span>
                            </div>
                        </div>
                        <h2 class="consultasHead">Compra de Dolares</h2>
                        <div class="dineroConsulta">
                            <div class="dinero montoDepo">
                            <h3>Dolares</h3>
                                <span>USD$${Usuario1.dinero.Euros}<span>
                            </div>
                            <div class="dinero montoDepo">
                                <h3>Pesos:</h3>
                                <span>$${Usuario1.dinero.Pesos}<span>
                            </div>
                        </div>`
                        let movDivisa = `Has comprado USD$${monto}.`;
                        alert(`Tu saldo actual en pesos es de: $${Usuario1.dinero.Pesos}`)
                        MOVIMIENTOS_CUENTA.push(movDivisa);
                    }
                }
                else if(divisasComprar == 2){
                    let euros = prompt('Por favor, indique cuantos dolares quiere comprar')
                    monto = euros * MONEDA_IMPUESTO[1].moneda;
                    if (monto > Usuario1.dinero.Pesos) {
                        contenedor.innerHTML = `
                        <h2 class="noSaldo">No tienes saldo suficiente para realizar la compra.</h2>
                        <h2 class="noSaldo">Estas intentando comprar ???${monto}.</h2>
                        <h2 class="noSaldo">Tu saldo en pesos es de $${Usuario1.dinero.Pesos}.</h2>
                        `
                    }else{
                        alert(`Has comprado ???${monto}.`);
                        Usuario1.dinero.Euros += monto;
                        Usuario1.dinero.Pesos -= MONEDA_IMPUESTO[1].moneda * euros;
                        contenedor.innerHTML = `
                        <h2 class="consultasHead">Precio de Divisas</h2>
                        <div class="precioDivisas">
                            <div class="divisa">
                                <h3>Euros Venta</h3>
                                <span>???${MONEDAS_EXTRANJERAS[1][0].Precio}<span>
                            </div>
                            <div class="divisa">
                                <h3>Euros Compra</h3>
                                <span>???e${MONEDAS_EXTRANJERAS[1][1].Precio}<span>
                            </div>
                        </div>
                        <h2 class="consultasHead">Compra de Euros</h2>
                        <div class="dineroConsulta">
                            <div class="dinero montoDepo">
                            <h3>Euros</h3>
                                <span>???${Usuario1.dinero.Euros}<span>
                            </div>
                            <div class="dinero">
                                <h3>Pesos:</h3>
                                <span>$${Usuario1.dinero.Pesos}<span>
                            </div>
                        </div>`
                        let movDivisa = `Has comprado ???${monto}.`;
                        alert(`Tu saldo actual en pesos es de: $${Usuario1.dinero.Pesos}`)
                        MOVIMIENTOS_CUENTA.push(movDivisa);
                    }
                }
                else if(divisasComprar == 3){
                    let reales = prompt('Por favor, indique cuantos dolares quiere comprar')
                    monto = reales * MONEDA_IMPUESTO[2].moneda;
                    if (monto > Usuario1.dinero.Pesos) {
                        contenedor.innerHTML = `
                        <h2 class="noSaldo">No tienes saldo suficiente para realizar la compra.</h2>
                        <h2 class="noSaldo">Estas intentando comprar R$${monto}.</h2>
                        <h2 class="noSaldo">Tu saldo en pesos es de $${Usuario1.dinero.Pesos}.</h2>
                        `
                    }else{
                        alert(`Has comprado R$${monto}.`);
                        Usuario1.dinero.Reales += monto;
                        Usuario1.dinero.Pesos -= MONEDA_IMPUESTO[2].moneda * reales;
                        let movDivisa = `Has comprado R$${monto}.`;
                        alert(`Tu saldo actual en pesos es de: $${Usuario1.dinero.Pesos}`)
                        MOVIMIENTOS_CUENTA.push(movDivisa);
                    }
                }else{
                    alert('Opcion no disponible')
                }
}
const movimientos = () => {
    contenedor.innerHTML = '';
                console.log(MOVIMIENTOS_CUENTA);
                alert('Cargando los movimientos de tu cuenta...');
                for(movimientos in MOVIMIENTOS_CUENTA){
                    contenedor.innerHTML += `
                    <h2>${MOVIMIENTOS_CUENTA[movimientos]}</h2>
                    `
                    console.log(MOVIMIENTOS_CUENTA[movimientos]);
                }
}
btnMenu.addEventListener('click', () => {menuPricipal()})



