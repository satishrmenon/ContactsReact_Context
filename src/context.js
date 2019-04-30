import React, { Component } from "react";
import Axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(iterator => {
          return iterator.name !== action.payload;
        })
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };

    case "UPDATE_CONTACT":
      console.log(state);
      return {
        ...state,
        contacts: state.contacts.map(iterator =>
          iterator.id === action.payload.id ? action.payload : iterator
        )
      };

    default:
      return state;
  }
};

export class Provider extends Component {
  state = {
    contacts: [],
    dispatch: action => this.setState(state => reducer(state, action))
  };

  async componentDidMount() {
    //Without using Aysnc Await keywords..
    //=======================================
    // Axios.get("https://jsonplaceholder.typicode.com/users")
    // .then(res => {
    //   this.setState(() => {
    //     return {
    //       contacts: res.data
    //     };
    //   });
    // });

    //Using Async Await
    //================================
    const res = await Axios.get("https://jsonplaceholder.typicode.com/users");
    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
