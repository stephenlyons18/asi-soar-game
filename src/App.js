import React from 'react';
import './App.css';

import 'holderjs'; // TODO: Remove once images are finalized

// React Bootstrap Components
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

// React Icons Components
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      allQuestions: [],
      currentQuestions: [],
      isLoaded: false,
      error: null
    };
  }

  componentDidMount() {
    // Get all questions from server
    // const allQuestions = require('./questions.json');
    
    fetch("URL to S3")
      .then(res => res.json())
      .then(result => {
        this.setState({
          allQuestions: result.questions,
          isLoaded: true
        });
      }, error => {
        this.setState({
          isLoaded: true,
          error: error
        });
      });
    
    let questions = this.state.allQuestions;
    
    this.shuffleQuestions(questions);
    this.setState({
      questions: questions.slice(0, 11)
    });
  }

  // TODO: Save answer to each question
  handleQuestion = (val) => console.log(val);

  navLeft = () => {
    if (this.state.current > 0) {
      this.setState(state => ({
        current: state.current - 1
      }));
    }
  }

  navRight = () => {
    if (this.state.current < this.state.questions.length - 1) {
      this.setState(state => ({
        current: state.current + 1
      }));
    }
  }

  shuffleQuestions = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
  }

  submit = () => {
    // Prepare data to send to server
    const data = {
      "student_id": "",
      "firstName": "",
      "lastName": "",
      "email": "",
      "score": 9
    }

    fetch("https://309u5urphk.execute-api.us-west-1.amazonaws.com/pre-test-1/uploadscore", {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'PTf2wlXBFd52BtT3IHotQ2u3lUdxgCN4zNJtgd5b'
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      console.log(result);
    }, error => {
      console.log(error);
    });
  }

  render() {
    if (this.state.error) {
      // TODO: Show an error message
      return null;
    } else if (!this.state.isLoaded) {
      // TODO: Show a spinner
      return null;
    } else {
      return (
        <div className="App">
          <Container fluid>
            <Row>
              <Col>
                <Jumbotron fluid>
                  <Image src={"holder.js/300px250?text=Sample Image " + this.state.current} fluid />
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col>
                <Jumbotron fluid>
                  <BsArrowLeft className="text-primary nav-arrows left" onClick={this.navLeft} />
                  <h2>{this.state.questions[this.state.current].text}</h2>
                  <BsArrowRight className="text-primary nav-arrows right" onClick={this.navRight} />
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col>
                <ToggleButtonGroup size="lg" name={"question-" + this.state.current} onChange={this.handleQuestion}>
                  {this.state.questions[this.state.current].options.map(option => (
                    <ToggleButton key={option.value} value={option.value} variant="outline-primary">{option.text}</ToggleButton>
                  ))}              
                </ToggleButtonGroup>
              </Col>
            </Row>
            
            {/*This is the submit button that will apprear when the student has reached the end of the quiz and will check their answers and load form*/}
            {/* <Button variant='outline-primary' id='check-answers'>Check Answers</Button>         */}
  
            {/*This is the component that will be loaded at the end of the quiz*/}
            {/*This is a form element and will take the user's information*/}
            {/* <div className='container-sm' style={{
              paddingLeft: 250,
              paddingRight:250
            }}>
              
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Student Email Address</Form.Label>
                <Form.Control id="student-email" type="email" placeholder="name@student.csulb.edu" />
                <Form.Text className="text-muted">Do not use personal email address</Form.Text>
              </Form.Group>
  
              <Form.Group controlId='formBasicID'>
                <Form.Label>Student ID</Form.Label>
                <Form.Control id="student-id" placeholder="Enter Student ID"/>
  
              </Form.Group>
              <Button variant="outline-primary" id="submit-button">Submit</Button>
            </Form>
            </div> */}
          </Container>
        </div>
      );
    }
    }
}
export default App;