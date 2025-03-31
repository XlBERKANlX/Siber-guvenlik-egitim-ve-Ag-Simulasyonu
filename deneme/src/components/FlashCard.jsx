const FlashCard = ({ text, position }) => {
  const positionClasses = {
    left: "left-[card]",
    right: "right-[card]",
  };

  return (
    <article
      className={`relative top-2/4 px-5 py-0 text-xl font-semibold text-center text-white rounded-3xl shadow-sm -translate-x-2/4 -translate-y-2/4 h-[367px] ${positionClasses[position]} w-[367px] max-md:h-[300px] max-md:w-[300px] max-sm:text-base max-sm:h-[250px] max-sm:w-[250px]`}
    >
      {text}
    </article>
  );
};

export default FlashCard;
