import React, { Component } from "react";
import { Consumer } from "../context";
import Axios from "axios";
import { Link } from "react-router-dom";

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  //Without Async Await..
  //==============================================
  // onDeleteClick =   (name, dispatch) => {
  //   Axios.delete(`https://jsonplaceholder.typicode.com/users/${name}`).then(
  //     res =>
  //       dispatch({
  //         type: "DELETE_CONTACT",
  //         payload: name
  //       })
  //   );
  // };

  //Using Async Await
  //===============================================
  onDeleteClick = async (name, dispatch) => {
    await Axios.delete(`https://jsonplaceholder.typicode.com/users/${name}`);
    dispatch({
      type: "DELETE_CONTACT",
      payload: name
    });
  };

  onShowClick = () => {
    this.setState(() => {
      return {
        showContactInfo: !this.state.showContactInfo
      };
    });
  };

  render() {
    const { id, name, email, phone } = this.props.contact;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h6>
                {name} &nbsp;
                <i
                  className="text-primary fas fa-caret-square-down"
                  style={{ cursor: "pointer" }}
                  onClick={this.onShowClick}
                />
                <Link to={`contact/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: "pointer",
                      float: "right",
                      color: "black",
                      marginRight: "1rem",
                      marginLeft: "1rem"
                    }}
                  />
                </Link>
                <i
                  className="fas fa-times"
                  style={{ cursor: "pointer", float: "right", color: "red" }}
                  onClick={() => {
                    this.onDeleteClick(name, dispatch);
                  }}
                />
              </h6>
              {this.state.showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">Email: {email}</li>
                  <li className="list-group-item">Phone : {phone}</li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default Contact;
