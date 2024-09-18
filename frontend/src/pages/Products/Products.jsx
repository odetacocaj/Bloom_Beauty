import Filters from "../../components/Filters/Filters";
import ProductCatalog from "../../components/ProductCatalog/ProductCatalog";
function Products() {
  return (
    <div className="pl-[7%] pr-[7%] pt-[3%] flex flex-row gap-5">
      <div className="hidden sm:flex">
        <Filters />
      </div>
      <ProductCatalog />
    </div>
  );
}

export default Products;
