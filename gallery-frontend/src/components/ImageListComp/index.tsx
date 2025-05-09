import {
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FC, RefObject } from "react";

export interface TagProps {
  tag_id: number;
  tag: string;
}

export interface ImageProps {
  id: number;
  img: string;
  title?: string;
  hashtag?: Array<TagProps>;
  rows?: number;
  cols?: number;
}

interface Props {
  data: Array<ImageProps>;
  onClick: (tag: TagProps) => void;
  loadingMore: boolean;
  imageListRef: RefObject<null>;
}

function srcset(image: string, size: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

const ImageListComp: FC<Props> = ({
  data,
  onClick,
  loadingMore,
  imageListRef,
}: Props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <ImageList
        sx={{ overflowY: "auto", maxHeight: 560 }}
        variant="quilted"
        cols={isMobile ? 2 : isTablet ? 3 : 4}
        gap={8}
        rowHeight={160}
        ref={imageListRef}
      >
        {data?.map((item: ImageProps) => (
          <ImageListItem
            key={`item-${item?.id}`}
            cols={item?.cols || 1}
            rows={item?.rows || 1}
          >
            <img
              {...srcset(item?.img, 160, item?.rows, item?.cols)}
              alt={item?.title}
              loading="lazy"
            />
            <ImageListItemBar
              key={`item-bar${item?.id}`}
              subtitle={
                <>
                  {item?.hashtag?.map((tag: TagProps) => (
                    <Typography
                      key={`tag-${tag?.tag_id}`}
                      component={"p"}
                      onClick={() => {
                        console.log("click!!", tag);
                        onClick(tag);
                      }}
                      sx={{
                        display: "inline-grid",
                        padding: "2px",
                        cursor: "pointer",
                      }}
                    >{`#${tag?.tag}`}</Typography>
                  ))}
                </>
              }
              actionIcon={
                <IconButton
                  sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                  aria-label={`info about ${item?.title}`}
                ></IconButton>
              }
            />
          </ImageListItem>
        ))}
        {loadingMore && <Typography>กำลังโหลด...</Typography>}
      </ImageList>
    </>
  );
};

export default ImageListComp;
