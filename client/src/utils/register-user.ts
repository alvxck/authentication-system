import { FormEvent } from "react";
import { registrationForm } from "../types/types";

export const registerUser = async (event: FormEvent, form: registrationForm) => {
        
    event.preventDefault();

    try {
        const res = await fetch('http://127.0.0.1:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'appliaction/json'
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if(res.status === 201) { 
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