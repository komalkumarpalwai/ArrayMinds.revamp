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
import AIImplementations from '../pages/AIImplementations/AIImplementations';
import VDProjekte from '../pages/AIImplementations/VDProjekte';
import AgentforceERP from '../pages/AIImplementations/AgentforceERP';
import AiGency from '../pages/AIImplementations/AiGency';
import Claudeforce from '../pages/AIImplementations/Claudeforce';
import Contact from '../pages/Contact/Contact';
import Blog from '../pages/Blog/Blog';
import BlogDetails from '../pages/Blog/BlogDetails';

// Admin Auth Pages
import AdminLogin from '../pages/Admin/Login/AdminLogin';
import ForgotPassword from '../pages/Admin/Login/ForgotPassword';
import ResetPassword from '../pages/Admin/Login/ResetPassword';

// Admin Protected Pages
import AdminDashboard from '../pages/Admin/Dashboard/AdminDashboard';
import UserManagement from '../pages/Admin/Users/UserManagement';
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
        <Route path="/ai-implementations" element={<AIImplementations />} />
        <Route path="/ai-implementations/claudeforce" element={<Claudeforce />} />
        <Route path="/ai-implementations/vd-projekte" element={<VDProjekte />} />
        <Route path="/ai-implementations/vdprojects" element={<VDProjekte />} />
        <Route path="/ai-implementations/agentforce" element={<AgentforceERP />} />
        <Route path="/ai-implementations/aigency" element={<AiGency />} />
        <Route path="/team" element={<Team />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blogs/:slug" element={<BlogDetails />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
      </Route>

      {/* Admin Public Authentication Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/forgot-password" element={<ForgotPassword />} />
      <Route path="/admin/reset-password" element={<ResetPassword />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          
          {/* General Dashboard (All authenticated roles) */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* User Administration (USER_VIEW permission required) */}
          <Route element={<ProtectedRoute requiredPermission="USER_VIEW" />}>
            <Route path="/admin/users" element={<UserManagement />} />
          </Route>

          {/* Blog Management (BLOG_VIEW permission required) */}
          <Route element={<ProtectedRoute requiredPermission="BLOG_VIEW" />}>
            <Route path="/admin/blogs" element={<BlogManagement />} />
          </Route>
          <Route element={<ProtectedRoute requiredPermission="BLOG_CREATE" />}>
            <Route path="/admin/blogs/create" element={<CreateBlog />} />
          </Route>
          <Route element={<ProtectedRoute requiredPermission="BLOG_EDIT" />}>
            <Route path="/admin/blogs/edit/:id" element={<EditBlog />} />
          </Route>

          {/* Careers & Applications (HR / Admin) */}
          <Route element={<ProtectedRoute requiredPermission="CAREER_VIEW" />}>
            <Route path="/admin/careers" element={<CareerManagement />} />
          </Route>
          <Route element={<ProtectedRoute requiredPermission="CAREER_CREATE" />}>
            <Route path="/admin/careers/create" element={<CreateCareer />} />
          </Route>
          <Route element={<ProtectedRoute requiredPermission="CAREER_EDIT" />}>
            <Route path="/admin/careers/edit/:id" element={<EditCareer />} />
          </Route>
          <Route element={<ProtectedRoute requiredPermission="APPLICATION_VIEW" />}>
            <Route path="/admin/career-submissions" element={<CareerSubmissions />} />
          </Route>

          {/* Contact Leads */}
          <Route element={<ProtectedRoute requiredPermission="CONTACT_VIEW" />}>
            <Route path="/admin/contact-submissions" element={<ContactSubmissions />} />
          </Route>

        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
