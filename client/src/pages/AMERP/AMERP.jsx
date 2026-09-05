import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import { 
  Cpu, 
  Layers, 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Factory, 
  Boxes, 
  Users2, 
  Globe, 
  ArrowDown, 
  ChevronRight, 
  ChevronLeft, 
  ShoppingCart, 
  FileText, 
  Truck, 
  DollarSign, 
  BarChart3, 
  Check, 
  Building2, 
  PackageCheck, 
  Workflow, 
  Warehouse, 
  Split, 
  CheckCircle, 
  AlertCircle, 
  Maximize2, 
  X, 
  Eye, 
  ImageIcon,
  Sparkle,
  Package,
  ShieldCheck,
  Zap,
  Cloud,
  ServerOff,
  HelpCircle,
  CheckCircle2,
  XCircle,
  Clock,
  RefreshCw
} from 'lucide-react';

// Actual ERP Product Screenshots from Assets
import imgSalesPlanner from '../../assets/ERP-Project/1_hero_sales_allocation_planner.png';
import imgSalesDetails from '../../assets/ERP-Project/2_feature_sales_allocation_details.png';
import imgCoverageSummary from '../../assets/ERP-Project/3_feature_coverage_summary.png';
import imgInventoryTransfers from '../../assets/ERP-Project/4_hero_manage_inventory_transfers.png';
import imgBulkConfirm from '../../assets/ERP-Project/5_feature_bulk_confirm_dialogs.png';
import imgEnterpriseInventory from '../../assets/ERP-Project/6_hero_enterprise_inventory.png';
import imgReservedInventory from '../../assets/ERP-Project/7_feature_reserved_inventory_transfers.png';
import imgInventoryDetail from '../../assets/ERP-Project/8_feature_inventory_record_detail.png';
import imgSupplyMethod from '../../assets/ERP-Project/9_hero_decide_supply_method.png';
import imgPurchasePlanning from '../../assets/ERP-Project/10_feature_purchase_planning.png';
import imgCreatePO from '../../assets/ERP-Project/11_feature_create_purchase_orders.png';
import imgSupplyMonitoring from '../../assets/ERP-Project/12_feature_supply_monitoring.png';
import imgMfgPlanning from '../../assets/ERP-Project/13_hero_manufacturing_planning.png';
import imgSupplySelection from '../../assets/ERP-Project/14_feature_supply_request_selection.png';
import imgMaterialPlanning from '../../assets/ERP-Project/15_feature_material_planning.png';
import imgMODocuments from '../../assets/ERP-Project/16_feature_mo_documents_generated.png';
import imgSupplyHero from '../../assets/ERP-Project/17_hero_supply_monitoring.png';
import imgExceptionsOverview from '../../assets/ERP-Project/18_feature_exceptions_overview.png';
import imgOrderTracking from '../../assets/ERP-Project/19_hero_sales_order_tracking.png';
import imgFulfillmentJourney from '../../assets/ERP-Project/20_feature_order_fulfillment_journey.png';
import imgOrderTimeline from '../../assets/ERP-Project/21_feature_order_timeline.png';
import imgQuoteAndPOPdf from '../../assets/ERP-Project/quote_and_po_pdfs.png';
import SEO from '../../components/common/SEO';
import { seoRoutes } from '../../utils/seoConfig';

