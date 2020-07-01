import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import { BsArrowRight } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
//Statement below should import the json file but it does not
//eventually will request json from DB




function App() {
  let i = 0;
  const questions = require('./questions.json');
  let answer1Holder = questions[i].answer1.text;
  let answer2Holder = questions[i].answer2.text;
  let answer3Holder = questions[i].answer3.text;
  let answer4Holder = questions[i].answer4.text;
  let questionHolder = questions[i].questionText;
  let imageHolder = questions[i].picture;

  return (

    <div className="App">
      <div className="container-fluid">
        <div className="jumbotron fluid-jumbotron">
          <Image src="test.jpg/100px250" fluid/>
          <h6>This is where the image will go</h6>
        </div>
        <div className="jumbotron fluid-jumbotron">
          <h3>{questionHolder}</h3>
        </div>
        <div className="container" id="button group">
          {/* Radio buttons for the answers to the questions */}
          <ToggleButtonGroup type="radio" name="answers" vertical>
            
              <ToggleButton value={1} id="answer1" variant="outline-primary" block>{answer1Holder}</ToggleButton>
              <ToggleButton value={2} id="answer2" variant="outline-primary" block>{answer2Holder}</ToggleButton>          
              <ToggleButton value={3} id="answer3" variant="outline-primary" block>{answer3Holder}</ToggleButton>
              <ToggleButton value={4} id="answer4" variant="outline-primary" block>{answer4Holder}</ToggleButton>
            
          </ToggleButtonGroup>
          </div>
          
          {/* still need navigation buttons, but need to figure out JSON import issue first */}
          {/* Eventually these buttons will be put on the sides respectively */}
          <div className="pull-left">
            <Button variant='outline-danger' id='nav-backward'><BsArrowLeft/></Button>
          </div>
          <div className="pull-right">
            <Button variant='outline-danger' id='nav-forward' className='pull-left'  onClick={i++, answer1Holder = questions[i].answer1.Text}><BsArrowRight/></Button>
          </div>
         
          {/*This is the submit button that will apprear when the student has reached the end of the quiz and will check their answers and load form*/}
          <Button variant='outline-primary' id='check-answers'>Check Answers</Button>
        

          {/*This is the component that will be loaded at the end of the quiz*/}
          {/*This is a form element and will take the user's information*/}
          <div className='container-sm' style={{
            paddingLeft: 250,
            paddingRight:250
          }}>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter student email" />
              <Form.Text className="text-muted">Do not use personal email address</Form.Text>
            </Form.Group>

            <Form.Group controlId='formBasicID'>
              <Form.Label>Student ID</Form.Label>
              <Form.Control placeholder="Enter Student ID"/>

            </Form.Group>
            <Button variant="outline-primary" id="submit-button">Submit</Button>
          </Form>
          </div>
      </div>
    </div>
  );
}
export default App;