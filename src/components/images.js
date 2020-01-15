// const images = [
//   { id: 1, src: './assets/image01.jpg', title: 'foo', description: 'bar' },
//   { id: 2, src: './assets/image02.jpg', title: 'foo', description: 'bar' },
//   { id: 3, src: './assets/image03.jpg', title: 'foo', description: 'bar' },
//   { id: 4, src: './assets/image04.jpg', title: 'foo', description: 'bar' },
//   { id: 5, src: './assets/image05.jpg', title: 'foo', description: 'bar' },
//   ...etc
// ];

// function imageLoader() {
//   return images;
// }

// export default imageLoader;

// // MyComponent.js
// import imageLoader from './images';

// // ...snip

// this.state = {
//   images: []
// }

// // ...snip

// componentDidMount() {
//   const images = imageLoader()
//   this.setState({images})
// }

// // render images from state

// // images.js
// async function imageLoader() {
//   const request = await fetch('https://my/images/on/a/cdn');
//   const response = await request.json();
//   return response.images
// }