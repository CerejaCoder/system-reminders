import {login, check} from '/controllers/user.js'

const form = document.querySelector('form');
const notify = document.querySelector('#notify');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const loginUser = document.querySelector('#login').value;
    const senhaUser = document.querySelector('#password').value;
    const res = await login(loginUser, senhaUser);
    
    if (res.type === 'sucesso'){
        localStorage.setItem('token', res.token);
        window.location.href = '/pages/index/index.html';
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

async function verify(){
    const token = localStorage.getItem('token');

    if (token != ''){
        if ((await check(token)).type === 'aviso'){
            window.location.href = '/pages/index/index.html';
        }
    }
}

await verify();