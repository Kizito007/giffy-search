import { useState, useEffect } from 'react'
import axios from "axios"
import {Link} from "react-router-dom"

function HomeScreen() {

  const API_KEY = "KZhgzIlnxd6RQF4gvjZJed975iK0VG5e"
  const [giphys, setGiphys] = useState([])
  const [search, setSearch] = useState([])
  const [status, setStatus] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchGiphys = async () => {
      try {
        setIsLoading(true)
        let fetchedGiphys = await axios.get('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: API_KEY,
            limit: 10
          }
        })
        console.log(isLoading)
        setGiphys(fetchedGiphys.data.data)
        setStatus("Top 15 Trending")
        setIsLoading(false)
      } catch(err) {
        console.log(err)
      }
    }
    fetchGiphys()
  }, [])
  
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      let fetchedGiphys = await axios.get('https://api.giphy.com/v1/gifs/search', {
        params: {
          api_key: API_KEY,
          q: search,
          limit: 10,
        }
      })
      console.log(fetchedGiphys.data.data)
      setGiphys(fetchedGiphys.data.data)
      setStatus("Searched Items")
      setIsLoading(false)
    } catch(err) {
      console.log(err)
    }
  }
  
console.log(giphys)
  return (
   <div className='HomeScreen'>
    <div className="container" style={{textAlign: "center"}}>
        <br/><br/>
        <img src="https://www.easygifanimator.net/images/samples/sparkles.gif"
            alt="from https://www.easygifanimator.net/" /><br/><br/>
        <h3>Giffy search party 🎊🔍</h3>
        <p>Search for your favorite GIF's here</p>
        <p>Set to return 15 awesome GIF's</p>
        <form onSubmit={handleSearch}>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="e.g Party" aria-label="e.g Party"
                    aria-describedby="button-addon2" onChange={e => setSearch(e.target.value)}/>
                <button className="btn btn-outline-secondary" type="submit" id="button-addon2">Search</button>
            </div>
        </form>
        <h2> {status} </h2><br/><br/>
        <div className='row'>
        {
          !isLoading ?
          giphys.map((giph, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 col-xs-12">
              <div className="card card-inverse card-info text-center" style={{width: "18rem"}}>
                <iframe src={giph.embed_url} width="280" height="260" frameBorder="0"
                className="giphy-embed" allowFullScreen></iframe>
                {/* <img src={giph.embed_url} className="card-img-top" alt="gif"/> */}
                <div className="card-body">
                  <p className="card-text"> {giph.title} </p>
                  <Link to={`/giphy/${giph.id}`} className="btn btn-secondary">View</Link>
                </div>
              </div>
            </div>
          )) :
          <h1>Loading...</h1>
        }
        </div>
    </div>
   </div>
  )
}

export default HomeScreen
