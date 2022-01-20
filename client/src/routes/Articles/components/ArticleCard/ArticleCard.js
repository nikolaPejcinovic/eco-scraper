import PropTypes from "prop-types";

// Components
import { Paper } from "components";
import { CardContent } from "./components/CardContent";
import { CardImage } from "./components/CardImage";
import { CardFooter } from "./components/CardFooter";

// Constants
import { CARD_HEADLINE_DEFAULT } from "constants/index";

export function ArticleCard({ headline, deck, imgUrl, date, link, onClick }) {
  return (
    <Paper onClick={onClick}>
      <CardContent headline={headline} deck={deck} link={link} />
      <CardImage imgUrl={imgUrl} />
      <CardFooter date={date} />
    </Paper>
  );
}

ArticleCard.propTypes = {
  headline: PropTypes.string.isRequired,
  deck: PropTypes.string,
  imgUrl: PropTypes.string,
  date: PropTypes.string,
  link: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

ArticleCard.defaultTypes = {
  headline: CARD_HEADLINE_DEFAULT,
  link: "",
  onClick: () => {},
};
