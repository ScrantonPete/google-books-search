import React, { Component } from "react";
import API from "../utils/API";

class SingleSearch extends Component {
  state = {
    bookData: {}
  };

  componentDidMount() {
    const Id = this.props.match.params.Id;

    API.getBooksById(Id)
      .then(res => this.setState({ bookData: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        {Object.keys(this.state.boodData).length
          ? JSON.stringify(this.state.bookData, null, 2)
          : ""}
      </React.Fragment>
    );
  }
}
export default SingleSearch;
