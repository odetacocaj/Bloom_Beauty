import Banner from "../../components/Banner/Banner";
import bannerImage from "../../assets/images/banner.svg";
import ExploreSection from "../../components/ExploreSection/ExploreSection.jsx";
import { exploreSectionProducts } from "../../assets/dummy_data/ExploreSectionProducts.js";
import SkinQuizSection from "../../components/SkinQuizSection/SkinQuizSection.jsx";
import SocialMediaSection from "../../components/SocialMediaSection/SocialMediaSection.jsx";
import ProductSlider from "../../components/ProductSlider/ProductSlider.jsx";
import { useGetAllProducts } from "../../api/hooks/useProduct.js";
function Home() {
  const { data: bestsellers = [] } = useGetAllProducts({
    bestsellers: true,
  });
  const { data: products = [] } = useGetAllProducts();
  console.log("🚀 ~ Home ~ products:", products);
  return (
    <>
      <Banner
        title="Discover your inner beauty with Blossom Glow Kit"
        subtitle="Great gift for yourself and loved ones"
        backgroundImage={bannerImage}
      />
      <div>
        <ProductSlider products={products.products} title={"New Arrivals"} link={"/products"} />
        <ProductSlider
          products={bestsellers.products}
          title={"Bestsellers"}
          link={"/bestsellers"}
        />
      </div>
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
      <div className="pb-[10%] pt-[15%]">
        <SkinQuizSection />
      </div>
      <div className="">
        <SocialMediaSection />
      </div>
    </>
  );
}

export default Home;
