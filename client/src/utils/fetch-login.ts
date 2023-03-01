import { FormEvent } from "react";
import { loginForm } from "../types/types";

export const loginUser = async (event: FormEvent, form: loginForm) => {
    event.preventDefault();

    try {
        const res = await fetch('http://localhost:1337/api/login', {
            method: 'GET',
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