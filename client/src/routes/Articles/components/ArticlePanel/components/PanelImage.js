import PropTypes from "prop-types";

// Components
import { Image } from "components";

export function PanelImage({ imgUrl }) {
  if (imgUrl) {
    return <Image imgProps={{ src: imgUrl }} boxProps={{ mt: 3 }} />;
  }

  return null;
}

PanelImage.propTypes = {
  imgUrl: PropTypes.string,
};
