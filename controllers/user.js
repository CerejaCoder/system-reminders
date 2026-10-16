import {configs} from '../configs.js';

export async function cadastrar(login, senha){ 
    const obj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({login: login, senha: senha})
    };

    try{
        const res = await fetch(configs.urlBase + '/usuario/signup', obj);

        const datas = (await res.json());

        if (!res.ok){
            throw new Error(datas.msg);
        }

        return {type: 'sucesso', token: datas.token};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}

export async function login(login, senha){
    const obj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login: login,
            senha: senha
        })
    };

    try{
        const res = await fetch(configs.urlBase + '/usuario/login', obj);

        const datas = await res.json();

        if (!res.ok){
            throw new Error(datas.msg);
        }

        return {type: 'sucesso', token: datas.token};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}

export async function logout(token) {
    const obj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try{
        const res = await fetch(configs.urlBase + '/usuario/logout', obj);

        const datas = await res.json();
        
        if (!res.ok){
            throw new Error(datas.msg);
        }

        return {type: 'warning', msg: datas.msg};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}

export async function check(token){
    const obj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try{
        const res = await fetch(configs.urlBase + '/usuario/check', obj);

        const datas = await res.json();

        if (!res.ok){
            throw new Error(datas.msg);
        }

        return {type: 'warning', msg: datas.msg};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}

export async function renew(token) {
    const obj = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    try{
        const res = await fetch(configs.urlBase + '/usuario/renew', obj);
        
        const datas = await res.json();
        console.log(res);
        console.log(datas);
        
        if (!res.ok){
            throw new Error(datas.msg);
        }

        return {type: 'warning', token: datas.token};

    } catch(err){
        return {type: 'error', msg: err.message};
    }
}