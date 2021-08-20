import React from "react"
import { Col, Container, Alert, Button, Row } from "react-bootstrap"
import "./styles.css"

const Failed = (props) => {
    return (
        <div className="background-failed">
            <Container fluid>
                <Row>
                    <Col className="fullHeight d-flex align-items-center">
                        <Alert
                            variant="danger"
                            className="mx-auto p-4 noticeAlert">
                            <Alert.Heading className="text-center">
                                Shoot, you didn't pass. You got a {props.score}
                                /10
                            </Alert.Heading>
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
                            <hr />
                            <div className="d-flex justify-content-center">
                                <Button variant="danger" size="lg" href="/quiz">
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

export default Failed
