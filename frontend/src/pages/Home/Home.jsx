import Banner from "../../components/Banner/Banner";
import bannerImage from "../../assets/images/banner.svg";
import ExploreSection from "../../components/ExploreSection/ExploreSection.jsx";
import { exploreSectionProducts } from "../../assets/dummy_data/ExploreSectionProducts.js";
import SkinQuizSection from "../../components/SkinQuizSection/SkinQuizSection.jsx";
function Home() {
  return (
    <>
      <Banner
        title="Discover your inner beauty with Blossom Glow Kit"
        subtitle="Great gift for yourself and loved ones"
        backgroundImage={bannerImage}
      />
      <div>
        <ExploreSection
          title={exploreSectionProducts[0].title}
          image={exploreSectionProducts[0].image}
          description={exploreSectionProducts[0].description}
          productLink={exploreSectionProducts[0].link}
          hashtags={exploreSectionProducts[0].hashtags}
        />
        <ExploreSection
          title={exploreSectionProducts[1].title}
          image={exploreSectionProducts[1].image}
          description={exploreSectionProducts[1].description}
          hashtags={exploreSectionProducts[1].hashtags}
          productLink={exploreSectionProducts[1].link}
          direction={"flex-row-reverse"}
        />
      </div>
      <div>
        <SkinQuizSection />
      </div>
    </>
  );
}

export default Home;
