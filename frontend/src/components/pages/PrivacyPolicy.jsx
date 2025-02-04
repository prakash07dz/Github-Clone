import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Privacy Policy
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          Your privacy is important to us. This privacy policy outlines how we
          collect, use, and protect your information:
        </p>
        <ul className="list-disc list-inside space-y-4">
          <li>
            We only collect necessary information to provide our services.
          </li>
          <li>
            We do not share your information with third parties without your
            consent.
          </li>
          <li>Your data is stored securely on our servers.</li>
        </ul>
        <p className="text-lg leading-relaxed mt-6">
          For more details, please contact our support team at
          support@githubclone.com.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
