import shoeImage from "../assets/shoes.jpg"; // Path to the shoe image

const Page = () => {
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="relative bg-white-200 min-h-screen flex flex-col justify-center">
      {/* Text content */}
      <div className="text-8xl mt-32 mx-12">Find your</div>
      <div className="text-8xl mx-12 mt-4">Sole Mate</div>
      <div className="text-8xl mx-12 mt-4">With US</div>

      {/* Shoe Image with Rotation Effect */}
      <div className="absolute top-[-50px] right-12 group hover:cursor-pointer">
        <img
          src={shoeImage}
          alt="Shoe"
          className="w-[500px] h-[500px] object-contain transform transition-transform duration-500 ease-in-out group-hover:rotate-[30deg]"
        />
      </div>

      {/* Shop Now button */}
      <button
        className="mt-12 mx-16 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 relative z-10"
        onClick={handleClick}
      >
        Shop Now
      </button>
    </div>
  );
};

export default Page;
