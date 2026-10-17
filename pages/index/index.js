import {logout, check} from '/controllers/user.js';
import {get_lembretes, get_lembrete, create_reminder, edit_reminder, delete_reminder} from '/controllers/reminder.js';

const countReminders = document.querySelector('#countReminders');
const exit = document.querySelector('#logout');
const search = document.querySelector('#search');
const notify = document.querySelector('#notify');
const radioListReminders = document.querySelector('#radioListReminders');
const radioCreateReminder = document.querySelector('#radioCreateReminder');
const notifyIcon = document.querySelector('#notifyIcon');

notifyIcon.addEventListener('click', () => {
    radioListReminders.checked = true;
    loadReminders();
});
radioCreateReminder.addEventListener('change', async () => await createFormCreateNotify());
radioListReminders.addEventListener('change', () => loadReminders());
exit.addEventListener('click', logoutUser);
search.addEventListener('keydown', async (e) => {
    let name = e.target.value.trim().toLowerCase();
    const lastKeydown = e.key.toLowerCase();

    if (lastKeydown === 'alt' || lastKeydown === 'backspace') name = name.slice(0, name.length - 1);
    else name += lastKeydown;

    if (!name) loadReminders();
    else {
        const reminders = await searchByReminderName(name);
        
        loading();

        if (reminders.length > 0){
            for (const reminder of reminders){
                const dateTime = reminder.data.split(' ');
                const data = dateTime[0].split('-');
                const formattedDate = `Data: ${data[2]}/${data[1]}/${data[0]}`;
                const formattedTime = `Horário de Criação: ${dateTime[1].split('.')[0]}`;
                
                create_card(reminder.texto, formattedDate, formattedTime, reminder.id);
            }   
        } else {
            informationNotReminders();
        }

        closeLoading();
    }
});

function create_card(title, date, time, id){
    const article = document.querySelector('#mainArticle');

    const card = document.createElement('div');
    const bodyCard = document.createElement('div');
    const titleCard = document.createElement('h2');
    const dateCard = document.createElement('p');

    const cardActions = document.createElement('div');
    const btnEdit = document.createElement('button');
    const btnDelete = document.createElement('button');

    card.classList.add('card', 'bg-base-100', 'shadow-sm', 'w-full');
    bodyCard.classList.add('card-body', 'w-full', 'gap-4');
    titleCard.classList.add('card-title');
    
    cardActions.classList.add('card-actions', 'justify-end');
    btnEdit.classList.add('btn', 'btn-primary');
    btnDelete.classList.add('btn', 'btn-neutral');

    titleCard.innerText = title;
    dateCard.innerHTML = `${date}<br>${time}`;

    btnEdit.innerText = 'Editar';
    btnDelete.innerText = 'Deletar';

    btnEdit.value = id;
    btnDelete.value = id;

    btnEdit.value = id;
    btnEdit.addEventListener('click', () => editReminder(id));

    btnDelete.addEventListener('click', (e) => {
        deleteReminder(id);
        e.target.parentElement.parentElement.parentElement.remove();
    });

    cardActions.append(btnEdit, btnDelete);
    bodyCard.append(titleCard, dateCard, cardActions);
    card.append(bodyCard);

    article.append(card);
}

function sendNotify(title, body){
    const titleNotify = document.querySelector('.titleNotify');
    const bodyNotify = document.querySelector('.bodyNotify');

    titleNotify.innerText = title;
    bodyNotify.innerText = body;

    notify.click();
}

function loading(){
    const main = document.querySelector('main');
    const article = document.querySelector('#mainArticle');
    const newArticle = document.createElement('article');
    const msg = document.createElement('h3');
    const load = document.createElement('span');

    msg.innerText = 'Carregando...';

    newArticle.classList.add('flex', 'flex-col', 'justify-center', 'items-center', 'gap-10', 'w-full');
    load.classList.add('loading', 'loading-spinner', 'loading-xl');

    newArticle.id = 'mainArticle';
    msg.id = 'messageLoading';

    newArticle.append(msg, load);
    article.remove();
    main.append(newArticle);
}

function closeLoading(){
    const msg = document.querySelector('#messageLoading');
    const load = document.querySelector('.loading');

    load.remove();
    msg.remove();
}

