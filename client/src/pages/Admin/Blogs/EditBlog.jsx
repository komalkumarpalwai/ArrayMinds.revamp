import React from 'react';
import { useParams } from 'react-router-dom';

const EditBlog = () => {
  const { id } = useParams();
  return <div>This is Edit Blog Page for ID: {id}</div>;
};

export default EditBlog;
