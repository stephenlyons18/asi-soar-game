import React, { Component } from "react"
import "./styles.css"

// React Bootstrap Components
import {
    Alert,
    Col,
    Container,
    Image,
    ProgressBar,
    Row,
    Spinner,
    ButtonGroup,
    Button,
} from "react-bootstrap"

// Custom Components
import Passed from "./Passed"
import Failed from "./Failed"

class Quiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            current: 0,
            currentQuestions: [],
            answers: [],
            isLoaded: false,
            hasPassed: false,
            hasFailed: false,
            error: null,
            uploadSuccess: false,
            progress: 0,
            isLastQuestion: false,
        }
        this.allQuestions = []
        this.userForm = {}
        this.score = 0
        this.mobile = false
    }

    componentDidMount() {
        // Get all questions from server
        fetch("https://soarquestions.s3-us-west-1.amazonaws.com/questions.json")
            .then((res) => res.json())
            .then(
                (result) => {
                    this.allQuestions = result
                    this.initQuestions()
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error,
                    })
                },
            )
    }

    // resetQuiz = () => {

    //     // console.log("I WAS CALLED")
    //     // this.setState({
    //     //     current: 0,
    //     //     answers: [],
    //     //     hasFailed: false,
    //     // })
    //     // this.initQuestions()
    //     // this.score = 0
    //     // console.log("I SHOULD BE 0! " + this.state.current)
    //     // console.log("I SHOULD BE EMPTY! " + this.state.answers)
    // }

    initQuestions = () => {
        this.shuffleQuestions(this.allQuestions)
        this.setState({
            currentQuestions: this.allQuestions.slice(0, 10),
            isLoaded: true,
        })
    }

    saveQuestion = (value) => {
        this.setState((state) => {
            const newAnswers = [...state.answers]
            newAnswers[state.current] = value
            state.progress = state.current * 10
            state.answers = newAnswers
            console.table(state.answers)
        })
    }

    saveForm = (event) => {
        const name = event.target.name
        const value = event.target.value
        this.userForm[name] = value
    }

    navLeft = () => {
        if (this.state.current > 0) {
            this.setState((state) => ({
                current: state.current - 1,
            }))
        }
    }

    navRight = (value) => {
        this.setState((state) => ({
            current: state.current + 1,
            isLastQuestion:
                state.current === this.state.currentQuestions.length - 1,
        }))
        this.saveQuestion(value)
    }

    shuffleQuestions = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[rand]] = [array[rand], array[i]]
        }
    }

    checkAnswers = () => {
        if (this.state.answers[0] === undefined) {
            this.state.answers.shift()
        }
        console.log(this.state.answers)
        this.state.answers.forEach((value, index) => {
            if (
                !(this.state.currentQuestions[index] === undefined || index > 9)
            ) {
                console.log(
                    "CURRENT QUESTIONS ARRAY: " +
                        this.state.currentQuestions[index].correctAnswer,
                )
                console.log("ANSWERS ARRAY: " + this.state.answers)
                if (
                    value === this.state.currentQuestions[index].correctAnswer
                ) {
                    console.log("YOU GOT IT RIGHT AT INDEX: " + index)
                    this.score++
                }
            }
        })
        console.log("SCORE: ", this.score)
        if (this.score >= 7) {
            this.setState({
                hasPassed: true,
            })
        } else {
            this.setState({
                hasFailed: true,
            })
        }
    }

    submit = (event) => {
        // TODO: Form validation

        event.preventDefault()
        event.stopPropagation()

        // Prepare data to send to server
        const data = {
            student_id: this.userForm.studentID,
            firstName: this.userForm.firstName,
            lastName: this.userForm.lastName,
            email: this.userForm.email,
            score: this.score,
        }

        console.log(data)

        // TODO: Uncomment below to test server

        fetch(
            "https://309u5urphk.execute-api.us-west-1.amazonaws.com/pre-test-1/uploadscore",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": "PTf2wlXBFd52BtT3IHotQ2u3lUdxgCN4zNJtgd5b",
                },
                body: JSON.stringify(data),
            },
        )
            .then((res) => res.json())
            .then(
                (result) => {
                    console.log(result)
                },
                (error) => {
                    console.log(error)
                },
            )
        this.setState({
            uploadSuccess: true,
        })
    }

    render() {
        if (this.state.error) {
            // TODO: Show an error message
            return null
        } else if (!this.state.isLoaded) {
            return (
                <Container className="text-center my-5">
                    <Spinner
                        animation="border"
                        variant="primary"
                        role="status"></Spinner>
                </Container>
            )
        } else if (this.state.hasPassed) {
            return <Passed score={this.score} />
        } else if (this.state.hasFailed) {
            if (Window.width > 360) {
                return (
                    <Alert variant="danger">
                        Please rotate your device for a better mobile experience
                    </Alert>
                )
            } else {
                return <Failed score={this.score} resetQuiz={this.resetQuiz} />
            }
        } else {
            return (
                <Container className="my-5">
                    <div
                        className="bg-dark text-center py-2"
                        style={{ height: "100%", borderRadius: "5px" }}>
                        <Row>
                            <Col>
                                <ProgressBar
                                    now={this.state.progress}
                                    label={`${this.state.progress}%`}
                                    animated
                                    className="my-2 mx-3"
                                />
                            </Col>
                        </Row>
                        {this.state.isLastQuestion ? (
                            <>
                                <Row className="mt-4">
                                    <Col>
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            onClick={this.checkAnswers}>
                                            Get Your Score!
                                        </Button>
                                        <br />
                                    </Col>
                                </Row>
                            </>
                        ) : (
                            <>
                                <Row>
                                    <Col>
                                        <Image
                                            src={
                                                this.state.currentQuestions[
                                                    this.state.current
                                                ].imageSrc
                                            }
                                            alt={
                                                this.state.currentQuestions[
                                                    this.state.current
                                                ].altText
                                            }
                                            width="95%"
                                            rounded
                                            style={{
                                                opacity: "0.9",
                                                borderTop: "3px solid #e83283",
                                                borderBottom:
                                                    "3px solid #3a8fd9",
                                                marginBottom: "5%",
                                            }}
                                        />
                                        <h1>
                                            {
                                                this.state.currentQuestions[
                                                    this.state.current
                                                ].text
                                            }
                                        </h1>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <ButtonGroup
                                            className="answerButtons"
                                            size="lg"
                                            name={
                                                "question-" + this.state.current
                                            }
                                            value={
                                                this.state.answers[
                                                    this.state.current
                                                ] || null
                                            }
                                            vertical={window.innerWidth < 780}>
                                            {this.state.currentQuestions[
                                                this.state.current
                                            ].options.map((option) => (
                                                <Button
                                                    key={option.value}
                                                    value={option.value}
                                                    variant="outline-primary"
                                                    onClick={() =>
                                                        this.navRight(
                                                            option.value,
                                                        )
                                                    }>
                                                    {option.text}
                                                </Button>
                                            ))}
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </div>
                </Container>
            )
        }
    }
}
export default Quiz
