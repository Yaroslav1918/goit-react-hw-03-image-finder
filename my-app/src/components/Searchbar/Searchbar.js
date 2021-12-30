import React from "react";
import PropTypes from "prop-types";
import {
  SearchbarHeader,
  SearchbarForm,
  SearchbarButton,
  Searchbarlabel,
  SearchbarInput,
} from "../Searchbar/Searchbar.styled";

const Searchbar = () => (
  <SearchbarHeader>
    <SearchbarForm>
      <SearchbarButton type="submit">
        <Searchbarlabel>Search</Searchbarlabel>
      </SearchbarButton>

      <SearchbarInput
        type="text"
        autocomplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </SearchbarForm>
  </SearchbarHeader>
);
Searchbar.propTypes = {};
export default Searchbar;
