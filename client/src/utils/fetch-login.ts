import { FormEvent } from "react";
import { loginForm } from "../types/types";

export const loginUser = async (event: FormEvent, form: loginForm) => {
    event.preventDefault();

    try {
        const res = await fetch('http://127.0.0.1:1337/api/login', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'appliaction/json'
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if(res.status === 400 || res.status === 404) { 
            return data;
        }

        if(res.status === 409) { 
            throw new Error(data.message);
        }

    } catch (error) {
        console.log(error);
        return error;
    }
}