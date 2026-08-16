import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetails = () => {
  const { slug } = useParams();
  return <div>This is Blog Details Page for: {slug}</div>;
};

export default BlogDetails;