async function createFormCreateNotify(){
    await checkLogin();
    loading();

    const article = document.querySelector('#mainArticle');
    const form = document.createElement('form');
    const messageForm = document.createElement('h3');

    const fieldsetText = document.createElement('fieldset');
    const labelText = document.createElement('label');
    const inputText = document.createElement('input');
    const validatorText = document.createElement('p');

    const btnCadastrar = document.createElement('button');
    const btnCancelar = document.createElement('button');

    //Estilizando o h3
    messageForm.classList.add('text-3xl');
    messageForm.innerText = 'Cadastrar Notificação';

    //Estilizando o form
    form.classList.add('fieldset', 'bg-base-200', 'border-base-300', 'rounded-box', 'w-xs', 'border', 'p-4', 'max-w-full');

    //Estilizando o fieldset para o Título
    fieldsetText.classList.add('fieldset');
    labelText.classList.add('label');
    inputText.classList.add('input', 'validator');
    validatorText.classList.add('validator-hint');

    inputText.placeholder = 'Título';
    inputText.id = 'titulo';
    inputText.name = 'titulo';
    inputText.required = true;
    inputText.minLength = 3;
    inputText.maxLength = 255;
    inputText.type = 'text';
    inputText.title = 'Apenas letras, números ou traço';

    labelText.htmlFor = 'titulo';
    labelText.innerText = 'Título';
    validatorText.innerText = 'Campo obrigatório';

    //Estilizando os botões
    btnCadastrar.classList.add('btn', 'btn-neutral', 'mt-4');
    btnCancelar.classList.add('btn', 'btn-ghost', 'mt-1');

    btnCadastrar.type = 'submit';
    btnCancelar.type = 'reset';

    btnCadastrar.innerText = 'Cadastrar';
    btnCancelar.innerText = 'Cancelar';

    fieldsetText.append(labelText, inputText, validatorText);

    form.append(fieldsetText, btnCadastrar, btnCancelar);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await checkLogin();
        const title = document.querySelector('#titulo');

        const token = localStorage.getItem('token');
        const res = await create_reminder(token, title.value);

        if (res.type === 'error'){
            sendNotify('Erro!', res.msg);
        } else{
            sendNotify('Sucesso!', 'Notificação criada com sucesso!');
            await updateCountReminders();
        }
    });

    article.append(messageForm, form);

    closeLoading();
}

async function checkLogin(){
    const token = localStorage.getItem('token');
    const res = await check(token);

    if (res.type === 'error'){
        const buttonNotify = document.querySelector('#buttonNotify');
        buttonNotify.addEventListener('click', redirectToLogin);
        sendNotify('Login expirado!', res.msg);
    }
}

async function logoutUser(){
    const token = localStorage.getItem('token');
    const res = await logout(token);
    if (res.type === 'error'){
        const buttonNotify = document.querySelector('#buttonNotify');
        buttonNotify.addEventListener('click', redirectToLogin);
        sendNotify('Erro!', res.msg);
    } else {
        const buttonNotify = document.querySelector('#buttonNotify');
        buttonNotify.addEventListener('click', redirectToLogin);
        sendNotify('Sucesso!', res.msg);
    }
}

function redirectToLogin(){
    localStorage.clear();
    window.location.href = '/pages/login/login.html';
}

async function updateCountReminders(){
    const token = localStorage.getItem('token');
    const datas = (await get_lembretes(token)).datas;

    if (datas.length === 0){
        countReminders.classList.add('hidden');
        informationNotReminders();
    } else {
        countReminders.innerText = datas.length;
        countReminders.classList.remove('hidden');
    }
}

async function loadReminders(){
    await checkLogin();
    loading();
    
    const token = localStorage.getItem('token');
    const res = await get_lembretes(token);
    const reminders = res.datas;

    if (reminders.length === 0){
        informationNotReminders();
    }

    for (const reminder of reminders){
        const dateTime = reminder.data.split(' ');
        const data = dateTime[0].split('-');
        dateTime[0] = `Data: ${data[2]}/${data[1]}/${data[0]}`
        dateTime[1] = `Horário de Criação: ${dateTime[1].split('.')[0]}`;
        create_card(reminder.texto, dateTime[0], dateTime[1], reminder.id);
    }

    closeLoading();
}

async function deleteReminder(id){
    await checkLogin();

    const token = localStorage.getItem('token');
    const res = await delete_reminder(token, id); 

    if (res.type === 'error'){
        sendNotify('Erro!', res.msg);
    } else {
        updateCountReminders();
        sendNotify('Sucesso!', res.msg);
    }
}

