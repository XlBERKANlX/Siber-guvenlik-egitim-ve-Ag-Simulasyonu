import FlashCard from "./FlashCard";

const CardContainer = () => {
  return (
    <div className="flex justify-around mt-24 max-md:flex-col max-md:gap-5 max-md:items-center">
      <FlashCard text="Bilgi Verilen kelime" position="left" />
      <FlashCard text="Kelime Bilgisi/Bilgileri" position="right" />
    </div>
  );
};

export default CardContainer;
