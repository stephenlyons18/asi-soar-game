import React from 'react';
import './App.css';


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
      error: null,
      rules: false
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

  startQuiz = () => {
    this.setState({
      rules: true
    });
  }

  initQuestions = () => {
    this.shuffleQuestions(this.allQuestions);
    this.setState({
      currentQuestions: this.allQuestions.slice(0, 10),
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
    }
    else if (!this.state.rules){
      return(
        <div className="background">
        
        <Container fluid style={{paddingLeft: 250, paddingRight: 250}}>
          <Row className="fullHeight d-flex align-items-center">
            <Col>
              
                <div class="splash">
                  <h2><strong><u>Introduction and Rules</u></strong></h2>
                  <Image src="https://soar-images.s3-us-west-1.amazonaws.com/ASI%2BLBSUlogo_wide_CMYK-CLR.jpg" fluid/>
                  <h3 ><u><strong>Introduction</strong></u></h3>
                  <p>Welcome to ASI at Long Beach State University! We are excited to have you as a part of the Beach community for the new 2020-2021 school year. Although things may look different for the coming semester due to the global pandemic, we want you to know that our ASI resources and services are still open and available to you. As part of your orientation, in order to learn more about the student body, LBSU and our history we have put together a fun and informative quiz for you to take. Test out your knowledge, take in some Beach facts, and who knows you may even win a prize in the process! </p>
                  <p><u>Prizes and winners will be announced the week before classes  (between Aug. 17-21)!</u></p>
                  <br/>
                  <h3><u><strong>Game Rules:</strong></u></h3>
                  <ol>
                    <li>Only newly entering students (transfer/first year) may enter </li>
                    <li>Must enter a valid CSULB ID number and email address to enter </li>
                    <li>No looking up answers on the internet  </li>
                    <li>This is the honor system -- please do not share answers  </li>
                    <li>Only passing scores (70%+!) will be entered to win prizes </li>
                    <li>Students may take the quiz as many times as it takes them to pass </li>
                    <li>Once you do pass, please do not take again (duplicate student IDs will be removed) </li>
                    <li>One prize maximum per student entry </li>
                    <li>Have fun & learn new things! </li>
                    
                  </ol>
                  <Button variant="primary" onClick={this.startQuiz}>PLAY THE GAME!</Button>
                </div>
              

            </Col>
          </Row>
        </Container>
        </div>
      );

    }
    else if (this.state.rules){
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
                <Jumbotron style={{borderRadius: 25}} fluid>
                  <Image src={currentQuestions[current].imageSrc} fluid />
                </Jumbotron>
              </Col>
            </Row>
            <Row>
              <Col>
                <ProgressBar now={progress} label={`${progress}%`} />
                <Jumbotron style={{borderBottomLeftRadius:10, borderBottomRightRadius: 10}} fluid>
                  <BsArrowLeft className="text-primary nav-arrows left" onClick={this.navLeft} />
                  <h2 style={{paddingLeft: 100, paddingRight: 100}}>{currentQuestions[current].text}</h2>
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