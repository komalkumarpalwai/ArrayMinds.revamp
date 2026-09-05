import React from 'react';
import SEO from '../../components/common/SEO';
import { seoRoutes } from '../../utils/seoConfig';

const Industries = () => {
  return (
    <div className="min-h-screen py-24 px-4 max-w-7xl mx-auto">
      <SEO {...seoRoutes.industries} />
      <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1E113F]">Industries We Serve</h1>
      <p className="mt-4 text-slate-600 max-w-2xl text-base">
        Accelerating digital transformation with specialized Salesforce, Databricks, and AI workflows across Manufacturing, Healthcare, Financial Services, Retail, and Logistics.
      </p>
    </div>
  );
};

export default Industries;
