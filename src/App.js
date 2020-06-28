import React from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ReactDom from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Image from 'react-bootstrap/Image'
//Statement below should import the json file but it does not
//eventually will request json from DB

//import questions from 'questions.JSON';

//const answer1 = questions[1].answer1
function App() {
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
            <ToggleButton value={1} size="lg" id="answer1" variant="outline-primary" block>answer1</ToggleButton>
            <ToggleButton value={2} size="lg" id="answer2" variant="outline-primary" block>Answer 2</ToggleButton>
            <ToggleButton value={3} size="lg" id="answer3" variant="outline-primary" block>Answer 3</ToggleButton>
            <ToggleButton value={4} size="lg" id="answer4" variant="outline-primary" block>Answer 4</ToggleButton>
          </ToggleButtonGroup>
          </div>
          
          {/* still need navigation buttons, but need to figure out JSON import issue first */}
          {/* Eventually these buttons will be put on the sides respectively */}
          <Button variant='outline-danger'>This is a navigation button</Button>
          <Button variant='outline-danger'>This is the second navigation button</Button>
      
      </div>
    </div>
  );
}

export default App;
