import React, { Component } from "react";
import GlobalStyle from "../../Style/globalStyles";
import Button from "../Button/Button";
import ImageGallery from "../ImageGallery";
import ImageGalleryItem from "../ImageGalleryItem";
import Modal from "../Modal";
import SearchBar from "../Searchbar";
import serviceAPI from "../serviceAPI";
import ImageGalleryInfo from "../ImageGalleryInfo";

class App extends Component {
  state = {
    seacrhQuery: "",
  };
  handleFormSubmit = (query) => {
    this.setState({ seacrhQuery: query });
  };

  render() {
    return (
      <>
        <GlobalStyle />
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGalleryInfo valueName={this.state.seacrhQuery} />
      </>
    );
  }
}

export default App;
