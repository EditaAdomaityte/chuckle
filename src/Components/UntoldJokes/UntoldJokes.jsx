import "./UntoldJokes.css"


export const UntoldJokes=({joke,handleDeletionJoke,handleJokeChange})=>{
    return(
        <div className="joke-list-container" >
              <ul className="jokes" >
                <li className="joke-list-item">{joke.text} 
                <button onClick={()=>handleDeletionJoke(joke)}>🚮</button>
                <button onClick={()=>handleJokeChange(joke)}>😀</button>
                </li>
               
              </ul>
            </div>

    )
}
