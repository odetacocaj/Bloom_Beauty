import Banner from "../../components/Banner/Banner";
import bannerImage from "../../assets/images/banner.svg";
// import ProductSlider from "../../components/ProductSlider/ProductSlider";
import { useGetLatestProducts } from "../../api/hooks/useProduct.js";
function Home() {
  const { data: productss } = useGetLatestProducts(12);
  console.log("🚀 ~ Home ~ productss:", productss);

  return (
    <>
      <Banner
        title="Discover your inner beauty with Blossom Glow Kit"
        subtitle="Great gift for yourself and loved ones"
        backgroundImage={bannerImage}
      />
      {/* <ProductSlider products={productss} title={"New Arrivals"} link={"/"} /> */}
    </>
  );
}

export default Home;
