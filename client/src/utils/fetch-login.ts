
export const registerUser = async (event: Event) => {
    event.preventDefault();

    try {
        const res = await fetch('http://localhost:1337/api/login', {
            method: 'GET',
            headers: {
                'Content-Type': 'appliaction/json'
            },
            body: JSON.stringify({
                email: String,
                password: String,
            })
        });

        const data = await res.json();

        if(res.status === 400 || res.status === 404) {  }

        if(res.status === 409) {  }

    } catch (error) {
        console.log(error);
        return error;
    }
}