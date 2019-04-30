import React, { Component } from "react";
import Contact from "./Contact";
import { Consumer } from "./../context";

class ContactList extends Component {
  render() {
    return (
      <Consumer>
        {value => {
          const { contacts } = value;
          return (
            <React.Fragment>
              <h1 className="display-5 mb-2">
                <span className="text-primary">Contact</span> List
              </h1>
              {contacts.map(iterator => {
                return (
                  <Contact
                    key={iterator.name}
                    contact={iterator}
                    deleteClickHandler={this.deleteContact}
                  />
                );
              })}
            </React.Fragment>
          );
        }}
      </Consumer>
    );
  }
}

export default ContactList;
