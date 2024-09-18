import SkinTestImage from "../../assets/images/skinTestImage.svg";
import CustomButton from "../../components/CustomButton/CustomButton";
function SkinQuizSection() {
  return (
    <div className="bg-[#fee2e3] bg-opacity-30  w-full sm:h-[226px] flex sm:flex-row flex-col justify-center gap-10 sm:gap-28 items-center pb-10 pt-10">
      <div className="sm:w-[50%] flex justify-end">
        <img src={SkinTestImage} className="sm:h-[331px] mt-[-70px]" />
      </div>
      <div className="flex flex-col items-center sm:items-start gap-3 sm:w-[50%]">
        <h1 className="text-[#383838] font-bold text-4xl">The Skin Quiz</h1>
        <p className="font-medium text-lg text-slate text-center sm:text-left sm:max-w-[70%]">
          Meet the quiz that will curate a routine just as unique as you are.
        </p>
        <CustomButton className="explore-shop-button w-[40%]">Explore More</CustomButton>
      </div>
    </div>
  );
}

export default SkinQuizSection;
