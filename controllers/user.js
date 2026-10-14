import {configs} from '../configs.js';

export async function cadastrar(login, senha){ 
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
        const res = await fetch(configs.urlBase + '/usuario/signup', obj);

        if (!res.ok){
            throw new Error('Erro ao realizar o cadastro!');
        }

        const token = await res.json();

        return {type: 'sucesso', token: token.token};

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

        if (!res.ok){
            throw new Error('Erro ao realizar o login!');
        }

        const token = (await res.json()).token;

        return {type: 'sucesso', token: token};

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

        if (!res.ok){
            throw new Error('Ocorreu um erro ao realizar o logout!');
        }

        const msg = (await res.json()).msg;

        return {type: 'aviso', msg: msg};
    } catch(err){
        return {type: 'error', msg: err.msg};
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

        if (!res.ok){
            throw new Error('Ocorreu um erro ao verificar se o usuário ainda está logado!');
        }

        const msg = (await res.json()).msg;

        return {type: 'aviso', msg: msg};
    } catch(err){
        return {type: 'error', msg: err.msg};
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

        if (!res.ok){
            throw new Error('Ocorreu um erro ao renovar o login!');
        }

        const token = (await res.json()).token;

        return {type: 'aviso', token: token};
    } catch(err){
        return {type: 'error', msg: err.msg};
    }
}