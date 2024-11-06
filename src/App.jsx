import { useState } from "react";


const App = () =>{
  const [OriginalURL,setOriginalURL] = useState("")
  const [ShortenedURL,setShortenedURL] = useState("")

  function changeOriginalURL(event){
    setOriginalURL(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault()

    fetch("http://localhost:3000/URLDB", {
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      }
      ,body: JSON.stringify({OriginalURL})
    })
    .then(response =>{
      if(!response.ok){
        throw new Error("Network response was not ok")
      }
      return response.json()
    })
    .then(data =>{
      setShortenedURL(data.ShortenedURL)
    })
  }

  return(
    <>
      <div className="h-screen flex justify-center items-center font-mono">
        <form onSubmit={handleSubmit} className="border-2 h-[50%] w-[50%] flex justify-center relative">
          <h1 className="text-3xl absolute top-[5%]">URL Shortener</h1>
          <label className="absolute top-[25%] left-[0%] text-xl relative">Insert Your URL Here:
            <input value={OriginalURL} onChange={changeOriginalURL} className="border-2 bg-blue-400 top-[0%] absolute left-[1%] text-black p-1 w-[50%] relative text-center" placeholder="https://www.google.com"></input>
            </label>
          <a href={`https://potato-b015.onrender.com/${ShortenedURL}`} className="absolute top-[45%]"><p className="text-base">Your Shortened URL is https://potato-b015.onrender.com/{ShortenedURL}</p></a>
          <button type="submit" className="absolute top-[60%] border-2 bg-blue-300 p-2 w-[20%]">Shorten</button>
        </form>
      </div>
    </>
  )
}


export default App