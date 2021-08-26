import React from "react"
import {
    Col,
    Container,
    Image,
    Row,
    Button,
    ButtonGroup,
} from "react-bootstrap"
import "./styles.css"

const Passed = (props) => {
    return (
        <div className="rules-background">
            <Container fluid>
                <div className="splash bg-dark px-2">
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
                                <h3>
                                    Congratuations! You scored {props.score} /
                                    10! That's {(props.score / 10) * 100}%!
                                </h3>
                                <hr />
                                <p className="pull-left">
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
                                <hr />
                                <iframe
                                width="95%"
                                height="889"
                                title="Soar Game Introduction"
                                style={{borderRadius: "10px"}}
                                src="https://csulb.qualtrics.com/jfe/form/SV_6E8EAzBlCWPZISF" />
                                <hr/>
                                <p className="pull-left">
                                    <span className="red-text">
                                        Prizes and winners will be announced the
                                        week of August 31st!
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

export default Passed
