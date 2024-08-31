interface SVGInitialsProps {
  words: string;
  backgroundColor: string;
  textColor: string;
}

const SVGInitials: React.FC<SVGInitialsProps> = ({
  words,
  backgroundColor,
  textColor,
}) => {
  return (
    <>
      <svg
        width="56"
        height="56"
        xmlns="http://www.w3.org/2000/svg"
        className={backgroundColor + " rounded-full"}
      >
        <rect width="100%" height="100%" />
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="18"
          fontWeight={"bold"}
          className={textColor}
        >
          {words}
        </text>
      </svg>
    </>
  );
};

export default SVGInitials;
