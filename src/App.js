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
      rules: false,
      uploadSuccess: false
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
    this.setState({
      uploadSuccess: true
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
        <div className="background2">
          
        <Container fluid style={{paddingLeft: 250, paddingRight: 250}}>
        <div class="splash">
        <div className="text-center">
        <h3>Congratuations! You scored {this.score}/10!</h3>
        <p>Enter your information below to claim your prize!</p>
        </div>
          <Row>
            <Col>
              <Form className="mx-auto p-5 userForm" onSubmit={this.submit}>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control required type="text" placeholder="John" name="firstName" onChange={this.saveForm} />
                </Form.Group>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control required type="text" name="lastName" placeholder="Doe" onChange={this.saveForm} />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Student Email Address</Form.Label>
                  <Form.Control required type="email" name="email" placeholder="name@student.csulb.edu" onChange={this.saveForm}/>
                  <Form.Text className="text-muted">Please use your CSULB email address</Form.Text>
                </Form.Group>
                <Form.Group controlId='studentID'>
                  <Form.Label>Student ID</Form.Label>
                  <Form.Control required type="text" name="studentID" placeholder="Student ID" onChange={this.saveForm} />
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
                <Alert variant="info" className="mt-3">
                  <Alert.Heading>Disclaimer</Alert.Heading>
                  <p>
                    Lorem ipsum dolor sit amet, per ut ipsum intellegat, ad eum quot nihil repudiandae.
                    In homero repudiandae has, ut sit porro zril. An mel dolor reprimique assueverit,
                    amet nostrum eu cum. Mei te laoreet appellantur. <strong>Winners will be notified and
                    informed on August 20, the week before classes!</strong>
                  </p>
                </Alert>
                {this.state.uploadSuccess &&
                <Alert variant="success">Your information was successfully uploaded!
                <Alert.Link href="https://www.asicsulb.org"> Click here</Alert.Link> to navigate to ASI's home page
                </Alert>
                
                }
              </Form>
              
            </Col>
          </Row>
          </div>
        </Container>
        </div>
      );      
    } else if (this.state.hasFailed) {
      return (
        <div className="background-failed">
        <Container fluid>
          <Row>
            <Col className="fullHeight d-flex align-items-center">
              <Alert variant="danger" className="mx-auto p-4 noticeAlert">
              <Alert.Heading className="text-center">Shoot, you didn't pass. You got a {this.score}/10</Alert.Heading>
                <p>
                But not to worry, you can try again! Take some time to review the resources available to you on the main page at <a href="http://soar2020.s3-website-us-west-1.amazonaws.com/">www.asicsulb.org/soar</a>. You're almost there!
                </p>
                <p>Once you pass, you will unlock the entry portal where you can enter to win many great prizes!</p>
                <hr />
                <div className="d-flex justify-content-center">
                  <Button variant="danger" size="lg" onClick={this.resetQuiz}>Let's Try Again</Button>
                </div>
              </Alert>
            </Col>
          </Row>
        </Container>
        </div>
      );
    }
    else if (!this.state.rules){
      return(
        <div className="rules-background">
        
        <Container fluid style={{paddingLeft: 200, paddingRight: 200}}>
        <div className="splash">
          <Row className="fullHeight d-flex align-items-center">
            <Col>
              
                
                  <div className="text-center">
                    <h1 className="sr-only"><strong><u>Introduction and Rules</u></strong></h1>
                    <Image src="https://soar-images.s3-us-west-1.amazonaws.com/ASI%2BLBSUlogo_wide_CMYK-CLR.jpg" fluid style={{height: 150, width: 300}}/>
                    <h2><strong>Introduction</strong></h2>
                    <p>Welcome to ASI at Long Beach State University! We are excited to have you as a part of the Beach community for the new 2020-2021 school year. Although things may look different for the coming semester due to the global pandemic, we want you to know that our ASI resources and services are still open and available to you. As part of your orientation, in order to learn more about the student body, LBSU and our history we have put together a fun and informative quiz for you to take. Test out your knowledge, take in some Beach facts, and who knows you may even win a prize in the process! </p>
                    <p>Before playing the game, take a moment to review the resources and rules below</p>
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/6cftoxb0uOM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <hr/>
                    <br/>
                    <Button href="https://soar-pdfs.s3-us-west-1.amazonaws.com/SM20_COMM_SOAR.pdf" variant="outline-primary">Review the ASI SOAR PPT</Button>
                    <Button href="https://www.asicsulb.org/corporate/resources/about-us" variant="outline-primary">Review ASI History</Button>
                    <strong><p>Prizes and winners will be announced the week before classes (between Aug. 17-21)! Keep an eye out in your CSULB email inbox for updates as the date nears.</p></strong>
                    
                    <h2><strong>Game Rules</strong></h2>
                    </div>
                  <ol>
                    <li>Only newly entering students (transfer/first year) may enter </li>
                    <li>Must enter a valid CSULB ID number and email address to enter </li>
                    <li>This is the honor system -- please do not share answers  </li>
                    <li>Only passing scores (70%+!) will be entered to win prizes </li>
                    <li>Students may take the quiz as many times as it takes them to pass </li>
                    <li>Once you do pass, feel free to take the quiz again, but you can only enter one time per student ID</li>
                    <li>One (1) prize maximum per student entry</li>
                    <li>Have fun & learn new things! </li>
                    
                  </ol>
                  <div class="text-center">
                   <Button variant="primary" onClick={this.startQuiz} >PLAY THE GAME!</Button>
                  </div>
                
              

            </Col>
          </Row>
          </div>
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
          
            <Image src={currentQuestions[current].imageSrc} fluid />
                
            <Row>
              <Col>
                <ProgressBar now={progress} label={`${progress}%`} />
                <Jumbotron style={{borderBottomLeftRadius:10, borderBottomRightRadius: 10}} fluid>
                  <BsArrowLeft className="text-primary nav-arrows left" onClick={this.navLeft} />
                  <h3 style={{paddingLeft: 100, paddingRight: 100}}>{currentQuestions[current].text}</h3>
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
                  <br/>
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