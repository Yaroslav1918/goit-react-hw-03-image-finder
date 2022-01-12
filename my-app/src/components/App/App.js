import { Component } from "react";
import ImageGallery from "../ImageGallery";
import serviceAPI from "../../Api/serviceAPI/serviceAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button";
import Modal from "../Modal";
import { ModalImg } from "../Modal/Modal.styled";
import Loader from "../Loader";
import Searchbar from "../Searchbar";
import GlobalStyle from "../../Style/globalStyles";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class App extends Component {
  state = {
    gallery: [],
    error: null,
    status: Status.IDLE,
    urlImg: "",
    page: 1,
    showModal: false,
    seacrhQuery: "",
  };

  handleFormSubmit = (query) => {
    this.setState({ seacrhQuery: query, page: 1, gallery: [] });
  };

  componentDidUpdate(_, prevState) {
    const { seacrhQuery, page } = this.state;
    if (prevState.seacrhQuery !== seacrhQuery || prevState.page !== page) {
      this.setState({ status: Status.PENDING });
      this.fetchGallary();
    }
  }
  fetchGallary = () => {
    const { page, seacrhQuery } = this.state;

    serviceAPI
      .fetchImg(seacrhQuery, page)
      .then(({ hits }) => {
        this.setState((prevState) => ({
          gallery: [...prevState.gallery, ...hits],
          page,
          status: Status.RESOLVED,
        }));
        if (page !== 1) this.scrollPage();
      })

      .catch((error) => this.setState({ error, status: Status.REJECTED }));
  };

  onClickImageURL = (urlImg) => {
    this.setState({ urlImg });
    this.toggleModal();
  };
  scrollPage = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  onLoadMore = () => {
    this.setState({ status: Status.PENDING });
    this.setState({ page: this.state.page + 1 });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { gallery, status, showModal, urlImg, eror } = this.state;

    return (
      <>
        <GlobalStyle />
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === "idle" && null}

        {status === "pending" && <Loader />}

        {status === "rejected" && <div>{eror}</div>}

        {status === "resolved" && (
          <>
            <ToastContainer />

            <ImageGallery hits={gallery} onClick={this.onClickImageURL} />
            {gallery.length > 0 ? (
              <Button onLoadMore={this.onLoadMore} />
            ) : null}
            {showModal && (
              <Modal onClose={this.toggleModal}>
                <ModalImg src={urlImg} />
              </Modal>
            )}
          </>
        )}
      </>
    );
  }
}
