
import { useEffect, useRef, useState } from "react";
import {
  Grid
} from "@mui/material";
import ImageListItem from "@mui/material/ImageListItem";
import ListSubheader from "@mui/material/ListSubheader";
import Head from "next/head";
import ImageListComp, { ImageProps, TagProps } from "@/components/ImageListComp";

const initialValues = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
    hashtag: [
      { tag_id: 1, tag: "อาหาร" },
      { tag_id: 2, tag: "กาแฟ" },
      { tag_id: 13, tag: "โต๊ะ" },
    ],
    rows: 2,
    cols: 2,
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
    hashtag: [
      { tag_id: 1, tag: "อาหาร" },
      { tag_id: 13, tag: "โต๊ะ" },
    ],
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
    hashtag: [
      { tag_id: 3, tag: "กล้อง" },
      { tag_id: 13, tag: "โต๊ะ" },
    ],
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
    hashtag: [
      { tag_id: 2, tag: "กาแฟ" },
      { tag_id: 13, tag: "โต๊ะ" },
      { tag_id: 18, tag: "macbook" },
    ],
    cols: 2,
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
    hashtag: [{ tag_id: 4, tag: "หมวก" }],
    cols: 2,
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
    hashtag: [
      { tag_id: 5, tag: "นํ้าผึ้ง" },
      { tag_id: 6, tag: "ของหวาน" },
      { tag_id: 1, tag: "อาหาร" },
    ],
    rows: 2,
    cols: 2,
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
    hashtag: [
      { tag_id: 7, tag: "กีฬา" },
      { tag_id: 9, tag: "บาส" },
    ],
  },
  {
    id: 8,
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    hashtag: [
      { tag_id: 10, tag: "เฟิร์น" },
      { tag_id: 15, tag: "พืช" },
    ],
  },
  {
    id: 9,
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    hashtag: [{ tag_id: 15, tag: "พืช" }],
    rows: 2,
    cols: 2,
  },
  {
    id: 10,
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
    hashtag: [
      { tag_id: 14, tag: "มะเขือเทศ" },
      { tag_id: 15, tag: "พืช" },
    ],
  },
  {
    id: 11,
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
    hashtag: [{ tag_id: 16, tag: "ดาวทะเล" }],
  },
  {
    id: 12,
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
    cols: 2,
    hashtag: [{ tag_id: 17, tag: "จักรยาน" }],
  },
];

export default function Home() {
  const [data, setData] = useState<Array<ImageProps>>(initialValues);
  const [selected, setSelected] = useState<TagProps>({ tag_id: 0, tag: "" });
  const imageListRef = useRef(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  const loadMore = async () => {
    if (loadingMore) return;
    setLoadingMore(true);
    // Simulate loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Face Data
    const newImages = initialValues.map((d: ImageProps, idx: number) => {
      return {
        ...d,
        id: initialValues.length + idx,
      };
    });
    setData((prevImages) => [...prevImages, ...newImages]);
    setLoadingMore(false);
  };

  const handleScroll = () => {
    if (imageListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = imageListRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 20;

      if (isAtBottom && !loadingMore) {
        loadMore();
      }
    }
  };

  useEffect(() => {
    const imageListContainer =
      imageListRef.current as unknown as HTMLDivElement;
    if (imageListContainer) {
      imageListContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (imageListContainer) {
        imageListContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (selected?.tag_id != 0) {
          setLoading(true);
          // Find HashTags
          const newArr = initialValues?.filter((d: ImageProps) => {
            return d?.hashtag?.some((tag) => tag?.tag_id == selected?.tag_id);
          });
          setData(newArr);
          await new Promise((resolve) => setTimeout(resolve, 100));
          setLoading(false);
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, [selected]);

  useEffect(() => {
  }, [data]);

  return (
    <>
      <Head>
        <title>Gallery</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Grid container spacing={3}>
        <Grid size="grow" />
        <Grid size={8} mt={"50px"}>
          <ImageListItem key="Subheader" cols={2}>
            <ListSubheader component="div">{`Gallery ${selected?.tag || ""}`}</ListSubheader>
          </ImageListItem>

          {loading ? (
            <></>
          ) : (
            <ImageListComp
              data={data}
              onClick={(tag: TagProps) => {
                setSelected(tag);
              }}
              loadingMore={loadingMore}
              imageListRef={imageListRef}
            />
          )}

        </Grid>
        <Grid size="grow" />
      </Grid>
    </>
  );
}
