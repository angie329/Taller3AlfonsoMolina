//calculadora
const numA = document.getElementById('numA');
const numB = document.getElementById('numB');
const CalcResul = document.getElementById('resul');
const CalcError = document.getElementById('err');
const buttons = document.querySelectorAll('#calculadora .buttons button');

//registro
const form = document.getElementById('registro');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const password = document.getElementById('password');
const nac = document.getElementById('nac');
const formMensaje = document.getElementById('formMensaje');
const passCount = document.getElementById('passCount');
const nameCount = document.getElementById('nameCount');

//fecha
const fecha1 = document.getElementById('fecha1');
const fecha2 = document.getElementById('fecha2');
const btndif = document.getElementById('diferencia');
const fechaResul = document.getElementById('fechaResul');
const fechaError = document.getElementById('fechaErr');

//funciones

function setMessage(element, text, type='info'){
    element.textContent= text;
    element.classList.remove('error', 'success', info);
    element.classList.add(type);

}

function clearMessage(element){
    element.textContent= '';
    element.classList.remove('error', 'success', info);

}


//funciones d calculadora
function calcularOp(op, a, b){
    switch(op){
        case'sum':
            return a + b;
        case'res':
            return a - b;
        case'mul':
            return a * b;
        case'div':
            if (b==0)
                return {error: 'div-zero'};
            return a / b;
    }
}

//validaciones
function validarCalc(aOr, bOr){
    if(a === '' || b === '') return { ok: false, message: 'Complete los dos campos' };
    const a = parseFloat(aOr);
    const b = parseFloat(bOr);
    if(Number.isNaN(a) || Number.isNaN(b)) return {ok: false, message: 'Ingrese números válidos'};
    return { ok: true, a, b};
}


//mostrar
function mostrarCalc(res){
    if(typeof res === 'object' && res.error){
        if(res.error === 'div-zero'){
            setMessage(CalcError, 'No se puede dividir entre cero.', 'error');
            clearMessage(CalcResul);
            return;
        }
        setMessage(CalcError, 'Error en la operación', 'error');
        clearMessage(CalcResul);
        return;
    }
    clearMessage(CalcError);
    setMessage(CalcResul, 'Resultado: ${res}', 'success');
}

//botones

buttons.forEach(btn =>{
    btn.addEventListener('click', () =>{
        clearMessage(CalcError);
        clearMessage(CalcResul);
        const op = btn.dataset.op;
        const aOr = numA.value.trim();
        const bOr = numB.value.trim();
        const valid = validarCalc(aOr, bOr);
        if(!valid.ok){
            setMessage(CalcError, valid.message,'error');
            return;
        }
        const result = calcularOp(op, valid.a, valid.b);
        mostrarCalc(result);

    });
});

//fechas

//funciones
function calcularDiferencia(f1,f2){
    const fecha1 = new Date(f1);
    const fecha2 = new Date(f2);
    const diff = Math.abs(fecha2 - fecha1);
    return Math.floor(diff/(1000*60*60*24));
}

btndif.addEventListener('click', () => {
    clearMessage(fechaResul);
    clearMessage(fechaError);

    const v1= fecha1.value;
    const v2= fecha2.value;

    if(!v1 || !v2){
        setMessage(fechaError, 'Seleccione ambas fechas', 'error');
        return;
    }
    const dias = calcularDiferencia(v1, v2);
    setMessage(fechaResul, 'Diferencia: ${dias} dias(s)', 'success');
});

//reinicio

updateCounters();
clearMessage(fechaError);
clearMessage(fechaResul);
clearMessage(formMensaje);
clearMessage(CalcError);
clearMessage(CalcResul);