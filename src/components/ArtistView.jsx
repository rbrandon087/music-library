import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

function ArtistView() {
    const navigate = useNavigate()
    const { id } = useParams()
    const [ artistData, setArtistData ] = useState([])

    const navButtons = () => {
        return <div>
            <button type='button' onClick={() => navigate(-1)}>Back</button>
            <button type='button' onClick={() => navigate('/')}>Home</button>
        </div>
    }

    useEffect(() => {
        const API_URL = `http://localhost:4000/album/${id}`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
        }
        fetchData()
    })
    const justAlbums = artistData.filter(entry => entry.collectionType === 'Album');
    
    const renderAlbum = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    return (
        <div>
            {artistData.length > 0 ? <h2> {artistData[0].artistName}</h2> : <h2>Loading...</h2>}
            {navButtons()}
            {renderAlbum}
        </div>
    )
}

export default ArtistView