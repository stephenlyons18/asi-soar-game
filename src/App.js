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
  questions = require('./questions.json');
  //const answer1 = questions[0].answer1;
  const answer2 = "Test2";

  return (

    <div className="App">
      <div class="container-fluid">
        <div class="jumbotron fluid-jumbotron">
          <Image src="test.jpg/100px250" fluid/>
          <h6>This is where the image will go</h6>
        </div>
        <div class="jumbotron fluid-jumbotron">
          <h3>This is where the question will go</h3>
        </div>
        <div id="button group">
          {/* Radio buttons for the answers to the questions */}
          <ToggleButtonGroup type="radio" name="answers" defaultValue="{1}" vertical>
            
            {/* <ToggleButton value={1} size="lg" id="answer1" variant="outline-primary" block>{answer1}</ToggleButton> */}
            <ToggleButton value={2} size="lg" id="answer2" variant="outline-primary" block>{answer2}</ToggleButton>
            <ToggleButton value={3} size="lg" id="answer3" variant="outline-primary" block>Answer 3</ToggleButton>
            <ToggleButton value={4} size="lg" id="answer4" variant="outline-primary" block>Answer 4</ToggleButton>
          </ToggleButtonGroup>
          </div>
          
          {/* still need navigation buttons, but need to figure out JSON import issue first */}
          {/* Eventually these buttons will be put on the sides respectively */}
          <div class="pull-left">
            <Button variant='outline-danger' id='nav-backward'><BsArrowLeft/></Button>
          </div>
          <div class="pull-right">
            <Button variant='outline-danger' id='nav-forward' class='pull-left'><BsArrowRight/></Button>
          </div>
          <br/>
          {/*This is the submit button that will apprear when the student has reached the end of the quiz and will check their answers and load form*/}
          <Button variant='outline-primary' id='check-answers'>Check Answers</Button>
          <br/>

          {/*This is the component that will be loaded at the end of the quiz*/}
          {/*This is a form element and will take the user's information*/}
          <div class='container-sm' style={{
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