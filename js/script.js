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

function setMessage(element, text, type = 'info') {
    element.textContent = text;
    element.classList.remove('error', 'success', 'info');
    element.classList.add(type);
}

function clearMessage(element) {
    element.textContent = '';
    element.classList.remove('error', 'success', 'info');
}

//funciones d calculadora
function calcularOp(op, a, b) {
    switch (op) {
        case 'sum':
            return a + b;
        case 'res':
            return a - b;
        case 'mul':
            return a * b;
        case 'div':
            if (b === 0)
                return { error: 'div-zero' };
            return a / b;
    }
}

//validaciones
function validarCalc(aOr, bOr) {
    if (aOr === '' || bOr === '') return { ok: false, message: 'Complete los dos campos' };
    const a = parseFloat(aOr);
    const b = parseFloat(bOr);
    if (Number.isNaN(a) || Number.isNaN(b)) return { ok: false, message: 'Ingrese números válidos' };
    return { ok: true, a, b };
}

//mostrar
function mostrarCalc(res) {
    if (typeof res === 'object' && res.error) {
        if (res.error === 'div-zero') {
            setMessage(CalcError, 'No se puede dividir entre cero.', 'error');
            clearMessage(CalcResul);
            return;
        }
        setMessage(CalcError, 'Error en la operación', 'error');
        clearMessage(CalcResul);
        return;
    }
    clearMessage(CalcError);
    setMessage(CalcResul, `Resultado: ${res}`, 'success');
}

//botones
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        clearMessage(CalcError);
        clearMessage(CalcResul);
        const op = btn.dataset.op;
        const aOr = numA.value.trim();
        const bOr = numB.value.trim();
        const valid = validarCalc(aOr, bOr);
        if (!valid.ok) {
            setMessage(CalcError, valid.message, 'error');
            return;
        }
        const result = calcularOp(op, valid.a, valid.b);
        mostrarCalc(result);
    });
});

//registros
//funciones
function validacionForm(values) {
    const errors = [];

    if (!values.nombre || values.nombre.length < 3) {
        errors.push("Nombre mínimo 3 caracteres");
    }

    if (!values.email || !validarEmail(values.email)) {
        errors.push("Correo inválido");
    }

    if (!values.password || values.password.length < 6) {
        errors.push("Contraseña mínima 6 caracteres");
    }

    if (!values.nac) {
        errors.push("Ingrese su fecha de nacimiento");
    }

    return errors;
}

function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

nombre.addEventListener('input', () => {
    nameCount.textContent = `${nombre.value.length} caracteres`;
});

password.addEventListener('input', () => {
    passCount.textContent = `${password.value.length} caracteres`;
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearMessage(formMensaje);

    const values = {
        nombre: nombre.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        nac: nac.value
    };

    const errors = validacionForm(values);
    if (errors.length > 0) {
        setMessage(formMensaje, errors.join(', '), 'error');
        return;
    }

    setMessage(formMensaje, `Registro exitoso: ${values.nombre}`, 'success');
    form.reset();
    nameCount.textContent = '0 caracteres';
    passCount.textContent = '0 caracteres';
});

//fechas
//funciones
function calcularDiferencia(f1, f2) {
    const fecha1 = new Date(f1);
    const fecha2 = new Date(f2);
    const diff = Math.abs(fecha2 - fecha1);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

btndif.addEventListener('click', () => {
    clearMessage(fechaResul);
    clearMessage(fechaError);

    const v1 = fecha1.value;
    const v2 = fecha2.value;

    if (!v1 || !v2) {
        setMessage(fechaError, 'Seleccione ambas fechas', 'error');
        return;
    }
    const dias = calcularDiferencia(v1, v2);
    setMessage(fechaResul, `Diferencia: ${dias} día(s)`, 'success');
});

//reinicio
function updateCounters() {
    nameCount.textContent = `${nombre.value.length} caracteres`;
    passCount.textContent = `${password.value.length} caracteres`;
}

updateCounters();
clearMessage(fechaError);
clearMessage(fechaResul);
clearMessage(formMensaje);
clearMessage(CalcError);
clearMessage(CalcResul);
