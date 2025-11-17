
type NoDataProps = {
  imageSrc: string;
  heading: string;
  text: string;
  className?: string;
};

const NoData = ({ imageSrc, heading, text, className }: NoDataProps) => {
  return (
    <div className={className}>
      <div className="flex justify-center">
        <img src={imageSrc} alt="My Image" width={500} height={200} />
      </div>
      <h1 className="flex justify-center text-red-700 text-2xl mt-2">{heading}</h1>
      <p className="flex justify-center">{text}</p>
    </div>
  );
};

export default NoData;
