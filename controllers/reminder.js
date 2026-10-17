import {configs} from '../configs.js';

export async function get_lembretes(token){
    const obj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try{
        let res = await fetch(configs.urlBase + '/lembrete', obj);
        
        if (!res.ok){
            throw new Error(datas.msg);
        }
        
        const datas = await res.json();

        return {type: 'success', datas: datas};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}

export async function get_lembrete(token, id){
    const obj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try{
        const res = await fetch(configs.urlBase + `/lembrete/${id}`, obj);

        if (!res.ok){
            throw new Error('Não foi possível se conectar ao servidor');
        }

        const datas = await res.json();
        
        return {type: 'success', datas: datas};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}

export async function create_reminder(token, texto){
    const obj = {
        method: 'POST',
        headers: {
            'Content-Type': 'appliction/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({texto: texto})
    }

    try{
        const res = await fetch(configs.urlBase + '/lembrete', obj);

        if (!res.ok){
            throw new Error('Não foi possível se conectar ao servidor');
        }

        const datas = await res.json();

        return {type: 'success', datas: datas};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}

export async function edit_reminder(token, texto, id){
    const obj = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({texto: texto})
    }

    try{
        const res = await fetch(configs.urlBase + `/lembrete/${id}`, obj);

        if (!res.ok){
            throw new Error('Não foi possível se conectar ao servidor');
        }

        const datas = await res.json();

        return {type: 'success', datas: datas};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}

export async function delete_reminder(token, id){
    const obj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try{
        const res = await fetch(configs.urlBase + `/lembrete/${id}`, obj);
        
        const datas = await res.json();

        if (!res.ok){
            throw new Error(datas.msg);
        }
        
        return {type: 'sucess', msg: datas.msg};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}