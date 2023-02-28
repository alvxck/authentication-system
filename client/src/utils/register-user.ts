import { FormEvent } from "react";
import { registrationForm } from "../types/types";

export const registerUser = async (event: FormEvent, form: registrationForm) => {
        
    event.preventDefault();

    try {
        const res = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'appliaction/json'
            },
            body: JSON.stringify(form)
        });

        const data = await res.json();

        if(res.status === 201) {  }

        if(res.status === 409) {  }

    } catch (error) {
        console.log(error);
        return error;
    }
}