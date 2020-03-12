// HTML elements that the user can choose from
interface htmlElementInt {
  width: number;
  height: number;
  attributes: Array<string>;
}

interface htmlElementsInt {
  [key: string]: htmlElementInt;
}

interface htmlElemPositionInt {
  width: number;
  height: number;
}

// HTML elements need to have specific, useful attributes

const HTMLelements: htmlElementsInt = {
  Image: {
    width: 100,
    height: 100,
    attributes: ["className", "id", "src"]
  },
  Button: {
    width: 75,
    height: 28,
    attributes: ["className", "id", "type", "value"]
  },
  Form: {
    width: 150,
    height: 150,
    attributes: ["className", "id"]
  },
  Paragraph: {
    width: 250,
    height: 75,
    attributes: ["className", "id"]
  },
  List: {
    width: 75,
    height: 75,
    attributes: ["className", "id", "value"]
  },
  Link: {
    width: 50,
    height: 50,
    attributes: ["className", "id", "href"]
  }
};

function getSize(htmlElement: string): htmlElemPositionInt {
  const localHTMLelements = HTMLelements;

  if (!(htmlElement in localHTMLelements)) {
    window.alert(
      `htmlElement error: "${htmlElement} is not found in our database"`
    );
    return;
  }

  return {
    width: HTMLelements[htmlElement].width || 300,
    height: HTMLelements[htmlElement].height || 300
  };
}

export { HTMLelements, getSize };
