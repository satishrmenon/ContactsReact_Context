import React from "react";
import ContactList from "./ContactList";
import Header from "./Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "./../context";
import AddContact from "./AddContact";
import EditContacts from "./EditContacts";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import About from "./About";
import NotFound from "./NotFound";
function App() {
  return (
    <Provider>
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={ContactList} />
              <Route exact path="/contact/add" component={AddContact} />
              <Route exact path="/contact/edit/:id" component={EditContacts} />

              <Route exact path="/about" component={About} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
