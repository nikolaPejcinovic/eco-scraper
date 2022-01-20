import { useState } from "react";
import PropTypes from "prop-types";

// Utils
import styled from "@emotion/styled";

// Components
import { Box, Skeleton } from "@mui/material";

const Img = styled.img`
  display: ${({ loaded }) => (loaded ? "block" : "none")};
  width: 100%;
  border-radius: 8px;
`;

export function Image({ imgProps, boxProps }) {
  const [loaded, setLoaded] = useState(false);

  function handleLoad() {
    setLoaded(true);
  }

  return (
    <Box mt={1} {...boxProps}>
      <Img {...imgProps} onLoad={handleLoad} loaded={loaded} />
      {!loaded && (
        <Skeleton
          variant="rectangular"
          sx={{ borderRadius: 2 }}
          width="100%"
          height={200}
        />
      )}
    </Box>
  );
}

Image.propTypes = {
  imgProps: PropTypes.object,
  boxProps: PropTypes.object,
};
