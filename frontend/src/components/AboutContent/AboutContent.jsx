import CustomAccordion from "../CustomAccordion/CustomAccordion";
import "./AboutContent.scss";
const AboutContent = ({ sectionId }) => {
  const content = {
    aboutUs: (
      <>
        <h1 className="about-section-title">About Us</h1>
        <p className="about-section-text">
          Welcome to Bloom Beauty, where elegance meets innovation. At Bloom Beauty, we believe that
          every individual deserves to embrace their natural beauty with products that enhance
          rather than mask. Our mission is to provide high-quality, cruelty-free beauty solutions
          that cater to all skin types and tones, helping you feel confident and radiant. Founded by
          a team of passionate beauty experts, Bloom Beauty is dedicated to creating a range of
          skincare and cosmetic products using the finest ingredients nature has to offer. Our
          formulas are carefully crafted to deliver visible results while being gentle on your skin
          and the environment. Our commitment extends beyond just beauty. We are proud to support
          sustainable practices and ethical sourcing, ensuring that our products are not only good
          for you but also good for the planet. From luxurious serums to vibrant makeup, each Bloom
          Beauty product is designed to bring out the best in you, allowing your natural beauty to
          shine through. Thank you for choosing Bloom Beauty. We invite you to explore our
          collection and discover the perfect products to enhance your beauty routine.
        </p>
      </>
    ),
    refunds: (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="about-section-title">Refunds</h1>
          <CustomAccordion
            items={[
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
        <div className="flex flex-col gap-5">
          <h1 className="about-section-title">Exchanges</h1>
          <CustomAccordion
            items={[
              {
                question: "What is your exchange policy?",
                answer:
                  "We offer exchanges on items that are returned within 30 days of receipt. The item must be in its original condition and packaging. To initiate an exchange, please contact our customer service team with your order details and the item you wish to exchange. We will guide you through the process and provide instructions for returning the original item and receiving the new one.",
              },
              {
                question: "Can I exchange a sale item?",
                answer:
                  "Yes, sale items can be exchanged. However, please note that the exchange is subject to availability. If the item you wish to exchange for is out of stock, we will offer a store credit or refund as an alternative.",
              },
            ]}
          />
        </div>
      </div>
    ),
    shipping: (
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <h1 className="about-section-title">Shipping</h1>
          <CustomAccordion
            items={[
              {
                question: "What shipping options are available?",
                answer:
                  "We offer several shipping options including standard, expedited, and overnight shipping. You can select your preferred shipping method at checkout. Delivery times and costs vary based on the shipping option you choose and your location.",
              },
              {
                question: "How can I track my order?",
                answer:
                  "Once your order has been shipped, you will receive a confirmation email with a tracking number and a link to track your shipment. You can also track your order status directly from your account on our website.",
              },
              {
                question: "Do you offer international shipping?",
                answer:
                  "Yes, we offer international shipping to many countries. Shipping rates and delivery times for international orders vary depending on the destination. Please note that international shipments may be subject to customs duties and taxes, which are the responsibility of the recipient.",
              },
              {
                question: "What should I do if my order is delayed?",
                answer:
                  "If your order is delayed, please check the tracking information for updates. If there are any issues or if your package does not arrive within the expected delivery time, contact our customer service team. We will assist you in resolving the issue and provide updates on the status of your shipment.",
              },
            ]}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h1 className="about-section-title">Returns</h1>
          <CustomAccordion
            items={[
              {
                question: "How do I return an item?",
                answer:
                  "To return an item, please contact our customer service team to request a return authorization. We will provide you with instructions on how to return the item and a return shipping label if applicable. The item must be returned in its original condition and packaging. Please ensure that you follow the provided instructions to avoid any delays in processing your return.",
              },
              {
                question: "Can I return items bought on sale?",
                answer:
                  "Yes, items bought on sale can be returned. However, please note that sale items may be subject to different return conditions or restrictions. Be sure to check the return policy details for sale items before initiating a return. If you have any questions, our customer service team is available to assist you.",
              },
            ]}
          />
        </div>
      </div>
    ),
    contactUs: (
      <>
        <h1 className="about-section-title">Contact Us</h1>
        <h3 className="about-subtitle"> We’d Love to Hear From You!</h3>
        <p className="about-section-text">
          Have questions or need assistance? Our team at Bloom Beauty is here to help! Whether you
          have inquiries about our products, need support with your order, or just want to share
          your feedback, we’re always ready to listen. For quick answers, you might also find our
          FAQ section helpful. We look forward to hearing from you!
        </p>
        <h3 className="about-subtitle">Contact Information</h3>
        <ul className="about-list">
          <li>
            <span className="li-title">Email:</span> support@bloombeauty.com
          </li>
          <li>
            <span className="li-title">Phone:</span> (123) 456-7890
          </li>
          <li>
            <span className="li-title">Address:</span> 123 Bloom Street, Suite 456, Beauty City, BC
            78910
          </li>
        </ul>

        <h3 className="about-subtitle">Customer Service Hours</h3>
        <ul className="about-list">
          <li>
            <span className="li-title">Monday to Friday:</span> 9:00 AM - 6:00 PM
          </li>
          <li>
            <span className="li-title">Saturday:</span> 10:00 AM - 4:00 PM
          </li>
          <li>
            <span className="li-title">Sunday:</span> Closed
          </li>
        </ul>
      </>
    ),
    terms: (
      <>
        <h1 className="about-section-title">Terms and Conditions</h1>
        <p className="about-subtitle">
          <strong>Welcome to Bloom Beauty!</strong>
        </p>
        <p>
          By accessing or using our website, you agree to be bound by the following Terms and
          Conditions. Please read them carefully.
        </p>

        <h2 className="about-subtitle">1. General</h2>
        <p>
          These Terms govern your use of our website and the purchase of products from Bloom Beauty.
          By using our site, you agree to comply with these Terms. If you do not agree, please do
          not use our site.
        </p>

        <h2 className="about-subtitle">2. Products and Pricing</h2>
        <p>
          All products and prices are subject to change without notice. We strive for accuracy in
          our product descriptions and pricing but may occasionally make errors. If a product’s
          price or description changes after you place an order, we will notify you and allow you to
          accept or cancel the order.
        </p>

        <h2 className="about-subtitle">3. Orders and Payments</h2>
        <p>
          Orders are subject to availability. We reserve the right to limit quantities or refuse any
          order at our discretion. Payment must be made at the time of purchase through the methods
          specified on our site.
        </p>

        <h2 className="about-subtitle">4. Shipping and Returns</h2>
        <p>
          For information on shipping and returns, please refer to our{" "}
          <a href="#">Shipping Policy</a> and <a href="#">Return Policy</a>.
        </p>

        <h2 className="about-subtitle">5. Intellectual Property</h2>
        <p>
          All content on our website, including text, images, and logos, is the property of Bloom
          Beauty and protected by copyright and trademark laws. Unauthorized use of our content is
          prohibited.
        </p>

        <h2 className="about-subtitle">6. Limitation of Liability</h2>
        <p>
          Bloom Beauty is not liable for any indirect, incidental, or consequential damages arising
          from the use of our website or products.
        </p>

        <h2 className="about-subtitle">7. Changes to Terms</h2>
        <p>
          We may update these Terms from time to time. Any changes will be posted on our website,
          and continued use of the site constitutes acceptance of the updated Terms.
        </p>

        <h2 className="about-subtitle">8. Contact Information</h2>
        <p>
          For any questions about these Terms, please contact us at{" "}
          <a href="mailto:support@bloombeauty.com">support@bloombeauty.com</a>.
        </p>
      </>
    ),
    privacyPolicy: (
      <>
        <h1 className="about-section-title">Privacy Policy</h1>
        <p className="about-subtitle">
          <strong>Your Privacy Matters to Us</strong>
        </p>
        <p className="about-section-text">
          At Bloom Beauty, we are committed to protecting your privacy. This Privacy Policy explains
          how we collect, use, and safeguard your personal information.
        </p>

        <h2 className="about-subtitle">1. Information We Collect</h2>
        <p className="about-section-text">
          We may collect personal information such as your name, email address, phone number, and
          payment information when you make a purchase or contact us. We also collect information
          about your browsing behavior and preferences on our website.
        </p>

        <h2 className="about-subtitle">2. How We Use Your Information</h2>
        <p className="about-section-text">
          We use your information to process orders, improve our services, communicate with you, and
          personalize your experience. We may also use your information to send you promotional
          offers and updates, but you can opt out of these communications at any time.
        </p>

        <h2 className="about-subtitle">3. Data Security</h2>
        <p className="about-section-text">
          We implement reasonable security measures to protect your personal information from
          unauthorized access, use, or disclosure. However, no method of transmission over the
          internet or electronic storage is completely secure, and we cannot guarantee absolute
          security.
        </p>

        <h2 className="about-subtitle">4. Sharing Your Information</h2>
        <p className="about-section-text">
          We do not sell or rent your personal information to third parties. We may share your
          information with service providers who assist us in operating our website and conducting
          our business, provided they agree to keep your information confidential.
        </p>

        <h2 className="about-subtitle">5. Cookies</h2>
        <p className="about-section-text">
          Our website uses cookies to enhance your browsing experience. Cookies are small data files
          stored on your device that help us remember your preferences and track website usage. You
          can control cookie settings through your browser.
        </p>

        <h2 className="about-subtitle">6. Your Rights</h2>
        <p className="about-section-text">
          You have the right to access, update, or delete your personal information. If you wish to
          exercise these rights, please contact us at{" "}
          <a href="mailto:support@bloombeauty.com">support@bloombeauty.com</a>.
        </p>

        <h2 className="about-subtitle">7. Changes to Privacy Policy</h2>
        <p className="about-section-text">
          We may update this Privacy Policy from time to time. Any changes will be posted on our
          website, and continued use of the site constitutes acceptance of the updated Privacy
          Policy.
        </p>

        <h2 className="about-subtitle">8. Contact Us</h2>
        <p className="about-section-text">
          If you have any questions or concerns about our Privacy Policy, please contact us at{" "}
          <a href="mailto:support@bloombeauty.com">support@bloombeauty.com</a>.
        </p>
      </>
    ),
  };

  return (
    <div className="section-content flex flex-col gap-3 bg-white p-7 shadow-custom rounded-md w-full sm:w-auto">
      {content[sectionId]}
    </div>
  );
};

export default AboutContent;
