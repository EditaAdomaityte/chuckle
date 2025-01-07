export const saveJoke = (newJoke)=>{
    const state={
    id: 0,
    text: newJoke,
    told: false
    }
//we pass newJoke as a parameter to saveJoke from App.jsx. This way, the joke text can be dynamically updated based on what the user types.
    const postOptions = {
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(state)
    }
return fetch("http://localhost:8088/jokes", postOptions)
}

export const getJokes = () =>{
    return fetch ("http://localhost:8088/jokes").then((response)=>response.json())
}