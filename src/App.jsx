import { useEffect, useState } from "react"
import "./App.css"
import "./index.css"
import { saveJoke,getJokes } from "./services/jokeService.js"


export const App = () => {
   // State to store the joke text,useState creates a state variable (newJoke) and update function (setNewJoke)

  const [newJoke, setNewJoke]=useState("")
  const [allJokes, setAllJokes]=useState([])

  // Handler when the user clicks on Add
  const handleAddJoke = () => {
    if (newJoke.trim()) { // Ensure the joke is not empty
      saveJoke(newJoke)  // Pass the new joke to saveJoke
      setNewJoke("") // Clear the input field after saving
    }
  }
  useEffect(()=>{
    getJokes().then(jokesArray=>{
      setAllJokes(jokesArray)
      console.log('jokes are set')
    })
  },[])

  return (
  <div className="app-container">
    <div className="app-heading">
      <h1 className="app-heading-text">Chuckle Checklist</h1>
     </div>
      <h2>Add Joke</h2>
    <div className="joke-add-form">
        <input
        className="joke-input"
        type="text"
        placeholder="New One Liner"
          //Input value is controlled by state
        value={newJoke}
          //onChange updates state with user input
        onChange={(event) => {setNewJoke(event.target.value)//event.target.value contains what user typed
            // What's the value of event?
        }}
        />
        <button className="joke-input-submit " onClick={handleAddJoke}>Add</button>
    </div>
  <div className="joke-lists-container">
     {allJokes.map(joke => {
        return (
         
          <section className="jokes" key={joke.id}>
           <div>{joke.text}</div>
         </section>
         
      )
    })}
    
  </div>
</div>
)
}
