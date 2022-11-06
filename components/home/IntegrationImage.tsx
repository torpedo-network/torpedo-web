import Image, { ImageProps } from "next/image";

const IntegrationImage = ({ alt, src }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      className="grayscale hover:grayscale-0 transition-all duration-200"
    />
  );
};

export default IntegrationImage;
