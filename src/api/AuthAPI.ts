import {Md5} from 'ts-md5/dist/md5';
import {toaster} from 'evergreen-ui';
import { NavigateFunction } from 'react-router-dom';

let clientSalt: string = "AjrT67_ioT!";
let hash: string = "";

export const get_organizations = async (): Promise<Response> => {
    return await fetch(
        process.env.REACT_APP_API+'auth/get_organizations',
        { 
        credentials: 'include',
        headers :
            { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
}

const update_hash = async (email: string, hash: string, deleteData: () => void, reload: boolean): Promise<void> => {
    await fetch(process.env.REACT_APP_API+'auth/update_hash',{
        method: 'PUT',
        credentials: 'include',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "hash": hash
        })
    })
    .then(response => {
        if (response.ok) 
            {
                deleteData();
                reload ? window.location.reload() : toaster.success("Аккаунт станет активен после одобрения заявки администратором");
            }
        else
            throw new Error(response.statusText);
    })
    .catch(error => {
        console.log(`Error: ${error.message}`);
        toaster.danger("Что-то пошло не так");
    })
    hash = "";
}

export const sign_up = async (name: string, surname: string, email: string, organization: string, password: string, status: number, role: string, deleteData: () => void, reload: boolean): Promise<void> => {
    await fetch(process.env.REACT_APP_API+'auth/signup',{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "surname": surname,
            "email": email,
            "organization": organization,
            "status": status,
            "role": role
        })
    })
    .then(response => {
        if(!response.ok) 
            throw new Error(response.statusText);
        else 
            return response.json();
    })
    .then(data=>{
        data && (hash = Md5.hashStr(data.salt + clientSalt + password));
    })
    .catch(error => {
        console.log(`Error: ${error.message}`);
        toaster.danger("Что-то пошло не так");
    })
    hash && update_hash(email, hash, deleteData, reload);
}

const login = async (email: string, hash: string, navigate: NavigateFunction, dispatch: (action: object) => void): Promise<void> => {
    console.log(hash);
    await fetch(process.env.REACT_APP_API+'auth/login',{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "email": email,
            "hash": hash
        })
    })
    .then(response => {
        if (!response.ok) 
            throw new Error(response.statusText);
        else {
            return response.json();
        }      
    })
    .then(data=>{
        try {
            localStorage.setItem("name", data.surname + " " + data.name);
            localStorage.setItem("role", data.role);
            localStorage.setItem("id_token", '1');
            localStorage.setItem("refresh_time", Date.now().toString());
            dispatch({type: "LOGIN_SUCCESS"});
            navigate("/", {replace: true});
        } catch {
            toaster.danger("Что-то пошло не так");
        }
    })
    .catch(error => {
        console.log(`Error: ${error.message}`);
        toaster.danger("Что-то пошло не так");
    })
    hash = "";
}

export const get_salt = async (email: string, password: string,  navigate: NavigateFunction, dispatch: (action: object) => void): Promise<void> => {
    await fetch(process.env.REACT_APP_API+'auth/get_salt',{
        method: 'POST',
        credentials: 'include',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "email": email
        })
    })
    .then(response => {
        if (!response.ok) 
            throw new Error(response.statusText);
        else 
            return response.json();
    })
    .then(data=>{
        data && (hash = Md5.hashStr(data + clientSalt + password));
    })
    .catch(error => {
        console.log(`Error: ${error.message}`);
        toaster.danger("Что-то пошло не так");
    })
    hash && login(email, hash, navigate, dispatch);
}

export const logout = async (): Promise<void> => {
    await fetch(process.env.REACT_APP_API+'auth/logout', {
        method: 'DELETE',
        credentials: 'include'
    })
    .catch(error => {
        console.log(`Error: ${error}`);
        toaster.danger("Что-то пошло не так");
    })
}

export const refreshToken = async (): Promise<void> => {
    await fetch(process.env.REACT_APP_API+'auth/refresh', {
        credentials: 'include'
    })
    .then(response => {
        if (!response.ok) {
            localStorage.removeItem("id_token");
            logout();
        }
        else localStorage.setItem("refresh_time", Date.now().toString())
    })
    .catch(error => {
        console.log(`Error: ${error}`);
        toaster.danger("Что-то пошло не так");
    })
}


