// Components
import { ArticleCard } from "./components/ArticleCard/ArticleCard";
import { Box } from "@mui/material";
import { ArticlePanel } from "./components/ArticlePanel";
import { Loading } from "components";
import { Navigate } from "react-router-dom";

// Service
import { useGetArticles } from "service/articles";

// Hooks
import { useDrawerActions } from "contexts";

// Hooks
import { useScreens } from "hooks";

// Constants
import { ERROR, SM, ARTICLES_ERROR_MESSAGE } from "constants/index";

function Articles() {
  const smallScreens = useScreens(SM);
  const { setDrawer, setOpen } = useDrawerActions();
  const { data, error, isLoading } = useGetArticles();

  if (isLoading) {
    return (
      <Loading
        boxProps={{
          sx: {
            height: smallScreens ? "calc(100vh - 56px)" : "calc(100vh - 64px)",
          },
        }}
      />
    );
  }

  if (error) {
    return (
      <Navigate
        to={`/${ERROR}`}
        state={{
          message: ARTICLES_ERROR_MESSAGE,
        }}
      />
    );
  }

  function handleClick(articleId) {
    setDrawer({ content: <ArticlePanel articleId={articleId} /> });
    setOpen(true);
  }

  return (
    <Box
      p={2}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1rf", sm: "1fr 1fr" },
        gridGap: "16px",
        maxWidth: "1000px",
        margin: { xs: "56px auto 0 auto", sm: "64px auto 0 auto" },
      }}
    >
      {data.map(({ id, headline, deck, imgUrl, date, link }) => (
        <ArticleCard
          key={id}
          headline={headline}
          deck={deck}
          imgUrl={imgUrl}
          date={date}
          link={link}
          onClick={() => handleClick(id)}
        />
      ))}
    </Box>
  );
}

export default Articles;
