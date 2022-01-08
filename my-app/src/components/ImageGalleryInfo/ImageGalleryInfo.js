import { Component } from "react";
import ImageGallery from "../ImageGallery";
import PropTypes from "prop-types";
import serviceAPI from "../serviceAPI";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../Button";
import Modal from "../Modal";
import { ModalImg } from "../Modal/Modal.styled";
import Loader from "../Loader";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageGalleryInfo extends Component {
  state = {
    gallery: [],
    error: null,
    status: Status.IDLE,
    urlImg: "",
    page: 1,
    showModal: false,
  };

  componentDidUpdate(prevProps) {
    const prevName = prevProps.valueName;
    const currentName = this.props.valueName;
    if (prevName !== currentName) {
      this.setState({ status: Status.PENDING, page: 1, gallery: [] });
      this.fetchGallary();
    }
  }

  fetchGallary = () => {
    const currentName = this.props.valueName;
    const { page } = this.state;

    serviceAPI
      .fetchImg(currentName, page)
      .then(({ hits }) => {
        this.setState((prevState) => ({
          gallery: [...prevState.gallery, ...hits],
          page: prevState.page + 1,
          status: Status.RESOLVED,
        }));
      })
      .catch((error) => this.setState({ error, status: Status.REJECTED }));
  };

  onClickImageURL = (urlImg) => {
    this.setState({ urlImg });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { gallery, status, showModal, urlImg } = this.state;

    if (status === "idle") {
      return null;
    }

    if (status === "pending") {
      return <Loader />;
    }

    if (status === "rejected") {
      const { error } = this.state;
      return <div>{error}</div>;
    }

    if (status === "resolved") {
      return (
        <>
          <ToastContainer />

          <ImageGallery hits={gallery} onClick={this.onClickImageURL} />
          {gallery.length > 0 ? (
            <Button onLoadMore={this.fetchGallary} />
          ) : null}
          {showModal && (
            <Modal onClose={this.toggleModal}>
              <ModalImg src={urlImg} />
            </Modal>
          )}
        </>
      );
    }
  }
}
ImageGalleryInfo.propTypes = {
  valueName: PropTypes.string.isRequired,
};
