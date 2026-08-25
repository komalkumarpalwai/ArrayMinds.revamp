import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  Users,
  Briefcase, 
  FileText, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

const AdminSidebar = () => {
  const navItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      name: 'Contact Submissions (Leads)',
      path: '/admin/contact-submissions',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      name: 'Career Submissions',
      path: '/admin/career-submissions',
      icon: <Users className="w-4 h-4" />
    },
    {
      name: 'Career Postings',
      path: '/admin/careers',
      icon: <Briefcase className="w-4 h-4" />
    },
    {
      name: 'Blog Management',
      path: '/admin/blogs',
      icon: <FileText className="w-4 h-4" />
    }
  ];

  return (
    <aside className="w-64 bg-[#0A1128] text-white flex-shrink-0 min-h-[calc(100vh-4rem)] p-4 border-r border-white/10 hidden md:block">
      <div className="space-y-6">
        
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8A99B5] px-3 mb-2">
            Navigation
          </p>
          <nav className="space-y-1.5">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#00C2CB] text-[#032B2E] font-bold shadow-md shadow-[#00C2CB]/30'
                      : 'text-[#C7CDDA] hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.name}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Salesforce Status Card */}
        <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 mt-8">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold text-white">Salesforce Integration</span>
          </div>
          <p className="text-[10px] text-[#8A99B5] leading-relaxed font-mono">
            REST API & SOQL Live
          </p>
        </div>

      </div>
    </aside>
  );
};

export default AdminSidebar;
