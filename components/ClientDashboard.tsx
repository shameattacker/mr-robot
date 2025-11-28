import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, LayoutDashboard, Map, PieChart, CheckSquare, 
  Clock, Check, XCircle, 
  TrendingUp, FileText, Palette,
  Download, ZoomIn
} from 'lucide-react';

const MotionDiv = motion.div as any;
const MotionPath = motion.path as any;

interface ClientDashboardProps {
  onClose: () => void;
}

type Tab = 'overview' | 'blueprint' | 'budget' | 'approvals' | 'documents' | 'materials';

const APPROVAL_ITEMS = [
  { id: 1, name: 'B&B Italia Camaleonda Sofa', price: 12500, status: 'pending', image: 'https://placehold.co/300x300/1a1a1a/ffffff?text=?' },
  { id: 2, name: 'Flos Arco Floor Lamp', price: 3200, status: 'approved', image: 'https://placehold.co/300x300/1a1a1a/ffffff?text=?' },
  { id: 3, name: 'Custom Walnut Cabinetry', price: 18000, status: 'rejected', image: 'https://placehold.co/300x300/1a1a1a/ffffff?text=?' },
  { id: 4, name: 'Persian Silk Rug', price: 5600, status: 'pending', image: 'https://placehold.co/300x300/1a1a1a/ffffff?text=?' },
];

const PROJECT_DOCUMENTS = [
    { id: 1, name: 'Service Agreement v2.pdf', type: 'Contract', date: 'Oct 12, 2023', status: 'Signed', size: '2.4 MB' },
    { id: 2, name: 'Initial Quotation #Q-2023-001', type: 'Invoice', date: 'Oct 10, 2023', status: 'Paid', size: '1.1 MB' },
    { id: 3, name: 'Electrical Layout Specs', type: 'Blueprint', date: 'Oct 15, 2023', status: 'Approved', size: '5.8 MB' },
    { id: 4, name: 'Furniture Procurement List', type: 'List', date: 'Oct 20, 2023', status: 'Pending', size: '850 KB' },
];

const MATERIALS_LIBRARY = [
    { id: 1, name: 'Carrara Marble', type: 'Stone', image: 'https://placehold.co/500x500/1a1a1a/ffffff?text=?', desc: 'Italian White Marble for Kitchen Countertops' },
    { id: 2, name: 'Walnut Wood Veneer', type: 'Wood', image: 'https://placehold.co/500x500/1a1a1a/ffffff?text=?', desc: 'Natural finish for Master Bedroom cabinetry' },
    { id: 3, name: 'Bouclé Fabric', type: 'Textile', image: 'https://placehold.co/500x500/1a1a1a/ffffff?text=?', desc: 'Cream textured fabric for Lounge Sofa' },
    { id: 4, name: 'Brushed Brass', type: 'Metal', image: 'https://placehold.co/500x500/1a1a1a/ffffff?text=?', desc: 'Hardware finish for bathroom fixtures' },
    { id: 5, name: 'Terrazzo Tile', type: 'Tile', image: 'https://placehold.co/500x500/1a1a1a/ffffff?text=?', desc: 'Custom mix for Guest Bathroom floor' },
    { id: 6, name: 'Smoked Oak', type: 'Wood', image: 'https://placehold.co/500x500/1a1a1a/ffffff?text=?', desc: 'Dark stain flooring for Living Area' },
];

