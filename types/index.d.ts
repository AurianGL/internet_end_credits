
interface CloudinaryContextProps {
  cloudName: string;
}

interface ImageProps extends JSX.IntrinsicElements.img {
  publicId: string;
  crop?: string;
  width?: string
}

interface VideoProps extends JSX.IntrinsicElements.video {
  publicId: string;
}

interface TransformationProps {
  quality: string;
}



declare module 'cloudinary-react' {
  class CloudinaryComponent {
      constructor(props, context) {}

      getChildContext() {}

      render() {}

      getChildTransformations(children) {}

      getTransformations() {}

      normalizeOptions(...options) {}

      getURL(extendedProps) {}

      typesFrom(configParams) {}
  }

  export const CloudinaryContext: React.FC<CloudinaryContextProps>;

  export const Image: React.FC<React.PropsWithChildren<ImageProps>>;

  export const Video: React.FC<React.PropsWithChildren<VideoProps>>;

  export const Transformation: React.FC<TransformationProps>;
}