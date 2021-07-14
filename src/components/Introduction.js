import React from "react"
import {
    Button,
    Col,
    Container,
    Image,
    Row,
    ResponsiveEmbed,
    Jumbotron,
} from "react-bootstrap"

const Introduction = () => {
    return (
        <div className="rules-background">
            <Container fluid>
                <div className="splash bg-dark">
                    <Row>
                        <Col>
                            <div className="text-center">
                                <Image
                                    src="https://soar-images.s3-us-west-1.amazonaws.com/ASI%2BLBSUlogo_wide_CMYK-CLR.jpg"
                                    fluid
                                    rounded
                                    className="mb-2"
                                />
                                <h1 className="sr-only h-1">
                                    Introduction and Rules
                                </h1>
                                <p className="my-2">
                                    Welcome to ASI at Long Beach State
                                    University! We are excited to have you as a
                                    part of the Beach community for the new
                                    2020-2021 school year. Although things may
                                    look different for the coming semester due
                                    to the global pandemic, we want you to know
                                    that our ASI resources and services are
                                    still open and available to you. As part of
                                    your orientation, in order to learn more
                                    about the student body, LBSU and our history
                                    we have put together a fun and informative
                                    quiz for you to take. Test out your
                                    knowledge, take in some Beach facts, and who
                                    knows you may even win a prize in the
                                    process!{" "}
                                </p>
                                <Button
                                    size="lg"
                                    href="/quiz"
                                    variant="primary">
                                    PLAY THE GAME!
                                </Button>
                                <hr />
                                <p>
                                    <strong>
                                        Before playing the game, take a moment
                                        to review the resources and rules below
                                    </strong>
                                </p>
                                <div
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}>
                                    <ResponsiveEmbed aspectRatio="16by9">
                                        <iframe
                                            src="https://www.youtube.com/embed/6cftoxb0uOM"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen></iframe>
                                    </ResponsiveEmbed>
                                </div>
                                <hr />
                                <br />
                                <Button
                                    href="https://soar-pdfs.s3-us-west-1.amazonaws.com/SM20_COMM_SOAR.pdf"
                                    variant="outline-primary"
                                    style={{ marginRight: 15 }}
                                    target="_blank">
                                    Review the ASI SOAR PPT
                                </Button>
                                <Button
                                    href="https://www.asicsulb.org/corporate/resources/about-us"
                                    variant="outline-primary"
                                    target="_blank">
                                    Review ASI History
                                </Button>
                                <strong>
                                    <p>
                                        <span className="red-text">
                                            Prizes and winners will be announced
                                            the week of August 31st!
                                        </span>{" "}
                                        Keep an eye out in your CSULB email
                                        inbox for updates as the date nears.
                                    </p>
                                </strong>

                                <h2>
                                    <strong>Game Rules</strong>
                                </h2>
                            </div>
                            <ol>
                                <li>
                                    Only newly entering students (transfer/first
                                    year) may enter{" "}
                                </li>
                                <li>
                                    Must enter a valid CSULB ID number and email
                                    address to enter{" "}
                                </li>
                                <li>
                                    This is the honor system -- please do not
                                    share answers{" "}
                                </li>
                                <li>
                                    Only passing scores (70%+!) will be entered
                                    to win prizes{" "}
                                </li>
                                <li>
                                    Students may take the quiz as many times as
                                    it takes them to pass{" "}
                                </li>
                                <li>
                                    Once you do pass, feel free to take the quiz
                                    again, but you can only enter one time per
                                    student ID
                                </li>
                                <li>One (1) prize maximum per student entry</li>
                                <li>Have fun & learn new things! </li>
                            </ol>
                            <div className="text-center">
                                <Button href="/quiz" variant="primary">
                                    PLAY THE GAME!
                                </Button>
                            </div>
                            <hr />
                            <div className="footer">
                                <p>
                                    1212 Bellflower Blvd., USU-229, Long Beach,
                                    California 90815 <br /> (562) 985-4834 |
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
                                        ASI
                                    </a>{" "}
                                    |{" "}
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
                                        Copyright © 2020. Associated Students,
                                        Inc
                                    </i>
                                </p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Introduction
