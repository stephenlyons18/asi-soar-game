import React, { Component } from "react"
import "./Quiz.css"

// React Bootstrap Components
import {
    Alert,
    Button,
    Col,
    Container,
    Image,
    Jumbotron,
    ProgressBar,
    Row,
    Spinner,
    ToggleButton,
    ToggleButtonGroup,
    ResponsiveEmbed,
} from "react-bootstrap"

// React Icons Components
import { BsArrowLeft } from "react-icons/bs"
import { BsArrowRight } from "react-icons/bs"

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

    resetQuiz = () => {
        this.initQuestions()
        this.setState({
            current: 0,
            answers: [],
            hasFailed: false,
        })
        this.score = 0
    }

    initQuestions = () => {
        this.shuffleQuestions(this.allQuestions)
        this.setState({
            currentQuestions: this.allQuestions.slice(0, 10),
            isLoaded: true,
        })
    }

    saveQuestion = (val) => {
        this.setState((state) => {
            const newAnswers = [...state.answers]
            newAnswers[state.current] = val
            return {
                answers: newAnswers,
            }
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

    navRight = () => {
        if (this.state.current < this.state.currentQuestions.length - 1) {
            this.setState((state) => ({
                current: state.current + 1,
            }))
        }
    }

    shuffleQuestions = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1))
            ;[array[i], array[rand]] = [array[rand], array[i]]
        }
    }

    checkAnswers = () => {
        this.state.answers.forEach((value, index) => {
            if (value === this.state.currentQuestions[index].correctAnswer) {
                this.score++
            }
        })

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
                <Container fluid>
                    <Row>
                        <Col>
                            <Spinner
                                animation="border"
                                variant="primary"
                                role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </Col>
                    </Row>
                </Container>
            )
        } else if (this.state.hasPassed) {
            return (
                <div className="background2">
                    <Container fluid>
                        <div className="splash">
                            <div className="text-center">
                                <Image
                                    src="https://soar-images.s3-us-west-1.amazonaws.com/ASI%2BLBSUlogo_wide_CMYK-CLR.jpg"
                                    fluid
                                    style={{ height: 150, width: 300 }}
                                />

                                <h3>
                                    Congratuations! You scored {this.score}/10!
                                </h3>
                                <p>
                                    Great job! You have{" "}
                                    <span className="gold-text">UNLOCKED</span>{" "}
                                    the prize entry portal and are ready for
                                    life at the Beach. Please enter your
                                    information below. Many incoming students
                                    are still going through SOAR, so we will
                                    announce the prizes the week of Feb. 8th.
                                    Our team will contact you through the CSULB
                                    email you use below, so make sure it is
                                    accurate.
                                </p>
                            </div>
                            <Row>
                                <Col>
                                    <ResponsiveEmbed>
                                        <iframe
                                            src="https://csulb.qualtrics.com/jfe/form/SV_6E8EAzBlCWPZISF"
                                            aspectRatio="16by9"></iframe>
                                    </ResponsiveEmbed>
                                    <div className="text-center">
                                        <h4>
                                            Click
                                            <a
                                                href="https://www.asicsulb.org/corporate/"
                                                target="_blank">
                                                {" "}
                                                here
                                            </a>{" "}
                                            to navigate to ASI's home page
                                        </h4>
                                    </div>
                                    <hr />
                                    <div className="footer">
                                        <p>
                                            1212 Bellflower Blvd., USU-229, Long
                                            Beach, California 90815 (562)
                                            985-4834 |
                                            <a href="mailto:asi-studentunion@csulb.edu">
                                                {" "}
                                                asi-studentunion@csulb.edu
                                            </a>
                                        </p>
                                        <hr />
                                        <p>
                                            <a
                                                href="https://www.asicsulb.org/corporate/"
                                                target="_blank">
                                                ASI |{" "}
                                            </a>
                                            <a
                                                href="https://www.asicsulb.org/gov/"
                                                target="_blank">
                                                Student Government
                                            </a>{" "}
                                            |{" "}
                                            <a
                                                href="https://www.asirecreation.org/"
                                                target="_blank">
                                                SRWC
                                            </a>{" "}
                                            |{" "}
                                            <a
                                                href="https://www.22westmedia.com/"
                                                target="_blank">
                                                22 West Media
                                            </a>{" "}
                                            |{" "}
                                            <a
                                                href="https://www.csulb.edu/"
                                                target="_blank">
                                                CSULB
                                            </a>
                                        </p>
                                        <p>
                                            <i>
                                                Copyright © 2020. Associated
                                                Students, Inc
                                            </i>
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </div>
            )
        } else if (this.state.hasFailed) {
            if (Window.width > 360) {
                return (
                    <Alert variant="danger">
                        Please rotate your device for a better mobile experience
                    </Alert>
                )
            } else {
                return (
                    <div className="background-failed">
                        <Container fluid>
                            <Row>
                                <Col className="fullHeight d-flex align-items-center">
                                    <Alert
                                        variant="danger"
                                        className="mx-auto p-4 noticeAlert">
                                        <Alert.Heading className="text-center">
                                            Shoot, you didn't pass. You got a{" "}
                                            {this.score}/10
                                        </Alert.Heading>
                                        <p>
                                            But not to worry, you can try again!
                                            Take some time to review the
                                            resources available to you on the
                                            main page at{" "}
                                            <a href="http://soar2020.s3-website-us-west-1.amazonaws.com/">
                                                www.asicsulb.org/soar
                                            </a>
                                            . You're almost there!
                                        </p>
                                        <p>
                                            UNLOCK the prize entry portal by
                                            testing out your knowledge and
                                            taking in some Beach facts. Get 7
                                            out of 10 right and enter yourself
                                            to win one of many great prizes –
                                            which include Apple AirPods, Beach
                                            swag, apparel, Hydroflasks, and so
                                            much more!
                                        </p>
                                        <hr />
                                        <div className="d-flex justify-content-center">
                                            <Button
                                                variant="danger"
                                                size="lg"
                                                onClick={this.resetQuiz}>
                                                Let's Try Again
                                            </Button>
                                        </div>
                                    </Alert>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )
            }
        } else {
            return (
                <>
                    <div className="Quiz">
                        <Container fluid>
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
                                fluid
                            />

                            <Row>
                                <Col>
                                    <ProgressBar
                                        now={this.state.progress}
                                        label={`${this.state.progress}%`}
                                    />
                                    <Jumbotron className="jumbo" fluid>
                                        <BsArrowLeft
                                            className="text-primary nav-arrows left"
                                            onClick={this.navLeft}
                                        />
                                        <h3
                                            style={{
                                                paddingLeft: 100,
                                                paddingRight: 100,
                                            }}>
                                            {
                                                this.state.currentQuestions[
                                                    this.state.current
                                                ].text
                                            }
                                        </h3>
                                        <BsArrowRight
                                            className="text-primary nav-arrows right"
                                            onClick={this.navRight}
                                        />
                                    </Jumbotron>
                                </Col>
                            </Row>

                            <Row>
                                <Col>
                                    <ToggleButtonGroup
                                        className="answerButtons"
                                        size="lg"
                                        name={"question-" + this.state.current}
                                        value={
                                            this.state.answers[
                                                this.state.current
                                            ] || null
                                        }
                                        onChange={this.saveQuestion}
                                        vertical={window.innerWidth < 780}>
                                        {this.state.currentQuestions[
                                            this.state.current
                                        ].options.map((option) => (
                                            <ToggleButton
                                                key={option.value}
                                                value={option.value}
                                                variant="outline-primary">
                                                {option.text}
                                            </ToggleButton>
                                        ))}
                                    </ToggleButtonGroup>
                                </Col>
                            </Row>

                            {this.state.isLastQuestion && (
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
                            )}
                        </Container>
                    </div>
                </>
            )
        }
    }
}
export default Quiz
