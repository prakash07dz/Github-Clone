import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Terms of Service
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          By using GitHub Clone, you agree to the following terms:
        </p>
        <ul className="list-disc list-inside space-y-4">
          <li>
            GitHub Clone is for educational and experimental purposes only.
          </li>
          <li>Do not upload sensitive or copyrighted content.</li>
          <li>
            You are responsible for your content and interactions on this
            platform.
          </li>
        </ul>
        <p className="text-lg leading-relaxed mt-6">
          For any questions regarding these terms, please contact our support
          team.
        </p>
      </div>
    </div>
  );
};

export default TermsOfService;
