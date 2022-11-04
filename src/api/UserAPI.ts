import {toaster} from 'evergreen-ui'
import { IUser } from '../types/types'
 
export const delete_user = async (email: string): Promise<void> => {
    if (window.confirm(`Вы действительно хотите удалить учетную запись ${email}?`)) {
        await fetch(process.env.REACT_APP_API+'auth/delete_user', {
            method: 'DELETE',
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
                window.location.reload();
        })
        .catch(error => {
            console.log(`Error: ${error.message}`);
            toaster.danger("Что-то пошло не так");
        })
    }   
}

export const update_user = async (user: IUser, status: number | undefined): Promise<void> => {
    await fetch(process.env.REACT_APP_API+'auth/update_user',{
        method: 'PUT',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            "email": user.email,
            "name": user.name,
            "surname": user.surname,
            "role": user.role,
            "organization": user.organization,
            "status": status
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