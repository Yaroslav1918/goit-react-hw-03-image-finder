import { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FallBackContainer } from "../../Style/FallBackContainer.styled";

import PropTypes from "prop-types";
import {
  SearchbarHeader,
  SearchbarForm,
  SearchbarButton,
  Searchbarlabel,
  SearchbarInput,
} from "../Searchbar/Searchbar.styled";
class Searchbar extends Component {
  state = {
    seacrhQuery: "",
  };

  handleNameChange = (event) => {
    const value = event.currentTarget.value.toLowerCase();
    this.setState({ seacrhQuery: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { seacrhQuery } = this.state;
    if (seacrhQuery.trim() === "") {
      toast.error("please write clearly!");
      return;
    }
    if (seacrhQuery.length > 10) {
      toast.error("Please enter a more specific query!");
      return;
    }
    if (seacrhQuery === event) {
      return;
    }
    this.props.onSubmit(seacrhQuery);
    this.setState({ seacrhQuery: "" });
  };

  render() {
    return (
      <SearchbarHeader>
        <ToastContainer />
        <SearchbarForm onSubmit={this.handleSubmit}>
          <SearchbarButton type="submit">
            <Searchbarlabel>Search</Searchbarlabel>
          </SearchbarButton>

          <SearchbarInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="seacrhQuery"
            value={this.state.seacrhQuery}
            onChange={this.handleNameChange}
          />
        </SearchbarForm>
      </SearchbarHeader>
    );
  }
}
Searchbar.propTypes = {};
export default Searchbar;
