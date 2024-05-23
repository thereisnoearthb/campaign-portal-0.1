import { getContent } from "../services/ContentService";

interface Content {
  heading: string;
  caraousel: string[];
  paragraph: string;
  links: string[];
}

interface Slide {
  image: string;
}

const fetchContent = async () => {
  try {
    const receivedData = await getContent();
    if (receivedData) {
      return receivedData.data;
    } else {
      console.log("Content is null");
    }
  } catch (err) {
    console.log("Error fetching content in SlideData ", err);
    return null;
  }
}

const SlideData: Slide[] = [];

const populateSlideData = async () => {
  const receivedData = await fetchContent();
  if (receivedData) {
    receivedData.forEach((elem: Content) => {
      elem.caraousel.forEach((subElem: string) => {
        SlideData.push({ image: subElem });
        console.log(SlideData);
      });
    });
  } else {
    console.log("Error fetching data");
  }
}

populateSlideData();

export { SlideData };
