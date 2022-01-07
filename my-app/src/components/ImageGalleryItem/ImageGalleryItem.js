import {
  GalleryItem,
  GalleryImg,
} from "../ImageGalleryItem/ImageGalleryItem.styled";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick, tags }) => {
  return (
    <GalleryItem>
      <GalleryImg
        src={webformatURL}
        alt={tags}
        onClick={() => onClick(largeImageURL)}
      />
    </GalleryItem>
  );
};
// ImageGalleryItem.propTypes = {

// };
export default ImageGalleryItem;
