import { useContext, useEffect, useState } from "react";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import { Container, Col, Row } from "react-bootstrap";
import Song from './Song'


const AllSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const [songs, setSongs] = useState([]);
    const [data, setData] = useState([0, 0, 0]);

    useEffect(() => {
        fetch('https://cs571.org/s23/hw5/api/songs', {
            headers: {
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            }
        })
            .then(res => res.json())
            .then(songData => {
                setSongs(songData)
            })
    }, []);

    useEffect(() => {
        let totalSeconds = 0;
        let totalGenre = songs.reduce((prev,curr) => {
            const time = curr.length.split(":")
            totalSeconds += parseInt(time[0]) * 60 + parseInt(time[1])
            if (prev.includes(curr.genre)){
                return prev
            } else {
                return [...prev, curr.genre]
            }
        },[]);
        setData([songs.length,totalGenre.length,totalSeconds]);
    },[songs])

    return <div>
        <h1>Songs</h1>
        <h3> We have {data[0]} songs in {data[1]} genres for a total of {data[2]} seconds of music.</h3>
        <Container fluid>
            <Row>
            <BadgerBeatsFavoritesContext.Provider value={[favorites,setFavorites]}>
                {
                    songs.map(song => {
                        return <Col xs={12} sm={6} md={4} lg={3} xl={2} key={song.id}>
                            <Song
                                song={song}
                            />
                        </Col>
                    }
                    )}
                    </BadgerBeatsFavoritesContext.Provider>
            </Row>
        </Container>
    </div>
}

export default AllSongs;