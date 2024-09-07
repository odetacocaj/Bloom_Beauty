import Banner from "../../components/Banner/Banner";
import bannerImage from "../../assets/images/banner.svg";
import ProductSlider from "../../components/ProductSlider/ProductSlider";
function Home() {
  const products = [
    {
      name: "Product 1",
      price: "$100",
      image: "/path-to-image-1",
      rating: 4.5,
      reviews: 120,
      description: "A high-quality product with excellent performance.",
    },
    {
      name: "Product 2",
      price: "$200",
      image: "/path-to-image-2",
      rating: 4.0,
      reviews: 90,
      description: "A stylish and durable item that exceeds expectations.",
    },
    {
      name: "Product 3",
      price: "$300",
      image: "/path-to-image-3",
      rating: 3.5,
      reviews: 60,
      description: "Affordable and reliable, perfect for everyday use.",
    },
    {
      name: "Product 4",
      price: "$400",
      image: "/path-to-image-4",
      rating: 5.0,
      reviews: 200,
      description: "Top-of-the-line product with outstanding features.",
    },
    {
      name: "Product 5",
      price: "$500",
      image: "/path-to-image-5",
      rating: 4.7,
      reviews: 150,
      description: "A premium choice with exceptional quality and design.",
    },
    {
      name: "Product 6",
      price: "$600",
      image: "/path-to-image-6",
      rating: 4.2,
      reviews: 85,
      description: "A versatile product that combines elegance and function.",
    },
    {
      name: "Product 7",
      price: "$700",
      image: "/path-to-image-7",
      rating: 3.8,
      reviews: 55,
      description: "An affordable option with dependable features.",
    },
    {
      name: "Product 8",
      price: "$800",
      image: "/path-to-image-8",
      rating: 4.6,
      reviews: 130,
      description: "Sleek, modern design with high-performance capabilities.",
    },
    {
      name: "Product 9",
      price: "$900",
      image: "/path-to-image-9",
      rating: 4.9,
      reviews: 180,
      description: "Luxury item offering top-tier functionality and style.",
    },
    {
      name: "Product 10",
      price: "$1000",
      image: "/path-to-image-10",
      rating: 4.3,
      reviews: 95,
      description: "A reliable, high-performing product for the discerning user.",
    },
    {
      name: "Product 11",
      price: "$1100",
      image: "/path-to-image-11",
      rating: 4.1,
      reviews: 70,
      description: "An excellent choice with a great balance of features.",
    },
    {
      name: "Product 12",
      price: "$1200",
      image: "/path-to-image-12",
      rating: 4.8,
      reviews: 165,
      description: "A high-end product with outstanding customer satisfaction.",
    },
  ];


  return (
    <>
      <Banner
        title="Discover your inner beauty with Blossom Glow Kit"
        subtitle="Great gift for yourself and loved ones"
        backgroundImage={bannerImage}
      />
      <ProductSlider products={products} />
    </>
  );
}

export default Home;
