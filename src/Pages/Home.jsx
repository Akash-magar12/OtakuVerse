import Characters from "../Components/Characters";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import TopAnime from "../Components/TopAnimie";

const Home = () => {
  return (
    <div className="w-full min-h-screen  ">
      <Hero />
      <TopAnime />
      <Characters />
      <Footer />
    </div>
  );
};

export default Home;
