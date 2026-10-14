import {cadastrar} from '/controllers/user.js'

const form = document.querySelector('form');
const notify = document.querySelector('#notify');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loginUser = document.querySelector('#login').value;
    const senhaUser = document.querySelector('#password').value;
    const res = await cadastrar(loginUser, senhaUser);
    
    if (res.type === 'sucesso'){
        window.location.href = '/pages/login/login.html';
    } else {
        sendNotify('Erro ❌', res.msg);
    }
});

function sendNotify(title, body){
    const titleNotify = document.querySelector('.titleNotify');
    const bodyNotify = document.querySelector('.bodyNotify');

    titleNotify.innerText = title;
    bodyNotify.innerText = body;

    notify.click();
}