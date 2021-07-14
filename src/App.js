import React from "react"
import Quiz from "./components/Quiz"
import Introduction from "./components/Introduction"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import "bootswatch/dist/quartz/bootstrap.min.css"

const App = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Introduction} />
                <Route path="/quiz" component={Quiz} />
            </Switch>
        </Router>
    )
}

export default App
