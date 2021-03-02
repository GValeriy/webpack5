import gomer from '../static/assets/gomer.jpg';

import '../styles/index.scss';

export const addImageToBody = () => {
    const image = document.createElement('img');
    image.src = gomer;

    document.body.appendChild(image);
};
addImageToBody();