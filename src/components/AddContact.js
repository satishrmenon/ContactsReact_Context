import React, { Component } from "react";
import { Consumer } from "./../context";
import TextInputGroup from "./TextInputGroup";
import Axios from "axios";

class AddContact extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    phone: "",
    errors: {}
  };
  onFormSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;

    //Check for errors...
    if (name === "") {
      this.setState({ errors: { name: "Name is required" } });
      return;
    }

    if (email === "") {
      this.setState({ errors: { email: "Email is required" } });
      return;
    }

    if (phone === "") {
      this.setState({ errors: { phone: "Phone is required" } });
      return;
    }

    const newContact = {
      name: name,
      email: email,
      phone: phone
    };

    // Without Async and Await
    // ===============================================
    // Axios.post("https://jsonplaceholder.typicode.com/users", newContact).then(
    //   res => dispatch({ type: "ADD_CONTACT", payload: newContact })
    // );

    // Using Async and Await
    // =======================================
    const res = await Axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    dispatch({
      type: "ADD_CONTACT",
      payload: res.data
    });

    //Clear State...

    this.setState({
      name: "",
      email: "",
      phone: "",
      errors: {}
    });

    this.props.history.push("/");
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form
                  action=""
                  onSubmit={this.onFormSubmit.bind(this, dispatch)}
                >
                  <TextInputGroup
                    label="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.onInputChange}
                    error={errors.name}
                  />

                  <TextInputGroup
                    label="email"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.onInputChange}
                    error={errors.email}
                  />

                  <TextInputGroup
                    label="phone"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={this.onInputChange}
                    error={errors.phone}
                  />

                  <input
                    type="submit"
                    className="btn btn-block btn-info"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
