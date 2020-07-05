import React from 'react';
import './App.css';

import 'holderjs'; // TODO: Remove once images are finalized

// React Bootstrap Components
import Alert from 'react-bootstrap/Alert'
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
      hasPassed: false,
      hasFailed: false,
      error: null
    };
    this.allQuestions = [];
    this.userForm = {};
    this.score = 0;
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

  resetQuiz = () => {
    this.initQuestions();
    this.setState({
      current: 0,
      answers: [],
      hasFailed: false
    });
    this.score = 0;
  }

  initQuestions = () => {
    this.shuffleQuestions(this.allQuestions);
    this.setState({
      currentQuestions: this.allQuestions.slice(0, 11),
      isLoaded: true
    });
  }

  saveQuestion = (val) => {
    this.setState(state => {
      const newAnswers = [...state.answers];
      newAnswers[state.current] = val;
      return {
        answers: newAnswers
      }
    });
  }

  saveForm = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.userForm[name] = value;
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
    this.state.answers.forEach((value, index) => {
      if (value === this.state.currentQuestions[index].correctAnswer) {
        this.score++;
      }
    });

    if (this.score >= 7) {
      this.setState({
        hasPassed: true
      });
    } else {
      this.setState({
        hasFailed: true
      });
    }
  }

  submit = (event) => {
    // TODO: Form validation

    event.preventDefault();
    event.stopPropagation();

    // Prepare data to send to server
    const data = {
      "student_id": this.userForm.studentID,
      "firstName": this.userForm.firstName,
      "lastName": this.userForm.lastName,
      "email": this.userForm.email,
      "score": this.score
    }

    console.log(data);

    // TODO: Uncomment below to test server

    // fetch("https://309u5urphk.execute-api.us-west-1.amazonaws.com/pre-test-1/uploadscore", {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-api-key': 'PTf2wlXBFd52BtT3IHotQ2u3lUdxgCN4zNJtgd5b'
    //   },
    //   body: JSON.stringify(data)
    // })
    // .then(res => res.json())
    // .then(result => {
    //   console.log(result);
    // }, error => {
    //   console.log(error);
    // });
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
    } else if (this.state.hasPassed) {
      return (
        <Container fluid>
          <Row>
            <Col className="fullHeight d-flex align-items-center">
              <Form className="mx-auto p-5 userForm" onSubmit={this.submit}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control required type="text" size="lg" placeholder="John" name="firstName" onChange={this.saveForm} />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control required type="text" size="lg" name="lastName" placeholder="Doe" onChange={this.saveForm} />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Student Email Address</Form.Label>
                  <Form.Control required type="email" size="lg" name="email" placeholder="name@student.csulb.edu" onChange={this.saveForm} />
                  <Form.Text className="text-muted">Please use your CSULB email address</Form.Text>
                </Form.Group>
                <Form.Group controlId='studentID'>
                  <Form.Label>Student ID</Form.Label>
                  <Form.Control required type="text" size="lg" name="studentID" placeholder="Student ID" onChange={this.saveForm} />
                </Form.Group>
                <Button variant="primary" type="submit" size="lg">Submit</Button>
                <Alert variant="info" className="mt-3">
                  <Alert.Heading>Disclaimer</Alert.Heading>
                  <p>
                    Lorem ipsum dolor sit amet, per ut ipsum intellegat, ad eum quot nihil repudiandae.
                    In homero repudiandae has, ut sit porro zril. An mel dolor reprimique assueverit,
                    amet nostrum eu cum. Mei te laoreet appellantur. <strong>Winners will be notified and
                    informed on August 20, the week before classes!</strong>
                  </p>
                </Alert>
              </Form>
            </Col>
          </Row>
        </Container>
      );      
    } else if (this.state.hasFailed) {
      return (
        <Container fluid>
          <Row>
            <Col className="fullHeight d-flex align-items-center">
              <Alert variant="danger" className="mx-auto p-4 noticeAlert">
                <Alert.Heading className="text-center">Darn... you didn't pass</Alert.Heading>
                <p>
                  Lorem ipsum dolor sit amet, per ut ipsum intellegat, ad eum quot nihil repudiandae.
                  In homero repudiandae has, ut sit porro zril. An mel dolor reprimique assueverit,
                  amet nostrum eu cum. Mei te laoreet appellantur.
                </p>
                <hr />
                <div className="d-flex justify-content-center">
                  <Button variant="danger" size="lg" onClick={this.resetQuiz}>Let's Try Again</Button>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
      );
    } else {
      // Quick accessors
      const progress = (this.state.current + 1) * 10;
      const isLastQuestion = this.state.current === this.state.currentQuestions.length - 1;
      const currentQuestions = this.state.currentQuestions;
      const current = this.state.current;
      const answers = this.state.answers;

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
                <ToggleButtonGroup size="lg" name={"question-" + current} value={answers[current] || null} onChange={this.saveQuestion}>
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
          </Container>
        </div>
      );
    }
  }
}
export default App;