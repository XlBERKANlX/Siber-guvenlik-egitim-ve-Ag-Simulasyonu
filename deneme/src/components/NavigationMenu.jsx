const NavigationMenu = () => {
  return (
    <nav className="mt-72">
      <ul>
        <li className="mb-2">
          <button className="w-full text-xl font-semibold text-white bg-blue-700 bg-opacity-30 h-[49px] max-sm:p-0 max-sm:text-xs max-sm:w-[70px]">
            Siber Test
          </button>
        </li>
        <li className="mb-2">
          <button className="w-full text-xl font-semibold text-white bg-blue-700 bg-opacity-30 h-[49px] max-sm:p-0 max-sm:text-xs max-sm:w-[70px]">
            Flashcards
          </button>
        </li>
        <li className="mb-2">
          <button className="w-full text-xl font-semibold text-white bg-blue-700 bg-opacity-30 h-[49px] max-sm:p-0 max-sm:text-xs max-sm:w-[70px]">
            Simülasyon
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
