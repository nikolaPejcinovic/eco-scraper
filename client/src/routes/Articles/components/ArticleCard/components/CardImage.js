import PropTypes from "prop-types";

// Components
import { Image } from "components";

export function CardImage({ imgUrl }) {
  if (imgUrl) {
    return <Image imgProps={{ src: imgUrl }} />;
  }

  return null;
}

CardImage.propTypes = {
  imgUrl: PropTypes.string,
};
