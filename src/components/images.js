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

const paintingsIds = [
  {id:'plage_aurian_guerard_xbtibc', name:'plage'},
  {id:'shadow_aurian_guerard_kniik7', name:'shadow'},
  {id:'Dusseldoref_aurian_guerard_eqtmk9', name:'shadow'},
  {id:'forgetthings_aurian_guerard_uhaauk', name:'things'},
  {id:'baigeuse_aurian_guerard_gutphz', name:'baigneuses'},
  {id:'17112016-IMG_0920_ufdolp', name:'study'},
  {id:'17112016-IMG_0917_o2pgx7', name:'study'},
  {id:'baptisme_aurian_guerard_kfshcy', name:'baptism'},
  {id:'whitesnow_aurian_guerard_z5wmk9', name:'white snow'},
  {id:'sleepingbeauty_aurian_guerard_vqzvwh', name:'sleeping beauty'},
  {id:'Western_Digital_aurian_guerard_des_lauriers_nhoxnz', name:'WD'},
  {id:'Ordinateur_aurian_guerard_des_lauriers_kklcgp', name:'Ordinateur'},
  {id:'Medium_aurian_guerard_des_lauriers_amhzr8', name:'medium'},
  {id:'ligature_aurian_guerard_des_lauriers_vdgujj', name:'ligature'},
  {id:'batterie_aurian_guerard_des_lauriers_y1a9mu', name:'battery'},
  {id:'Antishockmemory_aurian_guerard_zgloe7', name:'anti-shock'},
  {id:'écouteur_aurian_guerard_des_lauriers_slm7ty', name:'earphones'}, 
]

export default paintingsIds