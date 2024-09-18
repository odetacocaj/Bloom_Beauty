import Filters from "../../components/Filters/Filters";
import ProductCatalog from "../../components/ProductCatalog/ProductCatalog";
import roseLeft from "../../assets/images/roseLeft.svg";
import roseRight from "../../assets/images/roseRight.svg";
function Bestsellers() {
  return (
    <>
      <div className="flex flex-row items-center gap-2 justify-center w-full sm:pl-[20%] pt-[3%]">
        <img src={roseLeft} />
        <h1 className="font-bold uppercase text-2xl">Our Bestsellers</h1>
        <img src={roseRight} />
      </div>
      <div className="pl-[7%] pr-[7%] pt-[3%] flex flex-row gap-5">
        <div className="hidden sm:flex">
          <Filters />
        </div>
        <ProductCatalog isBestsellers />
      </div>
    </>
  );
}

export default Bestsellers;
