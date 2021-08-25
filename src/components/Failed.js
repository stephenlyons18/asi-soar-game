import React from "react"
import { Col, Container, Button, Row, Image, ButtonGroup } from "react-bootstrap"
import "./styles.css"

const Failed = (props) => {
    return (
        <div className="background-failed fullHeight">
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
                                    <h2>Shoot, you didn't pass. You got a {props.score}
                                        /10</h2>
                                    <p>
                                        But not to worry, you can try again! Take some
                                        time to review the resources available to you on
                                        the main page at{" "}
                                        <a href="http://soar2020.s3-website-us-west-1.amazonaws.com/">
                                            www.asicsulb.org/soar
                                        </a>
                                        . You're almost there!
                                    </p>
                                    <p>
                                        UNLOCK the prize entry portal by testing out
                                        your knowledge and taking in some Beach facts.
                                        Get 7 out of 10 right and enter yourself to win
                                        one of many great prizes – which include Apple
                                        AirPods, Beach swag, apparel, Hydroflasks, and
                                        so much more!
                                    </p>
                                    
                                    <div className="d-flex justify-content-center">
                                        <Button variant="danger" size="lg" href="/quiz">
                                            Let's Try Again
                                        </Button>
                                    </div>
                                    <hr/>
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
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    )
}

export default Failed