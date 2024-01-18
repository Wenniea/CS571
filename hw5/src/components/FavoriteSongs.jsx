import { useContext, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";
import Song from './Song'

const FavoriteSongs = (props) => {

    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);
    const [data, setData] = useState([0, 0, 0]);

    useEffect(() => {
        let totalSeconds = 0;
        let totalGenre = favorites.reduce((prev,curr) => {
            const time = curr.length.split(":")
            totalSeconds += parseInt(time[0]) * 60 + parseInt(time[1])
            if (prev.includes(curr.genre)){
                return prev
            } else {
                return [...prev, curr.genre]
            }
        },[]);
        setData([favorites.length,totalGenre.length,totalSeconds]);
    },[favorites])

    return <div>
        <h1>Favorites</h1>
        <h3> We have {data[0]} songs in {data[1]} genres for a total of {data[2]} seconds of music.</h3>
        <Container fluid>
            <Row>
            <BadgerBeatsFavoritesContext.Provider value={[favorites,setFavorites]}>
                {
                    favorites.map(song => {
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

export default FavoriteSongs;