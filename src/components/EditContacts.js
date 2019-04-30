import React, { Component } from "react";
import { Consumer } from "./../context";
import TextInputGroup from "./TextInputGroup";
import Axios from "axios";

class EditContact extends Component {
  state = {
    id: "",
    name: "",
    email: "",
    phone: "",
    errors: {}
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    const res = await Axios.get(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;
    console.log("Contact", contact);

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone
    });
  }

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

    const { id } = this.props.match.params;
    const updContact = {
      name,
      email,
      phone
    };
    const res = await Axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updContact
    );
    dispatch({
      type: "UPDATE_CONTACT",
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
              <div className="card-header">Edit Contact</div>
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
                    value="Update Contact"
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

export default EditContact;
