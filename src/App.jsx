import { useEffect, useState } from "react"

import "./App.css"
import "./index.css"
import { saveJoke,getJokes,changeJoke, deleteJoke } from "./services/jokeService.js"


export const App = () => {
   // State to store the joke text,useState creates a state variable (newJoke) and update function (setNewJoke)

  const [newJoke, setNewJoke]=useState("")
  const [allJokes, setAllJokes]=useState([])
  const [toldJokes, setToldJokes]= useState([]) //for told jokes
  const [untoldJokes, setUntoldJokes]= useState([])// for untold jokes
  
 const getItems = () =>{getJokes().then(jokesArray => {
 setAllJokes(jokesArray)})}

  //Fetch all jokes
  useEffect(() => {
    getJokes().then(jokesArray => {
      setAllJokes (jokesArray)
      console.log('jokes are set')
    })
  },[])

  // Handler when the user clicks on Add
  const handleAddJoke = () => {
    if (newJoke.trim()) {             // Ensure the joke is not empty
      saveJoke(newJoke).then(() => {    // Pass the new joke to saveJoke
        getItems()                    // Reload jokes after saving
        setNewJoke("")                // Clear the input field after saving
      })  
    }
  }
  
  const handleJokeChange = (joke) =>{
    
    changeJoke(joke).then(()=>{
      getItems()
    })
  }

  const handleDeletionJoke = (joke)=>{
    deleteJoke(joke).then(()=>{
      getItems()
    })
  }

//Filter jokes
  useEffect(() => {
    const told = allJokes.filter((joke) => joke.told === true)
    const untold = allJokes.filter ((joke) => joke.told === false)

    setToldJokes(told)
    setUntoldJokes(untold)
    }
  
  ,[allJokes])

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
          onChange={(event) => setNewJoke(event.target.value)//event.target.value contains what user typed
              // What's the value of event?
          }
        />
        <button className="joke-input-submit " onClick={handleAddJoke} >Add</button>
    </div>
  <div className="joke-lists-container">
        <div className="joke-list-container">
          <h2>Untold <span className="untold-count">{untoldJokes.length}</span></h2>
        {untoldJokes.map(joke => {
            return (
            <div className="joke-list-container" key={joke.id}>
              <ul className="jokes" >
                <li className="joke-list-item">{joke.text} 
                <button onClick={()=>handleDeletionJoke(joke)}>🚮</button>
                <button onClick={()=>handleJokeChange(joke)}>😀</button>
                </li>
               
              </ul>
            </div>
          )
        }
        )}
        </div>
        
        <div className="joke-list-container">
          <h2>Told <span className="told-count">{toldJokes.length}</span></h2>
        {toldJokes.map(joke => {
            return (
            <div className="joke-list-container" key={joke.id}> 
              <ul className="jokes" >
                <li className="joke-list-item">{joke.text}
                  <button onClick={()=>handleDeletionJoke(joke)}>🚮</button>
                  <button onClick={()=>handleJokeChange(joke)}>🤫</button>
                  </li>
              </ul>
            </div>
          )
        })}
        </div>

    
  </div>
</div>
)
}