export const ClientDashboard: React.FC<ClientDashboardProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [approvals, setApprovals] = useState(APPROVAL_ITEMS);
  const [hoveredRoom, setHoveredRoom] = useState<string | null>(null);
  const [zoomedMaterial, setZoomedMaterial] = useState<number | null>(null);

  const handleApproval = (id: number, status: 'approved' | 'rejected') => {
    setApprovals(prev => prev.map(item => item.id === id ? { ...item, status } : item));
  };

  const approvedTotal = approvals.filter(i => i.status === 'approved').reduce((acc, i) => acc + i.price, 0);
  const pendingCount = approvals.filter(i => i.status === 'pending').length;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            <div className="w-full bg-black rounded-2xl overflow-hidden border border-white/10 relative aspect-video shadow-2xl group">
                <img 
                    src="https://placehold.co/1280x720/1a1a1a/ffffff?text=LIVE+FEED+PLACEHOLDER" 
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-500"
                    alt="Live Feed Placeholder"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></div>
                    <span className="text-red-500 font-mono font-bold text-sm tracking-widest drop-shadow-md">LIVE REC</span>
                </div>
                <div className="absolute top-4 right-4 font-mono text-white/80 text-xs z-10 bg-black/30 px-2 py-1 rounded">
                    CAM-02 | LIVING_ROOM_NORTH
                </div>
                <div className="absolute bottom-4 left-4 font-mono text-white/80 text-sm z-10 bg-black/30 px-2 py-1 rounded">
                    {new Date().toLocaleTimeString()} • 1080p
                </div>
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-[1] bg-[length:100%_2px,3px_100%]"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 relative overflow-hidden hover:border-primary/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Clock size={48} /></div>
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Project Timeline</h3>
                    <div className="text-3xl text-white font-serif mt-2 mb-1">Phase 3</div>
                    <div className="text-green-500 text-sm font-medium flex items-center gap-1"><Check size={14}/> On Track</div>
                    <div className="w-full bg-white/10 h-1 mt-4 rounded-full overflow-hidden">
                        <div className="bg-primary h-full w-[65%]"></div>
                    </div>
                </div>
                <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 relative overflow-hidden hover:border-primary/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><CheckSquare size={48} /></div>
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Pending Approvals</h3>
                    <div className="text-3xl text-white font-serif mt-2 mb-1">{pendingCount} Items</div>
                    <div className="text-yellow-500 text-sm font-medium">Requires Attention</div>
                </div>
                 <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 relative overflow-hidden hover:border-primary/30 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><TrendingUp size={48} /></div>
                    <h3 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Budget Used</h3>
                    <div className="text-3xl text-white font-serif mt-2 mb-1">42%</div>
                    <div className="text-gray-500 text-sm font-medium">$124,000 / $295,000</div>
                </div>
            </div>
          </div>
        );

      case 'blueprint':
        return (
          <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl text-white font-serif">Floor Plan - Level 1</h3>
                <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary/50 rounded-sm"></div> Living</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500/50 rounded-sm"></div> Service</div>
                </div>
            </div>
            
            <div className="flex-1 bg-[#1a1a1a] rounded-2xl border border-white/5 relative overflow-hidden flex items-center justify-center p-8">
                <svg viewBox="0 0 800 600" className="w-full h-full max-w-3xl drop-shadow-2xl">
                    <MotionPath 
                        d="M 50,50 L 450,50 L 450,350 L 50,350 Z" 
                        fill={hoveredRoom === 'Living Room' ? '#CDA274' : '#2C2C2C'}
                        stroke="#CDA274" strokeWidth="2"
                        className="transition-colors duration-300 cursor-pointer opacity-50 hover:opacity-80"
                        onMouseEnter={() => setHoveredRoom('Living Room')}
                        onMouseLeave={() => setHoveredRoom(null)}
                    />
                    <MotionPath 
                        d="M 470,50 L 750,50 L 750,250 L 470,250 Z" 
                        fill={hoveredRoom === 'Kitchen' ? '#CDA274' : '#2C2C2C'}
                        stroke="#CDA274" strokeWidth="2"
                        className="transition-colors duration-300 cursor-pointer opacity-50 hover:opacity-80"
                        onMouseEnter={() => setHoveredRoom('Kitchen')}
                        onMouseLeave={() => setHoveredRoom(null)}
                    />
                    <MotionPath 
                        d="M 50,370 L 350,370 L 350,550 L 50,550 Z" 
                        fill={hoveredRoom === 'Master Suite' ? '#CDA274' : '#2C2C2C'}
                        stroke="#CDA274" strokeWidth="2"
                        className="transition-colors duration-300 cursor-pointer opacity-50 hover:opacity-80"
                        onMouseEnter={() => setHoveredRoom('Master Suite')}
                        onMouseLeave={() => setHoveredRoom(null)}
                    />
                    <MotionPath 
                        d="M 370,370 L 750,370 L 750,550 L 370,550 Z" 
                        fill={hoveredRoom === 'Dining Area' ? '#CDA274' : '#2C2C2C'}
                        stroke="#CDA274" strokeWidth="2"
                        className="transition-colors duration-300 cursor-pointer opacity-50 hover:opacity-80"
                        onMouseEnter={() => setHoveredRoom('Dining Area')}
                        onMouseLeave={() => setHoveredRoom(null)}
                    />
                </svg>

                <AnimatePresence>
                    {hoveredRoom && (
                        <MotionDiv 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white text-secondary px-6 py-3 rounded-xl shadow-xl text-center z-10"
                        >
                            <div className="font-bold font-serif text-lg">{hoveredRoom}</div>
                            <div className="text-xs text-gray-500 flex gap-3 mt-1">
                                <span>320 sq.ft</span> • <span>Hardwood Floor</span> • <span>Pending Paint</span>
                            </div>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </div>
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/5">
                    <h3 className="text-xl text-white font-serif mb-6">Budget Allocation</h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Construction & Labor', val: 45, color: 'bg-blue-500' },
                            { label: 'Furniture & Fixtures', val: 30, color: 'bg-primary' },
                            { label: 'Materials (Flooring/Tile)', val: 15, color: 'bg-orange-500' },
                            { label: 'Design Fees', val: 10, color: 'bg-gray-500' },
                        ].map((item) => (
                            <div key={item.label}>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-300">{item.label}</span>
                                    <span className="text-white font-mono">{item.val}%</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <MotionDiv 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.val}%` }}
                                        transition={{ duration: 1, delay: 0.2 }}
                                        className={`h-full ${item.color}`} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-primary/10 p-8 rounded-2xl border border-primary/20 flex flex-col justify-center items-center text-center">
                    <div className="w-32 h-32 rounded-full border-8 border-primary/30 flex items-center justify-center mb-6 relative">
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                             <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="8" fill="none" className="text-primary" strokeDasharray="289" strokeDashoffset="120" />
                        </svg>
                        <div className="text-2xl font-bold text-white font-serif">42%</div>
                    </div>
                    <h3 className="text-2xl text-white font-serif mb-2">Total Spend</h3>
                    <p className="text-4xl font-mono text-primary font-bold mb-2">$124,000</p>
                    <p className="text-gray-400 text-sm">of $295,000 projected budget</p>
                </div>
             </div>
          </div>
        );

      case 'approvals':
        return (
           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {approvals.map((item) => (
                        <MotionDiv 
                            layout
                            key={item.id} 
                            className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex gap-4 group"
                        >
                            <div className="w-32 h-32 rounded-xl overflow-hidden bg-white/5 shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <h4 className="text-white font-serif text-lg leading-tight">{item.name}</h4>
                                        <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${
                                            item.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                                            item.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                            'bg-yellow-500/20 text-yellow-400'
                                        }`}>
                                            {item.status}
                                        </span>
                                    </div>
                                    <p className="text-primary font-mono mt-1">${item.price.toLocaleString()}</p>
                                </div>
                                
                                {item.status === 'pending' && (
                                    <div className="flex gap-2 mt-2">
                                        <button 
                                            onClick={() => handleApproval(item.id, 'rejected')}
                                            className="flex-1 py-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg text-sm font-bold transition-colors"
                                        >
                                            Reject
                                        </button>
                                        <button 
                                            onClick={() => handleApproval(item.id, 'approved')}
                                            className="flex-1 py-2 bg-primary text-white hover:bg-white hover:text-secondary rounded-lg text-sm font-bold transition-colors"
                                        >
                                            Approve
                                        </button>
                                    </div>
                                )}
                                {item.status !== 'pending' && (
                                    <div className="text-xs text-gray-500 mt-auto">
                                        Decision logged by client.
                                    </div>
                                )}
                            </div>
                        </MotionDiv>
                    ))}
                </div>
                
                <div className="mt-8 p-6 bg-white/5 rounded-xl flex justify-between items-center border-t border-white/10">
                    <span className="text-gray-400">Approved Total</span>
                    <span className="text-2xl text-white font-mono">${approvedTotal.toLocaleString()}</span>
                </div>
           </div>
        );

      case 'documents':
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECT_DOCUMENTS.map((doc) => (
                        <div key={doc.id} className="bg-[#1a1a1a] border border-white/5 p-6 rounded-xl group hover:border-primary/50 transition-all cursor-pointer hover:bg-white/5">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-white/5 rounded-lg text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <FileText size={24} />
                                </div>
                                <span className={`text-xs px-2 py-1 rounded font-bold uppercase ${
                                    doc.status === 'Signed' || doc.status === 'Approved' || doc.status === 'Paid' 
                                    ? 'bg-green-500/10 text-green-500' 
                                    : 'bg-yellow-500/10 text-yellow-500'
                                }`}>
                                    {doc.status}
                                </span>
                            </div>
                            <h4 className="text-white font-medium truncate mb-1 group-hover:text-primary transition-colors">{doc.name}</h4>
                            <div className="flex justify-between text-sm text-gray-500 mb-4">
                                <span>{doc.type}</span>
                                <span>{doc.date}</span>
                            </div>
                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                <span className="text-xs text-gray-600">{doc.size}</span>
                                <button className="text-white/50 hover:text-primary transition-colors">
                                    <Download size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );

      case 'materials':
        return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {MATERIALS_LIBRARY.map((mat) => (
                        <div key={mat.id} className="group relative">
                            <div className="aspect-square rounded-full overflow-hidden border-4 border-white/10 group-hover:border-primary/50 transition-all relative cursor-zoom-in shadow-xl"
                                    onClick={() => setZoomedMaterial(mat.id)}
                            >
                                <img src={mat.image} alt={mat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <ZoomIn className="text-white drop-shadow-lg" size={32} />
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <h4 className="text-white font-serif text-lg">{mat.name}</h4>
                                <p className="text-primary text-sm">{mat.type}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <AnimatePresence>
                    {zoomedMaterial && (
                        <MotionDiv 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setZoomedMaterial(null)}
                            className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 p-8 backdrop-blur-sm"
                        >
                            {MATERIALS_LIBRARY.filter(m => m.id === zoomedMaterial).map(m => (
                                <MotionDiv 
                                    key={m.id}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.8, opacity: 0 }}
                                    layoutId={`mat-${m.id}`}
                                    className="relative max-w-2xl w-full bg-[#1a1a1a] rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <div className="h-96 w-full relative">
                                        <img src={m.image} className="w-full h-full object-cover" alt={m.name} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>
                                    <div className="p-8 -mt-20 relative z-10">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-4xl font-serif text-white mb-1">{m.name}</h3>
                                                <p className="text-primary uppercase tracking-widest text-sm font-bold">{m.type}</p>
                                            </div>
                                            <button onClick={() => setZoomedMaterial(null)} className="p-3 bg-white/10 rounded-full hover:bg-white/20 text-white backdrop-blur-md transition-colors">
                                                <X size={24} />
                                            </button>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            {m.desc}. Selected for its durability and premium texture.
                                            <br/><br/>
                                            <span className="text-gray-500 text-sm">Origin: Italy • Grade: A+ • Supplier: StoneCore Ltd.</span>
                                        </p>
                                    </div>
                                </MotionDiv>
                            ))}
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </div>
        );
    }
  };

  return (
    <MotionDiv 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-[#0f0f0f] z-[200] flex text-white font-sans"
    >
        <div className="w-20 md:w-64 bg-[#141414] border-r border-white/5 flex flex-col">
            <div className="p-6 flex items-center gap-3 mb-8">
                <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center font-bold text-white">I</div>
                <span className="font-serif text-xl font-bold hidden md:block">Interno <span className="text-xs font-sans font-normal opacity-50 block">Client Portal</span></span>
            </div>

            <nav className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar">
                {[
                    { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                    { id: 'blueprint', icon: Map, label: 'Blueprint' },
                    { id: 'budget', icon: PieChart, label: 'Budget' },
                    { id: 'approvals', icon: CheckSquare, label: 'Approvals' },
                    { id: 'documents', icon: FileText, label: 'Documents' },
                    { id: 'materials', icon: Palette, label: 'Materials' },
                ].map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as Tab)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                            activeTab === item.id 
                            ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                            : 'text-gray-500 hover:bg-white/5 hover:text-white'
                        }`}
                    >
                        <item.icon size={20} />
                        <span className="hidden md:block font-medium">{item.label}</span>
                        {item.id === 'approvals' && pendingCount > 0 && (
                            <span className="hidden md:flex ml-auto w-5 h-5 bg-red-500 rounded-full items-center justify-center text-[10px] font-bold text-white">
                                {pendingCount}
                            </span>
                        )}
                    </button>
                ))}
            </nav>

            <div className="p-4">
                <div className="bg-white/5 rounded-xl p-4 hidden md:block">
                    <div className="flex items-center gap-3 mb-2">
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary"></div>
                         <div>
                             <div className="text-sm font-bold">Demo Client</div>
                             <div className="text-xs text-gray-500">Penthouse Project</div>
                         </div>
                    </div>
                </div>
                <button 
                    onClick={onClose}
                    className="w-full mt-4 p-3 flex items-center justify-center gap-2 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                >
                    <XCircle size={20} /> <span className="hidden md:inline">Exit Demo</span>
                </button>
            </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden relative bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-transparent to-[#1a1a1a] opacity-90 pointer-events-none"></div>
            
            <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 relative z-10 bg-[#0f0f0f]/50 backdrop-blur-sm">
                <div>
                    <h2 className="text-2xl font-serif capitalize">{activeTab}</h2>
                    <p className="text-gray-500 text-xs">Project: NY Penthouse Renovation • ID: #8832-A</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-bold flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> Live Connection
                    </div>
                    <div className="w-px h-8 bg-white/10"></div>
                    <div className="text-right">
                        <div className="text-sm font-bold text-white">Oct 25, 2025</div>
                        <div className="text-xs text-gray-500">Deadline: Dec 15</div>
                    </div>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto p-8 relative z-10 custom-scrollbar">
                {renderContent()}
            </main>
        </div>
    </MotionDiv>
  );
};