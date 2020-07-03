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
import ProgressBar from 'react-bootstrap/ProgressBar'
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner'
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
      currentQuestions: [],
      answers: [],
      isLoaded: false,
      error: null
    };
    this.allQuestions = [];
  }

  componentDidMount() {
    // Get all questions from server    
    fetch("https://soarquestions.s3-us-west-1.amazonaws.com/questions.json")
      .then(res => res.json())
      .then(result => {
        this.allQuestions = result;
        this.initQuestions();
      }, error => {
        this.setState({
          isLoaded: true,
          error: error
        });
      });
  }

  initQuestions = () => {
    this.shuffleQuestions(this.allQuestions);
    this.setState({
      currentQuestions: this.allQuestions.slice(0, 11),
      isLoaded: true
    });
  }

  handleQuestion = (val) => {
    this.setState(state => {
      const newAnswers = [...state.answers];
      newAnswers[state.current] = val;
      return {
        answers: newAnswers
      }
    });
  }

  navLeft = () => {
    if (this.state.current > 0) {
      this.setState(state => ({
        current: state.current - 1
      }));
    }
  }

  navRight = () => {
    if (this.state.current < this.state.currentQuestions.length - 1) {
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

  checkAnswers = () => {
    // TODO: Check all questions and generate a score
    console.log("Needs Implementation :(");
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
      return (
        <Container fluid>
          <Row>
            <Col>
              <Spinner animation="border" variant="primary" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          </Row>
        </Container>
      );
    } else {
      const progress = (this.state.current + 1) * 10;
      const isLastQuestion = this.state.current === this.state.currentQuestions.length - 1;
      const currentQuestions = this.state.currentQuestions;
      const current = this.state.current;

      return (
        <div className="App">
          <Container fluid>
            <Row>
              <Col>
                <Jumbotron fluid>
                  <Image src={"holder.js/300px250?text=Sample Image " + current} fluid />
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col>
                <ProgressBar now={progress} label={`${progress}%`} />
                <Jumbotron fluid>
                  <BsArrowLeft className="text-primary nav-arrows left" onClick={this.navLeft} />
                  <h2>{currentQuestions[current].text}</h2>
                  <BsArrowRight className="text-primary nav-arrows right" onClick={this.navRight} />
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col>
                <ToggleButtonGroup size="lg" name={"question-" + current} onChange={this.handleQuestion}>
                  {currentQuestions[current].options.map(option => (
                    <ToggleButton key={option.value} value={option.value} variant="outline-primary">{option.text}</ToggleButton>
                  ))}              
                </ToggleButtonGroup>
              </Col>
            </Row>

            {isLastQuestion &&
              <Row className="mt-4">
                <Col>
                  <Button variant='primary' size="lg" onClick={this.checkAnswers}>Check Your Answers</Button>
                </Col>
              </Row>
            }
  
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