import React from "react";

class Form extends React.Component {
  state = {
    inputValue: ""
  };

  onInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (!localStorage.getItem("titles")) {
      localStorage.setItem("titles", [this.state.inputValue]);
    } else {
      let profile = localStorage.getItem("titles").split(",");
      profile.push(this.state.inputValue);
      localStorage.setItem("titles", profile);
    }
    this.setState({ inputValue: "" });
    this.props.updateLocalFilterData();
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          placeholder="save your manga titles"
          onChange={this.onInputChange}
          value={this.state.inputValue}
        />
        <button>add</button>
      </form>
    );
  }
}

export default Form;
