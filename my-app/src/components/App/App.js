import React, { Component } from "react";
import GlobalStyle from "../../Style/globalStyles";
import SearchBar from "../Searchbar";
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
