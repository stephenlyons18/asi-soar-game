import React from "react"
import {
    Button,
    Col,
    Container,
    Image,
    Row,
    ResponsiveEmbed,
    ButtonGroup,
} from "react-bootstrap"
import "./styles.css"

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
                                    width="75%"
                                    className="mb-2"
                                />
                                <h1 className="sr-only h-1">
                                    Introduction and Rules
                                </h1>
                                <p className="my-2 pull-left">
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
                                <hr />
                                <p className="pull-left">
                                    Before playing the game, take a moment to
                                    review the resources and rules below
                                </p>
                                <div
                                    style={{
                                        width: "auto",
                                        height: "auto",
                                    }}>
                                    <ResponsiveEmbed aspectRatio="16by9">
                                        <iframe
                                            width="100%"
                                            height="400"
                                            title="Soar Game Introduction"
                                            src="https://www.youtube.com/embed/YlldPZ1ZZsc"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen></iframe>
                                    </ResponsiveEmbed>
                                </div>
                                <hr />
                                <h2>Rules of the Game</h2>
                                <ol className="pull-left">
                                    <li>
                                        Only newly entering students
                                        (transfer/first year) may enter{" "}
                                    </li>
                                    <li>
                                        Must enter a valid CSULB ID number and
                                        email address to enter{" "}
                                    </li>
                                    <li>
                                        This is the honor system - please do not
                                        share answers{" "}
                                    </li>
                                    <li>
                                        Only passing scores (70%) will be
                                        entered to win prizes{" "}
                                    </li>
                                    <li>
                                        Students may take the quiz as many times
                                        as it takes them to pass{" "}
                                    </li>
                                    <li>
                                        Once you do pass, feel free to take the
                                        quiz again, but you can only enter one
                                        time per student ID
                                    </li>
                                    <li>One prize maximum per student entry</li>
                                    <li>Have fun and learn new things! </li>
                                </ol>
                                <div className="text-center">
                                    <Button href="/quiz" variant="primary">
                                        PLAY THE GAME
                                    </Button>
                                </div>
                                <hr />
                                <p className="pull-left">
                                    <span className="red-text">
                                        Prizes and winners will be announced the
                                        week of September 27th!
                                    </span>{" "}
                                    Keep an eye out in your CSULB email inbox
                                    for updates as the date nears.
                                </p>
                                <div className="mb-2">
                                    <Button
                                        href="https://soar-pdfs.s3-us-west-1.amazonaws.com/SM20_COMM_SOAR.pdf"
                                        variant="info"
                                        target="_blank"
                                        className="mb-2"
                                        size="sm">
                                        ASI SOAR POWERPOINT
                                    </Button>
                                    <br />
                                    <Button
                                        href="https://www.asicsulb.org/corporate/resources/about-us"
                                        variant="success"
                                        target="_blank"
                                        size="sm">
                                        MORE ON ASI HISTORY
                                    </Button>
                                </div>
                            </div>
                            <hr />
                            <div className="text-center">
                                <p>
                                    1212 Bellflower Blvd, USU-229, Long Beach,
                                    California 90815
                                    <br /> (562) 985-4834 |
                                    <a href="mailto:asi-studentunion@csulb.edu">
                                        {" "}
                                        asi-studentunion@csulb.edu
                                    </a>
                                </p>
                                <ButtonGroup size="sm" className="mb-2">
                                    <Button
                                        href="https://www.asicsulb.org/corporate/"
                                        variant="secondary"
                                        target="_blank">
                                        ASI
                                    </Button>
                                    <Button
                                        href="https://www.asicsulb.org/gov/"
                                        variant="secondary"
                                        target="_blank">
                                        Gov
                                    </Button>
                                    <Button
                                        href="https://www.asirecreation.org/"
                                        variant="secondary"
                                        target="_blank">
                                        SRWC
                                    </Button>
                                    <Button
                                        href="https://www.22westmedia.com/"
                                        variant="secondary"
                                        target="_blank">
                                        22 West
                                    </Button>
                                    <Button
                                        href="https://www.csulb.edu/"
                                        variant="secondary"
                                        target="_blank">
                                        CSULB
                                    </Button>
                                </ButtonGroup>
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
