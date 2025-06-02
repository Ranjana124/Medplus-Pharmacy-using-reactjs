
import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-2xl p-8 md:p-10"
      >
        <div className="flex items-center mb-8">
          <FileText className="w-10 h-10 text-primary mr-4" />
          <h1 className="text-3xl font-bold text-gray-800">Terms of Service</h1>
        </div>
        
        <div className="prose max-w-none text-gray-700">
          <p className="lead">Welcome to MediPharm! These terms and conditions outline the rules and regulations for the use of MediPharm's Website, located at [Your Website URL].</p>

          <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use MediPharm if you do not agree to take all of the terms and conditions stated on this page.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Cookies</h2>
          <p>We employ the use of cookies. By accessing MediPharm, you agreed to use cookies in agreement with the MediPharm's Privacy Policy.</p>
          <p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">License</h2>
          <p>Unless otherwise stated, MediPharm and/or its licensors own the intellectual property rights for all material on MediPharm. All intellectual property rights are reserved. You may access this from MediPharm for your own personal use subjected to restrictions set in these terms and conditions.</p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from MediPharm</li>
            <li>Sell, rent or sub-license material from MediPharm</li>
            <li>Reproduce, duplicate or copy material from MediPharm</li>
            <li>Redistribute content from MediPharm</li>
          </ul>

          <h2 className="text-xl font-semibold mt-6 mb-3">User Comments</h2>
          <p>This Agreement shall begin on the date hereof. Our Terms and Conditions were created with the help of the <a href="https://www.termsandconditionsgenerator.com/">Terms And Conditions Generator</a>.</p>
          <p>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. MediPharm does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of MediPharm,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, MediPharm shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
          <p>MediPharm reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</p>

          <h2 className="text-xl font-semibold mt-6 mb-3">Disclaimer</h2>
          <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
          <ul>
            <li>limit or exclude our or your liability for death or personal injury;</li>
            <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
          <p>The limitations and prohibitions of liability set in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer, including liabilities arising in contract, in tort and for breach of statutory duty.</p>
          <p>As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
          <p className="mt-6">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsPage;
