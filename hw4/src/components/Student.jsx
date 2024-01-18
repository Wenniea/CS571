const Student = (props) => {
    return <div>
        <h2>{props.firstname} {props.lastname}</h2>
        <h3>{props.major} </h3>
	    <p>{props.firstname} is taking {props.credit} credits and {props.fromWisconsin ? "is" : "is not"} from Wisconsin.</p>
	    <p> Numer of interests: {props.interests.length}</p>
        <ul>
            {props.interests.map((interest) => (
                <li key = {interest}> {interest} </li>
            ))}
        </ul>
        
    </div>
}

export default Student;