function informationNotReminders(){
    const article = document.querySelector('#mainArticle');

    const div = document.createElement('div');
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const p = document.createElement('p');

    div.setAttribute('role', 'alert');
    div.classList.add('alert', 'w-full');

    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.classList.add('h-6', 'w-6', 'shrink-0', 'stroke-current');

    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('stroke-linejoin', 'round');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('d', 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z');

    p.innerText = 'Nenhuma notificação ativa';

    svg.append(path);
    div.append(svg, p);
    article.append(div);
}

async function searchByReminderName(name){
    await checkLogin();
    const token = localStorage.getItem('token');
    const res = await get_lembretes(token);
    const datas = res.datas;
    const selectReminders = [];

    for (const reminder of datas){
        if (reminder.texto.toLowerCase().includes(name)){ 
            selectReminders.push(reminder);
        }
    }

    return selectReminders;
}

async function editReminder(id){
    await checkLogin();
    const token = localStorage.getItem('token');
    const res = await get_lembrete(token, id);

    loading();

    if (res.type === 'error'){
        sendNotify('Erro!', 'Ocorreu um erro ao tentar acessar essa notificação!');
    } else {
        const article = document.querySelector('#mainArticle');
        const messageForm = document.createElement('h3');
        const form = document.createElement('form');

        const fieldsetText = document.createElement('fieldset');
        const labelText = document.createElement('label');
        const inputText = document.createElement('input');
        const validatorText = document.createElement('p');
        
        const fieldsetData = document.createElement('fieldset');
        const labelTextData = document.createElement('label');
        const inputTextData = document.createElement('input');

        const fieldsetTime = document.createElement('fieldset');
        const labelTextTime = document.createElement('label');
        const inputTextTime = document.createElement('input');
        
        const btnCadastrar = document.createElement('button');
        const btnCancelar = document.createElement('button');

        messageForm.classList.add('text-3xl');
        messageForm.innerText = 'Editar Notificação';

        form.classList.add('fieldset', 'bg-base-200', 'border-base-300', 'rounded-box', 'w-xs', 'border', 'p-4', 'max-w-full');

        fieldsetText.classList.add('fieldset');
        labelText.classList.add('label');
        inputText.classList.add('input', 'validator');
        validatorText.classList.add('validator-hint');

        inputText.value = res.datas.texto;
        inputText.id = 'titulo';
        inputText.name = 'titulo';
        inputText.required = true;
        inputText.minLength = 3;
        inputText.maxLength = 255;
        inputText.type = 'text';
        inputText.title = 'Apenas letras, números ou traço';

        labelText.htmlFor = 'titulo';
        labelText.innerText = 'Título';
        validatorText.innerText = 'Campo obrigatório';

        fieldsetData.classList.add('fieldset');
        labelTextData.classList.add('label');
        inputTextData.classList.add('input');

        inputTextData.id = 'data';
        inputTextData.name = 'data';
        inputTextData.readOnly = true;
        labelTextData.htmlFor = 'data';
        labelTextData.innerText = 'Data';

        fieldsetTime.classList.add('fieldset');
        labelTextTime.classList.add('label');
        inputTextTime.classList.add('input');

        inputTextTime.id = 'time';
        inputTextTime.name = 'time';
        inputTextTime.readOnly = true;
        labelTextTime.htmlFor = 'time';
        labelTextTime.innerText = 'Horário de Criação';

        btnCadastrar.classList.add('btn', 'btn-neutral', 'mt-4');
        btnCancelar.classList.add('btn', 'btn-ghost', 'mt-1');

        btnCadastrar.type = 'submit';
        btnCancelar.type = 'button';

        btnCadastrar.innerText = 'Salvar';
        btnCancelar.innerText = 'Cancelar';

        btnCancelar.addEventListener('click', async () => loadReminders());

        const dateTime = res.datas.data.split(' ');
        const data = dateTime[0].split('-');
        dateTime[0] = `${data[2]}/${data[1]}/${data[0]}`
        dateTime[1] = `${dateTime[1].split('.')[0]}`;

        inputTextData.value = dateTime[0];
        inputTextTime.value = dateTime[1];

        fieldsetText.append(labelText, inputText, validatorText);
        fieldsetData.append(labelTextData, inputTextData);
        fieldsetTime.append(labelTextTime, inputTextTime);
        form.append(fieldsetText, fieldsetData, fieldsetTime, btnCadastrar, btnCancelar);

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const newTitle = document.querySelector('#titulo').value;

            const resEdit = await edit_reminder(token, newTitle, id);

            if (resEdit.type === 'error'){
                sendNotify('Erro!', resEdit.msg);
            } else {
                sendNotify('Sucesso!', 'Dados alterados com sucesso!');
                loadReminders();
            }
        });

        article.append(form);
    }

    closeLoading();
}

await updateCountReminders();
await loadReminders();