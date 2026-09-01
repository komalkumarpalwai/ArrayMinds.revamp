import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import AdminLayout from '../components/admin/AdminLayout';
import ProtectedRoute from '../components/admin/ProtectedRoute';

// Public Pages
import Home from '../pages/Home/Home';
import Products from '../pages/Products/Products';
import AMERP from '../pages/AMERP/AMERP';
import Services from '../pages/Services/Services';
import Team from '../pages/Team/Team';
import Industries from '../pages/Industries/Industries';
import Careers from '../pages/Careers/Careers';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Blog from '../pages/Blog/Blog';
import BlogDetails from '../pages/Blog/BlogDetails';

// Admin Pages
import AdminLogin from '../pages/Admin/Login/AdminLogin';
import AdminDashboard from '../pages/Admin/Dashboard/AdminDashboard';
import BlogManagement from '../pages/Admin/Blogs/BlogManagement';
import CreateBlog from '../pages/Admin/Blogs/CreateBlog';
import EditBlog from '../pages/Admin/Blogs/EditBlog';
import CareerManagement from '../pages/Admin/Careers/CareerManagement';
import CreateCareer from '../pages/Admin/Careers/CreateCareer';
import EditCareer from '../pages/Admin/Careers/EditCareer';
import CareerSubmissions from '../pages/Admin/CareerSubmissions/CareerSubmissions';
import ContactSubmissions from '../pages/Admin/ContactSubmissions/ContactSubmissions';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages Layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/AMERP" element={<AMERP />} />
        <Route path="/amerp" element={<AMERP />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/blogs" element={<BlogManagement />} />
          <Route path="/admin/blogs/create" element={<CreateBlog />} />
          <Route path="/admin/blogs/edit/:id" element={<EditBlog />} />
          <Route path="/admin/careers" element={<CareerManagement />} />
          <Route path="/admin/careers/create" element={<CreateCareer />} />
          <Route path="/admin/careers/edit/:id" element={<EditCareer />} />
          <Route path="/admin/career-submissions" element={<CareerSubmissions />} />
          <Route path="/admin/contact-submissions" element={<ContactSubmissions />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
