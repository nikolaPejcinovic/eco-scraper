import PropTypes from "prop-types";

// Components
import { Box } from "@mui/material";
import { Loading } from "components";
import { PanelClose } from "./components/PanelClose";
import { PanelHeading } from "./components/PanelHeading";
import { PanelImage } from "./components/PanelImage";
import { PanelDate } from "./components/PanelDate";
import { PanelText } from "./components/PanelText";
import { Navigate } from "react-router-dom";

// Service
import { useGetArticle } from "service/articles";

// Constants
import { ARTICLE_ERROR_MESSAGE, ERROR } from "constants/index";

export function ArticlePanel({ articleId }) {
  const { data, isLoading, error } = useGetArticle(articleId);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Navigate to={`/${ERROR}`} state={{ message: ARTICLE_ERROR_MESSAGE }} />
    );
  }

  const { headline, deck, imgUrl, date, textParagraphs } = data;

  return (
    <Box p={2}>
      <PanelClose />
      <Box height="calc(100vh - 88px)" sx={{ overflowY: "auto" }}>
        <PanelHeading headline={headline} deck={deck} />
        <PanelImage imgUrl={imgUrl} />
        <PanelDate date={date} />
        <PanelText textParagraphs={textParagraphs} />
      </Box>
    </Box>
  );
}

ArticlePanel.propTypes = {
  articleId: PropTypes.string.isRequired,
};

ArticlePanel.defaultProps = {
  articleId: "",
};
