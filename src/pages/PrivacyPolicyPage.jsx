
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const PrivacyPolicyPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl p-8 md:p-10"
      >
        <div className="flex items-center mb-8">
          <ShieldCheck className="w-10 h-10 text-primary mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
        </div>

        <div className="prose max-w-none text-gray-700">
          <p className="lead">Your privacy is important to us. It is MediPharm's policy to respect your privacy regarding any information we may collect from you across our website, [Your Website URL], and other sites we own and operate.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Information We Collect</h2>
          <p>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</p>
          <p>Log data: Like most website operators, MediPharm collects non-personally-identifying information of the sort that web browsers and servers typically make available, such as the browser type, language preference, referring site, and the date and time of each visitor request.</p>
          <p>Personal Information: When you register for an account, place an order, or subscribe to our newsletter, we may collect personal information such as your name, email address, shipping address, phone number, and payment information. Prescription information is handled with utmost confidentiality and stored securely.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">How We Use Your Information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Process your transactions and manage your orders</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">Security of Your Information</h2>
          <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
          <p>We use cookies to help us remember and process the items in your shopping cart, understand and save your preferences for future visits, and compile aggregate data about site traffic and site interaction so that we can offer better site experiences and tools in the future.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Links to Other Sites</h2>
          <p>Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Changes to This Privacy Policy</h2>
          <p>We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.</p>
          
          <p className="mt-6">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;
