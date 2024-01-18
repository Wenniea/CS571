import { Button, Container, Form, Row, Col} from "react-bootstrap";
import { useEffect, useState } from "react";
import Student from "./Student";

const Classroom = () => {
    const [students, setStudents] = useState([]);
    const [shownStudents, setShownStudents] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [searchMajor, setSearchMajor] = useState("");
    const [searchInterests, setSearchInterests] = useState("");


    useEffect(() => {
        fetch('https://cs571.org/s23/hw4/api/students', {
            headers: {
                "X-CS571-ID": "bid_2a1709990731052fcc9b"
            }
        })
        .then(res => res.json())
        .then(studentData => {
            console.log(studentData);
            setStudents(studentData);
            setShownStudents(studentData);
        })
    }, [])

    useEffect(() => {
        let result = students.filter(student => {
            if ((Object.values(student.name).some(value => value.toLowerCase().includes(searchName.trim().toLowerCase()))
                || (student.name.first + ' '+ student.name.last).toLowerCase().includes(searchName.trim().toLowerCase()))
                && student.major.toLowerCase().includes(searchMajor.trim().toLowerCase())
                && student.interests.some(value => value.toLowerCase().includes(searchInterests.trim().toLowerCase()))) {
                return true;
            }
            return false;
        });
        setShownStudents(result);
    }, [students, searchName, searchMajor, searchInterests])

    function reset() {
        setShownStudents(students);
        setSearchInterests("");
        setSearchMajor("");
        setSearchName("");
    }
    return <div>
        <Form>
            <Form.Label htmlFor="searchName">Name</Form.Label>
            <Form.Control 
                id="searchName"
                value = {searchName}
                onChange= {(e) => setSearchName(e.target.value)}
            />
            <Form.Label htmlFor="searchMajor">Major</Form.Label>
            <Form.Control 
                id="searchMajor"
                value = {searchMajor}
                onChange= {(e) => setSearchMajor(e.target.value)}
            />
            <Form.Label htmlFor="searchInterest">Interest</Form.Label>
            <Form.Control 
                id="searchInterest"
                value = {searchInterests}
                onChange= {(e) => setSearchInterests(e.target.value)}
            />
            <br />
            <Button variant="neutral" onClick={reset}>Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>
                { 
                shownStudents.map(student => {
                    return <Col xs={12} sm={6} md={4} lg={3} xl={2} key = {student.id}>
                    <Student
                        firstname = {student.name.first}
                        lastname = {student.name.last}
                        major = {student.major}
                        credit = {student.numCredits}
                        fromWisconsin = {student.fromWisconsin}
                        interests = {student.interests}
                    />
                    </Col>}
                )
                }
            </Row>
        </Container>
    </div>

}

export default Classroom;