const AMERP = () => {
  const containerRef = useRef(null);
  const [activeUiTab, setActiveUiTab] = useState('manufacturing');
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const [selectedModule, setSelectedModule] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);
  
  // Lightbox Modal state with gallery support
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    sectionKey: 'manufacturing',
    currentIndex: 0
  });

  // Section Galleries grouping all related ERP screenshots
  const sectionGalleries = {
    manufacturing: [
      {
        src: imgMfgPlanning,
        title: 'Manufacturing Planning (Product Selection)',
        desc: 'Select items with open demand to review and plan manufacturing orders in a guided 4-step workflow.',
        step: 'Step 1 • Product Selection'
      },
      {
        src: imgSupplySelection,
        title: 'Supply Request Selection',
        desc: 'Filter and select specific open supply requests ready for manufacturing order creation.',
        step: 'Step 2 • Supply Request Selection'
      },
      {
        src: imgMaterialPlanning,
        title: 'Material Planning & Shortage Explosion',
        desc: 'Multi-level Bill of Materials (BOM) explosion with real-time component availability & shortage warnings.',
        step: 'Step 3 • Material Planning'
      },
      {
        src: imgMODocuments,
        title: 'MO Documents Generated',
        desc: 'Automated manufacturing order document generation with work order routing and barcodes.',
        step: 'Step 4 • MO Documents Generated'
      }
    ],
    sales: [
      {
        src: imgSalesPlanner,
        title: 'Sales Allocation Planner',
        desc: 'Centralized sales allocation matrix connecting open customer demand directly to inventory availability.',
        step: 'Step 1 • Allocation Planner'
      },
      {
        src: imgSalesDetails,
        title: 'Sales Allocation Details & Reservations',
        desc: 'Line-by-line inventory reservation and fulfillment schedule confirmation.',
        step: 'Step 2 • Allocation Details'
      },
      {
        src: imgCoverageSummary,
        title: 'Stock Coverage & Allocation Summary',
        desc: 'Margin safeguards, coverage percentages, and customer credit terms analysis.',
        step: 'Step 3 • Coverage Summary'
      },
      {
        src: imgQuoteAndPOPdf,
        title: 'Quote & Purchase Order PDF Document Generation',
        desc: 'One-click branded PDF document generation for Customer Quotes & Vendor POs with tax breakdown and signatures.',
        step: 'Step 4 • Quote & PO PDFs'
      }
    ],
    orders: [
      {
        src: imgOrderTracking,
        title: 'Sales Order Tracking & Live Pipeline',
        desc: 'Real-time order milestone tracking from quote conversion to warehouse staging.',
        step: 'Step 1 • Order Tracking'
      },
      {
        src: imgFulfillmentJourney,
        title: 'Order Fulfillment Journey',
        desc: 'Interactive step-by-step milestone progression connecting CRM with dispatch.',
        step: 'Step 2 • Fulfillment Journey'
      },
      {
        src: imgOrderTimeline,
        title: 'Order Audit Timeline & Carrier Telemetry',
        desc: 'Detailed chronological event log with delivery milestones and carrier handoffs.',
        step: 'Step 3 • Order Timeline'
      }
    ],
    inventory: [
      {
        src: imgEnterpriseInventory,
        title: 'Enterprise Multi-Warehouse Inventory Matrix',
        desc: 'Multi-location real-time stock balances, bin allocations, and reorder triggers.',
        step: 'Step 1 • Inventory Matrix'
      },
      {
        src: imgInventoryTransfers,
        title: 'Manage Inventory Transfers Across Warehouses',
        desc: 'Inter-warehouse transfer requisitions, in-transit monitoring, and routing rules.',
        step: 'Step 2 • Inventory Transfers'
      },
      {
        src: imgBulkConfirm,
        title: 'Bulk Confirm Transfer Dialogs',
        desc: 'High-speed modal dialogs for bulk picking, transfers, and receiving verification.',
        step: 'Step 3 • Bulk Confirm Dialogs'
      },
      {
        src: imgReservedInventory,
        title: 'Reserved Inventory Transfers',
        desc: 'Dedicated stock reservations tied to confirmed customer orders to prevent stockouts.',
        step: 'Step 4 • Reserved Transfers'
      },
      {
        src: imgInventoryDetail,
        title: 'Inventory Record Detail & Lot History',
        desc: 'Granular lot, batch, and serial number history with complete movement log.',
        step: 'Step 5 • Record Details'
      }
    ],
    fulfillment: [
      {
        src: imgSupplyMethod,
        title: 'Decide Supply Method (Direct Stock vs PO vs MO)',
        desc: 'Intelligent decision engine evaluating inventory availability against procurement and manufacturing.',
        step: 'Step 1 • Decide Supply Method'
      },
      {
        src: imgFulfillmentJourney,
        title: 'Order Fulfillment Journey & Milestone Tracking',
        desc: 'Pick, pack, quality inspection, and carrier label generation in an automated flow.',
        step: 'Step 2 • Fulfillment Journey'
      },
      {
        src: imgSupplyHero,
        title: 'Supply Monitoring & Dispatch Telemetry',
        desc: 'Live dispatch telemetry, automated ASN generation, and carrier integration.',
        step: 'Step 3 • Supply Monitoring'
      },
      {
        src: imgSupplyMonitoring,
        title: 'Supply Request Tracking Timeline',
        desc: 'End-to-end supply execution monitoring with real-time status updates.',
        step: 'Step 4 • Supply Tracking'
      }
    ],
    procurement: [
      {
        src: imgPurchasePlanning,
        title: 'Purchase Planning & Requisition Flow',
        desc: 'Demand-driven purchase requisition generator based on shortfall order allocations.',
        step: 'Step 1 • Purchase Planning'
      },
      {
        src: imgCreatePO,
        title: 'Create Purchase Orders (POs)',
        desc: 'Multi-vendor purchase order builder with tiered pricing and automated approval workflows.',
        step: 'Step 2 • Create Purchase Orders'
      },
      {
        src: imgQuoteAndPOPdf,
        title: 'Purchase Order (PO) PDF Document Generator',
        desc: 'Standardized and automated vendor purchase order documents generated with company branding, terms, and delivery schedules.',
        step: 'Step 3 • PO PDF Documents'
      },
      {
        src: imgExceptionsOverview,
        title: 'Procurement Exceptions Overview & Resolution',
        desc: 'Real-time alerts for vendor delays, price variances, and lead-time shifts.',
        step: 'Step 4 • Exceptions Overview'
      }
    ]
  };

  const openGalleryModal = (sectionKey, index = 0) => {
    setLightboxState({
      isOpen: true,
      sectionKey,
      currentIndex: index
    });
  };

  const closeGalleryModal = () => {
    setLightboxState(prev => ({ ...prev, isOpen: false }));
  };

  const nextGalleryImage = () => {
    const gallery = sectionGalleries[lightboxState.sectionKey] || [];
    if (gallery.length <= 1) return;
    setLightboxState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % gallery.length
    }));
  };

  const prevGalleryImage = () => {
    const gallery = sectionGalleries[lightboxState.sectionKey] || [];
    if (gallery.length <= 1) return;
    setLightboxState(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + gallery.length) % gallery.length
    }));
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxState.isOpen) return;
      if (e.key === 'Escape') closeGalleryModal();
      if (e.key === 'ArrowRight') nextGalleryImage();
      if (e.key === 'ArrowLeft') prevGalleryImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState.isOpen, lightboxState.sectionKey]);

  // GSAP Animations
  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // 1. Hero Elements Entrance
      gsap.fromTo(
        '.gsap-erp-hero',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out', clearProps: 'all' }
      );

      // 2. Hero Mockup Frame
      gsap.fromTo(
        '.gsap-hero-mockup',
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.3, ease: 'power2.out', clearProps: 'all' }
      );

      // 3. Managed Package Pillars
      gsap.fromTo(
        '.gsap-pillar-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.gsap-pillar-card',
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 4. Business Flow Cards
      gsap.fromTo(
        '.gsap-flow-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '#business-flow',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 5. Decision Tree Nodes
      gsap.fromTo(
        '.gsap-decision-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.gsap-decision-card',
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 6. ERP Module Cards
      gsap.fromTo(
        '.gsap-module-card',
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.07,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.gsap-module-card',
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 7. Comparison Rows
      gsap.fromTo(
        '.gsap-compare-row',
        { opacity: 0, x: -15 },
        {
          opacity: 1,
          x: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.gsap-compare-row',
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 8. FAQ items
      gsap.fromTo(
        '.gsap-faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.gsap-faq-item',
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );

      // 9. CTA Card
      gsap.fromTo(
        '.gsap-cta-card',
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          clearProps: 'all',
          scrollTrigger: {
            trigger: '.gsap-cta-card',
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Tab metadata for Interactive UI Tabs
  const tabInfo = {
    manufacturing: {
      label: 'Manufacturing (MO)',
      title: 'Shop Floor & Production Planning',
      desc: 'Guided 4-step wizard for Bill of Materials (BOM) explosion, component shortage detection, work center dispatching, and routing.',
      badge: '4 Dedicated Screens Available',
      stats: 'Real-time BOM Shortage Detection'
    },
    sales: {
      label: 'Sales & Quotes',
      title: 'Sales Allocation & Customer Demand',
      desc: 'Connect CRM opportunities directly to live inventory allocations, stock coverage matrices, and margin safeguards.',
      badge: '4 Dedicated Screens Available',
      stats: 'Live Available-to-Promise (ATP)'
    },
    orders: {
      label: 'Order Pipeline',
      title: 'End-to-End Order Milestone Journey',
      desc: 'Real-time visibility from order creation to carrier pickup with live milestone progress and audit histories.',
      badge: '3 Dedicated Screens Available',
      stats: 'Carrier Integration & Telemetry'
    },
    inventory: {
      label: 'Inventory Control',
      title: 'Multi-Warehouse Inventory & Bin Matrix',
      desc: 'Multi-site stock balances, inter-warehouse transfer workflows, batch/lot tracking, and bulk picking verification.',
      badge: '5 Dedicated Screens Available',
      stats: 'Multi-Warehouse Reorder Triggers'
    },
    fulfillment: {
      label: 'Supply Routing',
      title: 'Automated Supply Method Engine',
      desc: 'Intelligent decision engine that analyzes shortfall items and automatically triggers PO or MO creation.',
      badge: '4 Dedicated Screens Available',
      stats: 'Direct Stock vs PO vs MO Logic'
    },
    procurement: {
      label: 'Procurement (PO)',
      title: 'Purchase Planning & Vendor Management',
      desc: 'Demand-driven purchase requisition generator with vendor tiering, PO creation, exception handling, and auto-dispatch.',
      badge: '4 Dedicated Screens Available',
      stats: 'Vendor Lead Time Safeguards'
    }
  };

  // Business Flow Steps
  const businessFlowSteps = [
    {
      step: '01',
      title: 'Lead',
      desc: 'Capture & qualify prospective business demand directly in Salesforce.',
      icon: <Users2 className="w-4 h-4 text-cyan-700" />
    },
    {
      step: '02',
      title: 'Opportunity',
      desc: 'Track deal value, requirements, credit terms, and pipeline stages.',
      icon: <TrendingUp className="w-4 h-4 text-cyan-700" />
    },
    {
      step: '03',
      title: 'Quote',
      desc: 'Configure pricing, tiered volume discounts, and branded PDF generation.',
      icon: <FileText className="w-4 h-4 text-cyan-700" />
    },
    {
      step: '04',
      title: 'Order',
      desc: 'Convert winning quotes into verified sales orders with ATP reservations.',
      icon: <ShoppingCart className="w-4 h-4 text-cyan-700" />
    },
    {
      step: '05',
      title: 'Allocation',
      desc: 'Auto-allocate inventory against open customer orders across all depots.',
      icon: <Split className="w-4 h-4 text-cyan-700" />
    },
    {
      step: '06',
      title: 'Procure / Mfg',
      desc: 'Automated shortfall resolution via vendor POs or shop floor MOs.',
      icon: <Factory className="w-4 h-4 text-cyan-700" />
    },
    {
      step: '07',
      title: 'Fulfillment',
      desc: 'Pick, pack, quality inspection, and carrier label generation.',
      icon: <PackageCheck className="w-4 h-4 text-cyan-700" />
    },
    {
      step: '08',
      title: 'Delivery',
      desc: 'Carrier telemetry, automated ASNs, and digital proof of delivery.',
      icon: <Truck className="w-4 h-4 text-cyan-700" />
    }
  ];

  // Modules List
  const modules = [
    {
      id: 'sales',
      name: 'Sales & Allocation',
      handles: 'Lead capture, quotes, orders, customer pricing, and real-time inventory allocation.',
      icon: <TrendingUp className="w-5 h-5 text-cyan-700" />,
      sectionKey: 'sales',
      details: [
        'Allocation Matrix connecting orders to inventory',
        'Available-to-Promise (ATP) engine',
        'Credit limit and payment term enforcement',
        'Multi-currency and tiered discounting'
      ]
    },
    {
      id: 'orders',
      name: 'Order Management',
      handles: 'Order capture, line-item scheduling, tracking, and customer status portal.',
      icon: <ShoppingCart className="w-5 h-5 text-cyan-700" />,
      sectionKey: 'orders',
      details: [
        'End-to-end milestone journey telemetry',
        'Automated order confirmation generation',
        'Change order and revision history tracking',
        'Split ship and partial fulfillment handling'
      ]
    },
    {
      id: 'inventory',
      name: 'Inventory & Warehousing',
      handles: 'Stock levels, bin allocations, batch/lot tracking, and warehouse transfers.',
      icon: <Boxes className="w-5 h-5 text-cyan-700" />,
      sectionKey: 'inventory',
      details: [
        'Multi-warehouse real-time balance tracking',
        'Inter-warehouse transfer requisitions',
        'Barcode scanner support & bulk picking dialogs',
        'Automated safety stock and reorder triggers'
      ]
    },
    {
      id: 'procurement',
      name: 'Procurement (PO)',
      handles: 'Vendor management, purchase orders, approval chains, and goods receipt.',
      icon: <FileText className="w-5 h-5 text-cyan-700" />,
      sectionKey: 'procurement',
      details: [
        'Demand-driven purchase requisition generator',
        'Vendor performance and lead-time tracking',
        'Multi-level PO approval hierarchy',
        'Automated 3-way matching with AP invoices'
      ]
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing (MO)',
      handles: 'Bill of Materials (BOM), work orders, routing, and shop-floor tracking.',
      icon: <Factory className="w-5 h-5 text-cyan-700" />,
      sectionKey: 'manufacturing',
      details: [
        'Multi-level BOM explosion and cost rollup',
        'Real-time component shortage alerts',
        'Work center capacity scheduling and routing',
        'Scrap, yield, and labor hour recording'
      ]
    },
    {
      id: 'fulfillment',
      name: 'Fulfillment & Logistics',
      handles: 'Pick, pack, ship operations, carrier integrations, and shipment tracking.',
      icon: <Truck className="w-5 h-5 text-cyan-700" />,
      sectionKey: 'fulfillment',
      details: [
        'Intelligent supply decision engine (Stock vs PO vs MO)',
        'Carrier rate shopping and shipping label printing',
        'Automated Advanced Shipping Notices (ASNs)',
        'Return Material Authorization (RMA) handling'
      ]
    },
    {
      id: 'finance',
      name: 'Finance & Invoicing',
      handles: 'Invoicing, payment tracking, cost accounting, and ERP ledger synchronization.',
      icon: <DollarSign className="w-5 h-5 text-cyan-700" />,
      sectionKey: 'sales',
      details: [
        'Automated customer invoice generation upon dispatch',
        'Revenue recognition schedules for recurring contracts',
        'Standard and actual cost variance reporting',
        'Seamless GL export to QuickBooks, NetSuite, or SAP'
      ]
    },
    {
      id: 'analytics',
      name: 'Operations Analytics',
      handles: 'Executive dashboards, fulfillment KPIs, inventory turnover, and margin reports.',
      icon: <BarChart3 className="w-5 h-5 text-cyan-700" />,
      sectionKey: 'orders',
      details: [
        'Real-time executive pipeline and backlog dashboard',
        'On-Time In-Full (OTIF) fulfillment rate metrics',
        'Inventory holding cost and aging analysis',
        'Automated scheduled report distribution'
      ]
    }
  ];

  // Comparison Matrix Data
  const comparisonItems = [
    {
      feature: 'Installation & Deployment',
      arrayminds: '1-Click AppExchange Managed Package (Ready in Days)',
      traditional: '9 to 18-Month Custom Implementation Nightmare'
    },
    {
      feature: 'Salesforce Native Synergy',
      arrayminds: '100% Native on Salesforce Core Objects & Trust Cloud',
      traditional: 'External Siloed Database with Fragile ETL Connectors'
    },
    {
      feature: 'Admin & Maintenance Overhead',
      arrayminds: 'Zero Custom Coding • Zero Dedicated Admin Staff Required',
      traditional: 'Requires Costly Dedicated ERP Admins & Developers'
    },
    {
      feature: 'Middleware & Infrastructure',
      arrayminds: '0 Middleware Servers • No MuleSoft or AWS Hosting Costs',
      traditional: 'Costly Middleware (MuleSoft / Boomi) & Server Maintenance'
    },
    {
      feature: 'Updates & Upgrades',
      arrayminds: 'Automatic AppExchange Push Updates (Zero Broken Code)',
      traditional: 'Expensive, Risky Version Migrations & Upgrades'
    },
    {
      feature: 'Total Cost of Ownership (TCO)',
      arrayminds: 'Up to 70% Lower Overall Implementation & Operating Cost',
      traditional: 'Massive Consultant Billing & Annual Maintenance Fees'
    }
  ];

  // FAQ Items
  const faqItems = [
    {
      q: 'Do we need a dedicated Salesforce Admin to manage ArrayMinds ERP?',
      a: 'No! ArrayMinds ERP is designed as a self-governing managed package. All validation rules, inventory allocation triggers, and automated workflows operate out of the box without requiring daily admin interventions or custom Apex coding.'
    },
    {
      q: 'How fast can we go live with ArrayMinds ERP?',
      a: 'Because it is a verified Salesforce Managed Package, installation takes minutes. Most organizations complete data onboarding and go live within 48 hours to 2 weeks, compared to 9–18 months for traditional ERP systems like NetSuite or SAP.'
    },
    {
      q: 'Does our proprietary business data ever leave Salesforce?',
      a: 'Never. ArrayMinds ERP is 100% Salesforce-native. All your customer orders, inventory records, Bill of Materials, and invoices reside directly within your secure Salesforce Trust cloud boundary, protected by Salesforce Shield and encryption.'
    },
    {
      q: 'Can it handle multi-warehouse inventory and discrete manufacturing?',
      a: 'Yes. ArrayMinds ERP includes enterprise multi-warehouse routing, bin allocations, inter-warehouse transfers, Bill of Materials (BOM) explosion, component shortage detection, and complete work order document generation.'
    },
    {
      q: 'How do product upgrades and new features work?',
      a: 'Upgrades are delivered seamlessly via Salesforce AppExchange push updates. New features and performance improvements are automatically deployed to your org without breaking your existing page layouts, permission sets, or customer data.'
    }
  ];

  // Industries Data
  const industries = [
    {
      name: 'Manufacturing & Industrial',
      desc: 'Multi-level BOM explosion, machine capacity planning, component shortages, and scrap management.',
      icon: <Factory className="w-5 h-5 text-cyan-700" />
    },
    {
      name: 'Wholesale & Distribution',
      desc: 'Multi-warehouse inventory routing, bulk order picking, container staging, and 3PL synchronization.',
      icon: <Warehouse className="w-5 h-5 text-cyan-700" />
    },
    {
      name: 'Field Services & Construction',
      desc: 'Mobile stock consumption, job-cost allocation, equipment tracking, and procurement requisitions.',
      icon: <Building2 className="w-5 h-5 text-cyan-700" />
    },
    {
      name: 'E-Commerce & Retail Supply',
      desc: 'Omnichannel inventory reservation, split shipments, carrier label generation, and automated ASNs.',
      icon: <ShoppingCart className="w-5 h-5 text-cyan-700" />
    },
    {
      name: 'Automotive & Component Supply',
      desc: 'Lot & serial traceability, supplier quality inspections, vendor blanket POs, and JIT delivery.',
      icon: <Cpu className="w-5 h-5 text-cyan-700" />
    },
    {
      name: 'High-Tech & Electronics',
      desc: 'Revision-controlled BOMs, lead-time variance buffers, warranty RMA tracking, and serial histories.',
      icon: <Sparkles className="w-5 h-5 text-cyan-700" />
    }
  ];

  const currentGallery = sectionGalleries[lightboxState.sectionKey] || [];
  const currentItem = currentGallery[lightboxState.currentIndex] || currentGallery[0] || {};

  return (
    <div ref={containerRef} className="w-full bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      <SEO {...seoRoutes.amerp} />
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION */}
      {/* ========================================================================= */}
      <div className="relative overflow-hidden bg-gradient-to-b from-white via-cyan-50/30 to-[#F8FAFC] border-b border-slate-200/80">
        
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[350px] bg-gradient-to-tr from-cyan-200/25 via-teal-100/30 to-blue-200/20 rounded-full blur-3xl pointer-events-none" />

        <section className="pt-14 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative z-10">
          
          {/* Eyebrow badge */}
          <div className="gsap-erp-hero inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-100/60 border border-cyan-300/80 text-cyan-950 mb-6 shadow-xs backdrop-blur-sm">
            <Package className="w-4 h-4 text-[#008B94]" />
            <span className="text-xs sm:text-sm font-bold tracking-wider uppercase text-cyan-950">
              100% Native Salesforce Managed Package
            </span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="gsap-erp-hero text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 leading-[1.12] max-w-5xl mx-auto">
            Connect Sales, Supply & Fulfillment in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008B94] via-[#00A3AB] to-[#1B3B6F]">
              One Connected Platform
            </span>
          </h1>

          {/* Tagline / Subtitle */}
          <p className="gsap-erp-hero mt-5 text-base sm:text-xl text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed">
            One connected platform to manage your business from lead to fulfillment. Zero custom coding, zero external servers, and zero admin maintenance — just install our managed package and start operations immediately.
          </p>

          {/* CTAs */}
          <div className="gsap-erp-hero mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm sm:text-base font-bold text-slate-950 bg-[#00C2CB] hover:bg-[#00aeb6] transition-all duration-200 shadow-lg shadow-cyan-500/25 transform hover:-translate-y-0.5 active:scale-95"
            >
              <span>Request a Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#managed-package"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm sm:text-base font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 shadow-xs transition-all duration-200"
            >
              <span>Why Managed Package?</span>
              <ArrowDown className="w-4 h-4 text-[#00A3AB]" />
            </a>
          </div>

          {/* Real ERP Hero Showcase Mockup */}
          <div className="gsap-hero-mockup mt-12 max-w-6xl mx-auto">
            <div className="rounded-3xl bg-white p-3 sm:p-5 border border-slate-200/90 shadow-2xl shadow-slate-300/60 text-left">
              
              {/* Window Bar */}
              <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 text-xs text-slate-500 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                  <span className="ml-3 font-mono text-[11px] text-slate-500 hidden sm:inline">salesforce.com/lightning/n/ArrayMinds_ERP</span>
                </div>
                <div className="flex items-center gap-2 text-[#008B94] font-semibold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-[#00C2CB] animate-pulse" />
                  Live Product Interface
                </div>
              </div>

              {/* Main ERP Screenshot Showcase */}
              <div className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-50">
                <img 
                  src={imgMfgPlanning} 
                  alt="ArrayMinds ERP Manufacturing Planning"
                  className="w-full h-auto object-cover max-h-[580px] transition-transform duration-300 group-hover:scale-[1.008]"
                />
                
                {/* Floating Preview Button */}
                <button
                  onClick={() => openGalleryModal('manufacturing', 0)}
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-900 text-white text-xs font-semibold backdrop-blur-md transition-all shadow-md hover:scale-105 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#00C2CB]" />
                  <span>Explore Live Screenshots</span>
                </button>
              </div>

              {/* Snapshot Metric Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">Installation</span>
                  <span className="text-base sm:text-lg font-bold text-slate-900">1-Click AppExchange</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-50/70 border border-cyan-200/60">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-800 block">Admin Setup</span>
                  <span className="text-base sm:text-lg font-bold text-cyan-900">Zero Overhead</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">Middleware</span>
                  <span className="text-base sm:text-lg font-bold text-slate-900">0 Servers Needed</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">Architecture</span>
                  <span className="text-base sm:text-lg font-bold text-indigo-700">100% SF Native</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. ZERO CONFIGURATION & MANAGED PACKAGE SPOTLIGHT */}
        {/* ========================================================================= */}
        <section id="managed-package" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-slate-900 via-[#0D1B3E] to-[#10224A] text-white shadow-2xl relative overflow-hidden">
            
            {/* Background Accent Gradients */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C2CB]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/30 text-[#7FE4EA] text-xs font-bold uppercase tracking-wider">
                  <ServerOff className="w-3.5 h-3.5" /> Zero Configuration • Zero Infrastructure
                </span>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                  No Complex Setup. No Heavy Admin Staff. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7FE4EA] via-[#00C2CB] to-[#7FE4EA]">
                    Just Install the Managed Package.
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-[#C7CDDA] font-light leading-relaxed">
                  Traditional ERP implementations take 9 to 18 months of developer billing and expensive server middleware. ArrayMinds ERP is packaged natively for Salesforce — install, assign user permissions, and start managing inventory and orders on day one.
                </p>
              </div>

              {/* 4 Pillars of Zero-Overhead ERP */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Pillar 1 */}
                <div className="gsap-pillar-card p-6 rounded-2xl bg-white/[0.05] border border-white/[0.1] hover:border-[#00C2CB]/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-[#00C2CB]/20 border border-[#00C2CB]/40 flex items-center justify-center text-[#7FE4EA] mb-4 group-hover:scale-110 transition-transform">
                    <Package className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    1-Click AppExchange Install
                  </h3>
                  <p className="text-xs text-[#8A99B5] leading-relaxed">
                    All custom objects, Lightning components, automated workflows, and approval chains deploy into your org in one click.
                  </p>
                </div>

                {/* Pillar 2 */}
                <div className="gsap-pillar-card p-6 rounded-2xl bg-white/[0.05] border border-white/[0.1] hover:border-[#00C2CB]/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300 mb-4 group-hover:scale-110 transition-transform">
                    <ServerOff className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Zero Middleware Servers
                  </h3>
                  <p className="text-xs text-[#8A99B5] leading-relaxed">
                    No external AWS/GCP servers or costly ETL middleware (MuleSoft/Boomi) to maintain. 100% native inside your Salesforce boundary.
                  </p>
                </div>

                {/* Pillar 3 */}
                <div className="gsap-pillar-card p-6 rounded-2xl bg-white/[0.05] border border-white/[0.1] hover:border-[#00C2CB]/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Zero Daily Admin Overhead
                  </h3>
                  <p className="text-xs text-[#8A99B5] leading-relaxed">
                    Automated background triggers handle inventory reservations, PO creation, and BOM calculations without daily admin supervision.
                  </p>
                </div>

                {/* Pillar 4 */}
                <div className="gsap-pillar-card p-6 rounded-2xl bg-white/[0.05] border border-white/[0.1] hover:border-[#00C2CB]/50 transition-all group">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-purple-300 mb-4 group-hover:scale-110 transition-transform">
                    <RefreshCw className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    Automatic Seamless Upgrades
                  </h3>
                  <p className="text-xs text-[#8A99B5] leading-relaxed">
                    AppExchange push upgrades deliver the latest manufacturing and procurement features automatically without breaking your existing setup.
                  </p>
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. SHOW THE COMPLETE BUSINESS FLOW */}
        {/* ========================================================================= */}
        <section id="business-flow" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-xs font-bold uppercase tracking-widest text-[#008B94] mb-3">
              <Workflow className="w-3.5 h-3.5" /> End-to-End Operational Pipeline
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              One Connected Business Process
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              From the first customer interaction to final fulfillment, ArrayMinds ERP seamlessly connects every stage of your business operation.
            </p>
          </div>

          {/* Horizontal / Grid Flow Process */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {businessFlowSteps.map((item, index) => (
              <div 
                key={index}
                className="gsap-flow-card p-5 rounded-2xl bg-white border border-slate-200/90 hover:border-[#00C2CB] shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-7 h-7 rounded-lg bg-cyan-50 text-cyan-900 border border-cyan-200 flex items-center justify-center font-bold text-xs">
                      {item.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-[#00C2CB] group-hover:text-slate-950 transition-colors">
                      {item.icon}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#008B94] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. DASHBOARD / INTERACTIVE UI SHOWCASE TABS */}
        {/* ========================================================================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#008B94] mb-2">
              Interactive Product Showcase
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Experience the Real ArrayMinds ERP Interface
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Explore actual high-resolution screenshots from live deployments across all 6 core operational modules.
            </p>
          </div>

          {/* Module Selector Pill Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {Object.keys(sectionGalleries).map((key) => {
              const info = tabInfo[key] || {};
              const isActive = activeUiTab === key;
              return (
                <button
                  key={key}
                  onClick={() => {
                    setActiveUiTab(key);
                    setActiveScreenIndex(0);
                  }}
                  className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-slate-900 text-white shadow-md scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {info.label || key}
                </button>
              );
            })}
          </div>

          {/* Active Tab Main Card Container */}
          <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl p-5 sm:p-8">
            
            {/* Header info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-bold text-[#008B94] uppercase tracking-wider block mb-1">
                  {tabInfo[activeUiTab]?.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  {tabInfo[activeUiTab]?.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
                  {tabInfo[activeUiTab]?.desc}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => openGalleryModal(activeUiTab, activeScreenIndex)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-300 text-cyan-950 text-xs font-bold transition-all cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-[#008B94]" />
                  <span>Full Screen Gallery ({sectionGalleries[activeUiTab]?.length} Screens)</span>
                </button>
              </div>
            </div>

            {/* Main Active Screenshot Preview Area */}
            <div className="pt-6">
              <div 
                onClick={() => openGalleryModal(activeUiTab, activeScreenIndex)}
                className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-[#FAFCFF] p-2 sm:p-4 cursor-pointer"
              >
                <img 
                  src={sectionGalleries[activeUiTab][activeScreenIndex]?.src} 
                  alt={sectionGalleries[activeUiTab][activeScreenIndex]?.title}
                  className="w-full h-auto max-h-[520px] object-contain rounded-xl shadow-xs transition-transform duration-300 group-hover:scale-[1.008]"
                />
                
                {/* Floating Overlay Hint */}
                <div className="absolute inset-0 bg-slate-900/15 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-2 shadow-lg">
                    <Maximize2 className="w-3.5 h-3.5 text-[#00C2CB]" />
                    <span>Click to open full screen zoom view</span>
                  </div>
                </div>

                {/* Caption Bar */}
                <div className="mt-3 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                  <div className="font-semibold text-slate-800">
                    <span className="text-[#008B94] font-bold mr-2">
                      {sectionGalleries[activeUiTab][activeScreenIndex]?.step}:
                    </span>
                    {sectionGalleries[activeUiTab][activeScreenIndex]?.title}
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    {sectionGalleries[activeUiTab][activeScreenIndex]?.desc}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Thumbnail Gallery Strip */}
            <div className="mt-8 pt-6 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Screens in this Module ({sectionGalleries[activeUiTab]?.length})
                </span>
                <span className="text-[11px] text-slate-500">
                  Click any thumbnail to preview
                </span>
              </div>

              {/* Thumbnails Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {sectionGalleries[activeUiTab].map((item, idx) => {
                  const isCurrent = idx === activeScreenIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveScreenIndex(idx)}
                      className={`p-3 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                        isCurrent
                          ? 'bg-cyan-50/50 border-[#00C2CB] ring-2 ring-cyan-400/50 shadow-md scale-[1.02]'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-xs'
                      }`}
                    >
                      <div className="rounded-xl overflow-hidden border border-slate-200 relative aspect-[16/10] bg-white mb-2.5">
                        <img 
                          src={item.src} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        {isCurrent && (
                          <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-[#0D1B3E] text-white text-[9px] font-bold">
                            Active
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-cyan-800 uppercase tracking-wider block">
                        {item.step}
                      </span>
                      <h4 className="text-xs font-semibold text-slate-800 line-clamp-1 mt-0.5">
                        {item.title}
                      </h4>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. STRONGEST DIFFERENTIATOR: FULFILLMENT DECISION TREE */}
        {/* ========================================================================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-cyan-50/70 via-white to-blue-50/60 border border-cyan-200 shadow-xl">
            
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#008B94] bg-cyan-100/60 px-3.5 py-1 rounded-full border border-cyan-300/60">
                Strongest Differentiator
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                From Order to Fulfillment — Without the Operational Gaps
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-600">
                Every order is automatically evaluated against available inventory, procurement requirements, and manufacturing schedules in real time.
              </p>
            </div>

            {/* Visual Logic Flow Representation */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Order Node */}
              <div className="gsap-decision-card lg:col-span-4 p-6 rounded-2xl bg-white border border-slate-200 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center text-cyan-800 font-bold">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">Sales Order Ingestion</h3>
                    <span className="text-[11px] text-cyan-700 font-semibold">100% Salesforce CRM Native</span>
                  </div>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  When a quote converts, ArrayMinds ERP evaluates line items, customer requested ship dates, and warehouse allocation rules instantly.
                </p>
              </div>

              {/* Supply Decision Engine */}
              <div className="gsap-decision-card lg:col-span-4 p-6 rounded-2xl bg-slate-900 text-white shadow-xl relative border border-slate-700">
                <div className="flex items-center gap-2 mb-2 text-[#00C2CB] text-xs font-bold uppercase tracking-wider">
                  <Cpu className="w-4 h-4" /> Decision Engine
                </div>
                <h3 className="text-lg font-bold mb-2">Automated Supply Resolution</h3>
                <p className="text-xs text-[#C7CDDA] leading-relaxed mb-4">
                  The system checks stock across all warehouses:
                </p>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/10 border border-white/10">
                    <span>1. In-Stock Available</span>
                    <span className="font-bold text-emerald-400">Direct Pick & Pack</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/10 border border-white/10">
                    <span>2. Buy Component</span>
                    <span className="font-bold text-cyan-300">Auto-Generate PO</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-white/10 border border-white/10">
                    <span>3. Make Assembly</span>
                    <span className="font-bold text-amber-300">Auto-Generate MO</span>
                  </div>
                </div>
              </div>

              {/* Real Screenshot Preview Cards */}
              <div className="gsap-decision-card lg:col-span-4 space-y-4">
                <div 
                  onClick={() => openGalleryModal('fulfillment', 0)}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-md cursor-pointer hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-2 px-1 text-xs font-bold text-slate-700">
                    <span>Decide Supply Method Screen</span>
                    <span className="text-[#008B94]">Live Engine</span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-[#FAFCFF] p-2">
                    <img 
                      src={imgSupplyMethod} 
                      alt="Decide Supply Method Screenshot"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                </div>

                <div 
                  onClick={() => openGalleryModal('fulfillment', 1)}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-md cursor-pointer hover:border-cyan-400 transition-all"
                >
                  <div className="flex items-center justify-between mb-2 px-1 text-xs font-bold text-slate-700">
                    <span>Order Fulfillment Journey Screen</span>
                    <span className="text-indigo-600">Milestone Telemetry</span>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-[#FAFCFF] p-2">
                    <img 
                      src={imgFulfillmentJourney} 
                      alt="Order Fulfillment Journey"
                      className="w-full h-32 object-contain"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. ERP MODULES (CLICKABLE CARDS) */}
        {/* ========================================================================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#008B94] mb-2">
              Modular Architecture
            </h2>
            <p className="text-2xl sm:text-4xl font-extrabold text-slate-900">
              Explore ERP Modules
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600">
              Explore the capabilities across sales, orders, inventory, procurement, manufacturing, and analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {modules.map((mod) => {
              const isSelected = selectedModule?.id === mod.id;
              return (
                <div
                  key={mod.id}
                  onClick={() => setSelectedModule(isSelected ? null : mod)}
                  className={`gsap-module-card cursor-pointer p-5 rounded-2xl transition-all duration-200 text-left border ${
                    isSelected
                      ? 'bg-white border-[#00C2CB] ring-2 ring-cyan-400/40 shadow-xl scale-[1.02]'
                      : 'bg-white border-slate-200/90 hover:border-cyan-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center">
                      {mod.icon}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openGalleryModal(mod.sectionKey, 0);
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#008B94] hover:text-[#00C2CB] px-2 py-1 rounded bg-cyan-50 hover:bg-cyan-100 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3 h-3" /> View Screens
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {mod.name}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-3">
                    {mod.handles}
                  </p>

                  {/* Expanded Checklist */}
                  {isSelected && (
                    <div className="pt-3 border-t border-slate-100 space-y-2 animate-in fade-in duration-150">
                      {mod.details.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-700">
                          <Check className="w-3.5 h-3.5 text-[#00A3AB] flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-3 text-[11px] font-bold text-[#008B94] flex items-center gap-1">
                    <span>{isSelected ? 'Show less' : 'View module details'}</span>
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. COMPARISON MATRIX: ARRAYMINDS ERP VS TRADITIONAL ERPS */}
        {/* ========================================================================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-xl">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-[#008B94] bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200">
                Head-to-Head Comparison
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
                ArrayMinds ERP vs Traditional ERP Systems
              </h2>
              <p className="mt-3 text-sm text-slate-600">
                Why modern high-growth companies choose a plug-and-play Salesforce Managed Package over legacy monolithic ERPs.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                    <th className="py-4 px-4 font-bold">Key Operational Capability</th>
                    <th className="py-4 px-4 font-bold text-cyan-900 bg-cyan-50/70 rounded-t-xl">
                      ArrayMinds ERP (Managed Package)
                    </th>
                    <th className="py-4 px-4 font-bold text-slate-700">Traditional ERP (NetSuite / SAP / Custom)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                  {comparisonItems.map((item, idx) => (
                    <tr key={idx} className="gsap-compare-row hover:bg-slate-50/60 transition-colors">
                      <td className="py-4 px-4 font-bold text-slate-900">
                        {item.feature}
                      </td>
                      <td className="py-4 px-4 font-semibold text-cyan-950 bg-cyan-50/40">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                          <span>{item.arrayminds}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                          <span>{item.traditional}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 8. INDUSTRY SOLUTIONS */}
        {/* ========================================================================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-sm">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="text-xs font-bold uppercase tracking-widest text-[#008B94] mb-2">
                Industry Specifics
              </h2>
              <p className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Built for the Way Different Industries Operate
              </p>
              <p className="mt-3 text-sm text-slate-600">
                Configurable workflows and supply chain mechanics tailored for specialized manufacturing and distribution models.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {industries.map((ind, iIdx) => (
                <div 
                  key={iIdx}
                  className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-cyan-300 transition-all shadow-xs"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center">
                      {ind.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base">{ind.name}</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed pl-10">
                    {ind.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 9. FREQUENTLY ASKED QUESTIONS (FAQ) ACCORDION */}
        {/* ========================================================================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#008B94] bg-cyan-50 px-3.5 py-1 rounded-full border border-cyan-200">
              Clear Answers
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-3">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-slate-600">
              Everything you need to know about our Salesforce-native managed package installation and operation.
            </p>
          </div>

          <div className="space-y-3">
            {faqItems.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div 
                  key={fIdx}
                  className="gsap-faq-item rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:text-[#008B94] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight className={`w-4 h-4 text-[#00A3AB] flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 10. FINAL CTA SECTION */}
        {/* ========================================================================= */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
          <div className="gsap-cta-card p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-[#0A1128] via-[#0D1B3E] to-[#1B3B6F] text-white shadow-2xl">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-[#7FE4EA] text-xs font-bold uppercase tracking-wider mb-4">
              Get Started in Days, Not Months
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mb-3">
              Ready to bring your operations into one system?
            </h2>
            <p className="text-[#C7CDDA] text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light">
              Experience the power of connected sales, inventory, procurement, manufacturing, and fulfillment — delivered 100% natively in Salesforce.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base font-bold text-slate-950 bg-[#00C2CB] hover:bg-[#00aeb6] transition-all duration-200 shadow-xl shadow-cyan-500/30 transform hover:-translate-y-0.5"
              >
                <span>Request an ERP Demo</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-white/[0.1] hover:bg-white/[0.2] border border-white/[0.2] transition-all duration-200"
              >
                <span>Talk to Our Team</span>
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 11. WORLD-CLASS FULLSCREEN MODAL / LIGHTBOX GALLERY */}
      {/* ========================================================================= */}
      {lightboxState.isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeGalleryModal}
        >
          {/* Main Modal Box */}
          <div 
            className="relative w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-slate-200/90 shadow-2xl shadow-slate-900/30 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200/80 bg-white">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-cyan-50 text-cyan-900 border border-cyan-200 text-xs font-extrabold uppercase tracking-wider">
                  {tabInfo[lightboxState.sectionKey]?.label || lightboxState.sectionKey}
                </span>
                <span className="text-xs font-semibold text-slate-400 hidden sm:inline">•</span>
                <span className="text-xs font-semibold text-slate-600 hidden sm:inline">
                  {currentItem.step}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Image counter pill */}
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                  {lightboxState.currentIndex + 1} / {currentGallery.length}
                </span>

                {/* Close Button */}
                <button
                  onClick={closeGalleryModal}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Image Preview + Seamless Backdrop */}
            <div className="relative flex-1 bg-[#FAFCFF] p-4 sm:p-8 flex items-center justify-center min-h-[360px] max-h-[58vh] overflow-hidden">
              
              {/* Prev Navigation Button */}
              {currentGallery.length > 1 && (
                <button
                  onClick={prevGalleryImage}
                  className="absolute left-3 sm:left-5 z-20 p-3 rounded-full bg-white/95 hover:bg-white text-slate-800 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all hover:scale-110 cursor-pointer"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5 text-slate-700" />
                </button>
              )}

              {/* Main Screenshot Image */}
              <div className="w-full h-full flex items-center justify-center">
                <img 
                  key={currentItem.src}
                  src={currentItem.src} 
                  alt={currentItem.title}
                  className="max-h-[52vh] max-w-full object-contain rounded-xl border border-slate-200/90 shadow-md bg-white animate-in zoom-in-95 duration-200"
                />
              </div>

              {/* Next Navigation Button */}
              {currentGallery.length > 1 && (
                <button
                  onClick={nextGalleryImage}
                  className="absolute right-3 sm:right-5 z-20 p-3 rounded-full bg-white/95 hover:bg-white text-slate-800 border border-slate-200/90 shadow-lg hover:shadow-xl transition-all hover:scale-110 cursor-pointer"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5 text-slate-700" />
                </button>
              )}
            </div>

            {/* Modal Caption & Details */}
            <div className="px-6 py-3.5 bg-white border-t border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {currentItem.title}
                </h4>
                <p className="text-xs text-slate-600 mt-0.5 max-w-3xl">
                  {currentItem.desc}
                </p>
              </div>
              
              <div className="text-[11px] text-slate-400 font-mono flex-shrink-0">
                Use ← → arrows to navigate
              </div>
            </div>

            {/* Bottom Gallery Thumbnail Strip */}
            {currentGallery.length > 1 && (
              <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200/70 overflow-x-auto">
                <div className="flex items-center gap-3">
                  {currentGallery.map((item, idx) => {
                    const isSelected = idx === lightboxState.currentIndex;
                    return (
                      <button
                        key={idx}
                        onClick={() => setLightboxState(prev => ({ ...prev, currentIndex: idx }))}
                        className={`relative flex-shrink-0 w-28 sm:w-32 p-1 rounded-xl transition-all duration-150 border cursor-pointer text-left ${
                          isSelected
                            ? 'bg-white border-[#00C2CB] ring-2 ring-cyan-400/50 shadow-md scale-105'
                            : 'bg-white/70 border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <div className="aspect-[16/10] rounded-lg overflow-hidden border border-slate-200/80 bg-white">
                          <img 
                            src={item.src} 
                            alt={item.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[9px] font-bold text-slate-700 line-clamp-1 mt-1 block">
                          {item.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default AMERP;
