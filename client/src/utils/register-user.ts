
export const registerUser = async (event: Event) => {
    event.preventDefault();

    try {
        const res = await fetch('http://localhost:1337/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'appliaction/json'
            },
            body: JSON.stringify({
                name: String,
                email: String,
                password: String,
            })
        });

        const data = await res.json();

        if(res.status === 201) {  }

        if(res.status === 409) {  }

    } catch (error) {
        console.log(error);
        return error;
    }
}