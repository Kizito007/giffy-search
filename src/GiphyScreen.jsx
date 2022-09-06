import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const GiphyScreen = () => {
    const id = useParams()
    const giphId = id.id
    const API_KEY = "KZhgzIlnxd6RQF4gvjZJed975iK0VG5e"
    const [giphy, setGiphy] = useState("")

    // useEffect(() => {
        const fetchGiphys = async () => {
          try {
            // setIsLoading(true)
            let fetchedGiphys = await axios.get(`https://api.giphy.com/v1/gifs/${giphId}`, {
              params: {
                api_key: API_KEY,
              }
            })
            console.log(fetchedGiphys.data.data.embed_url)
            setGiphy(fetchedGiphys.data.data.embed_url)
          } catch(err) {
            console.log(err)
          }
        }
        fetchGiphys()
    //   }, [])
    
  return (
    <div>
        <div style={{width:"100%",height:"0",paddingBottom:"75%",position:"relative"}}>
        <iframe src={`${giphy}`} width="100%" height="100%" style={{position:"absolute"}} frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
        </div>
        <p><a href={`${giphy}`}>via GIPHY</a></p>
    </div>
  )
}

export default GiphyScreen