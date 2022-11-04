import { toaster } from "evergreen-ui"
import { generateColor } from "../scripts"

interface IObj {
    color: string;
}

//одна и та же по сути функция 3 раза ! рефактор
export const get_contractors_all = async (setData: (data: []) => void): Promise<void> => {
    await fetch(
        process.env.REACT_APP_API + 'data/contractors/all',
        { 
        headers :
            { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            data.forEach((obj: IObj) => obj.color = generateColor(true));
            setData(data);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
            toaster.danger("Что-то пошло не так");
        })
}

export const get_contractors_stat_all = async (setData: (data: []) => void): Promise<void> => {
    await fetch(
        process.env.REACT_APP_API + 'data/contractors/statistics/all',
        { 
        headers :
            { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            data.forEach((obj: IObj) => obj.color = generateColor());
            setData(data);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
            toaster.danger("Что-то пошло не так");
        })
}

export const get_contractors_stat_total = async (setData: (data: []) => void): Promise<void> => {
    await fetch(
        process.env.REACT_APP_API + 'data/contractors/statistics/total',
        { 
        headers :
            { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
        })
        .then(response=>response.json())
        .then(data=>{
            data.forEach((obj: IObj) => obj.color = generateColor());
            setData(data);
        })
        .catch(error => {
            console.log(`Error: ${error}`);
            toaster.danger("Что-то пошло не так");
        })
}

export const add_contractor = async (name: string, email: string, phone: string): Promise<void> => {
    await fetch(process.env.REACT_APP_API+'data/contractors/add',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            "name": name,
            "contractor_email": email,
            "contractor_phone": phone
        })
    })
    .then(response => {
        if (!response.ok) 
            throw new Error(response.statusText);
        else
            window.location.reload();
    })
    .catch(error => {
        console.log(`Error: ${error.message}`);
        toaster.danger("Что-то пошло не так");
    })
}

export const delete_contractor = async (name: string): Promise<void> => {
    if (window.confirm(`Вы действительно хотите удалить подрядчика ${name}?`)) {
        await fetch(process.env.REACT_APP_API+'data/contractors/delete', {
            method: 'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                "name": name
            })
        })
        .then(response => {
            if (!response.ok) 
                throw new Error(response.statusText);
            else
                window.location.reload();
        })
        .catch(error => {
            console.log(`Error: ${error.message}`);
            toaster.danger("Что-то пошло не так");
        })
    }   
}