import roseLeft from "../../assets/images/roseLeft.svg";
import roseRight from "../../assets/images/roseRight.svg";
import CustomAccordion from "../CustomAccordion/CustomAccordion";
function Faqs() {
  return (
    <div className="pt-[3%] pb-[3%] pl-[7%] pr-[7%] flex flex-col gap-5">
      <div className="flex flex-row items-center gap-2 justify-center pl-5 pr-5 sm:pl-0 sm:pr-0">
        <img src={roseLeft} alt="roseLeft" />
        <h1 className="font-bold uppercase text-2xl text-center md:text-left">
          Frequently Asked Questions
        </h1>
        <img src={roseRight} alt="roseRight" />
      </div>
      <div className="flex flex-col gap-10 bg-white">
        <div className="flex flex-col gap-5 p-10">
          <CustomAccordion
            items={[
              {
                question: "How can I reset my password?",
                answer:
                  "To reset your password, go to the login page and click on the ‘Forgot Password’ link. Follow the instructions sent to your email to create a new password.",
              },
              {
                question: "Where can I find the user manual?",
                answer:
                  "The user manual can usually be found on the product’s support page or in the ‘Downloads’ section of the website. You may also receive a copy with your purchase.",
              },
              {
                question: "What are your shipping options?",
                answer:
                  "We offer standard, expedited, and overnight shipping options. Shipping costs and delivery times vary depending on the chosen method and your location.",
              },
              {
                question: "Can I track my order?",
                answer:
                  "Yes, once your order has shipped, you will receive a tracking number via email. You can use this number to track your package through the shipping carrier’s website.",
              },
              {
                question: "How do I contact customer support?",
                answer:
                  "You can contact customer support via email, phone, or live chat. Our contact information is available on the ‘Contact Us’ page of our website.",
              },
              {
                question: "Do you offer international shipping?",
                answer:
                  "Yes, we offer international shipping to most countries. Shipping rates and delivery times vary based on the destination.",
              },
              {
                question: "What is your return policy?",
                answer:
                  "Our return policy allows you to return items within 30 days of receipt. To be eligible for a return, the item must be unused and in the same condition that you received it. Please contact our customer service to initiate the return process.",
              },
              {
                question: "How long does shipping take?",
                answer:
                  "Shipping typically takes 4-12 business days depending on your location and the shipping method chosen at checkout. You will receive a tracking number once your order has been shipped.",
              },
              {
                question: "What is your refund process?",
                answer:
                  "Once we receive your returned item, it will be inspected to ensure it meets our return policy criteria. If approved, your refund will be processed within 7-10 business days. The refund will be issued to the original payment method used for the purchase.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Faqs;
