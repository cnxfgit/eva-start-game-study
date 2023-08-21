import {GameObject} from "@eva/eva.js";
import {Text} from "@eva/plugin-renderer-text";

const Footer = () => {
  const footer = new GameObject('footer', {
    position: {
      x: 0,
      y: -16,
    },
    origin: {
      x: 0.5,
      y: 1,
    },
    anchor: {
      x: 0.5,
      y: 1,
    }
  })
  footer.addComponent(new Text({
    text: 'Cramped Room Of Death Demo',
    style: {
      fontFamily: 'Arial',
      fontSize: 12,
      fill: ['#ccc'],
      fontWeight: 'bold'
    }
  }))

  return footer;
}

export default Footer;