import React from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"

// Bootstrap theme (Bootswatch)
import "bootswatch/dist/quartz/bootstrap.min.css"

// Custom Components
import Quiz from "./components/Quiz"
import Introduction from "./components/Introduction"
import Passed from "./components/Passed"

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Introduction} />
                <Route path="/quiz" component={Quiz} />
                <Route path="/passed" component={Passed} />
            </Switch>
        </Router>
    )
}

export default App
