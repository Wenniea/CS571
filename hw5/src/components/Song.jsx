import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import BadgerBeatsFavoritesContext from "../contexts/BadgerBeatsFavoritesContext";

const Song = (props) => {
    const [favorites, setFavorites] = useContext(BadgerBeatsFavoritesContext);

    function add(){
         setFavorites([...favorites,props.song]);
    }

    function remove(){
           setFavorites(favorites.filter(song => {
            if (song !== props.song){
                return true
            }else{
                return false
            }
           })
           )
    }

    function find(){
        let found = false;
        favorites.some((song) => {
            if (song.id === props.song.id){
                found = true
                return false
            }
        })
        return found;
    }

    return <Card>
        <Card.Body>
        <Card.Img src= {props.song.img} ></Card.Img>
        <h5> {props.song.title}</h5>
        <h6> by {props.song.artist}</h6>
        <p> {props.song.genre} | {props.song.year} | {props.song.length}</p>
        {
            find() ? <Button variant= "danger" onClick={remove}>Remove from Favorites</Button>:
            <Button variant="primary" onClick={add}>Add to Favorites</Button>
        }
        </Card.Body>
    </Card>
}

export default Song;