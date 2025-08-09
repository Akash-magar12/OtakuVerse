
const Banner = ({ head, text, url }) => {
  return (
    <div
      className="w-full h-[26rem] relative mb-8"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('${url}')`,
        backgroundSize: "cover",
        backgroundPosition: "center 20%",
      }}
    >
      <div className="absolute bottom-0 left-0 p-8 sm:p-10 lg:p-16">
        <h1 className="text-5xl sm:text-6xl font-bold text-white mb-2">
          {head}
        </h1>
        <p className="text-xl text-gray-300">{text}</p>
      </div>
    </div>
  );
};

export default Banner;
