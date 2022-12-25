// const floyd = (pixels, w) => {
//   const m = [[1, 7], [w - 1, 3], [w + 1, 5], [w + 1, 1]]
//   pixels.map((pixel, index) => {
//     const col = pixel > .5
//     const err = (pixel - col) / 16
//     m.forEach(([x, y]) => {
//       index + x < pixels.length && { pixels[i + x]+= err * y }
//     })
//     col
//   });
//   return pixels
// }

// const floyd2 = (pixels,w) => {
//   const e = Array(w+1).fill(0), m = [[1, 7], [w - 2, 3], [w + 1, 5], [w, 1]]
//   return pixels.map(x => {
//     const pix=x+(e.push(0), e.shift()), col=pix>.5, err=(pix-col)/16
//     m.forEach(([x,y])=> e[x]+=err*y)
//     return col
//   })
// }

var lumR: number[] = Array.from({length: 256});
var lumG: number[] = Array.from({length: 256});
var lumB: number[] = Array.from({length: 256});
for (var i = 0; i < 256; i++) {
  lumR[i] = i * 0.299;
  lumG[i] = i * 0.587;
  lumB[i] = i * 0.114;
}

export const atkinson = (imageData: ImageData) => {
  const imageDataLength = imageData.data.length

  for (i = 0; i <= imageDataLength; i += 4) {
    imageData.data[i] = Math.floor(lumR[imageData.data[i]] + lumG[imageData.data[i + 1]] + lumB[imageData.data[i + 2]])

  }
  const width = imageData.width

  for (var currentPixel = 0; currentPixel <= imageDataLength; currentPixel += 4) {
    const newPixel = imageData.data[currentPixel] < 129 ? 0 : 255
    const err = Math.floor((imageData.data[currentPixel] - newPixel) / 8)
    imageData.data[currentPixel] = newPixel
    imageData.data[currentPixel + 4] += err
    imageData.data[currentPixel + 8] += err
    imageData.data[currentPixel + 4 * width - 4] += err;
    imageData.data[currentPixel + 4 * width] += err;
    imageData.data[currentPixel + 4 * width + 4] += err;
    imageData.data[currentPixel + 8 * width] += err;
    imageData.data[currentPixel + 1] = imageData.data[currentPixel + 2] = imageData.data[currentPixel];
  }
  return imageData
}