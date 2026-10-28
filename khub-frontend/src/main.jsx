import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Search, ShoppingBag, CalendarDays, Sparkles, BriefcaseBusiness, CarFront, Package, ShieldCheck, ArrowUpRight, Heart, Menu, X, CheckCircle2, MapPin, ChevronRight, Mail, Phone, ArrowRight, SlidersHorizontal } from 'lucide-react';
import styles from './styles.module.css';
import hero from './assets/hero.jpg';
import chair from './assets/chair.jpg';
import headphones from './assets/headphones.jpg';
import lamp from './assets/lamp.jpg';
import camera from './assets/camera.jpg';
import rental from './assets/rental.jpg';
import service from './assets/service.jpg';
import DiscoverPage from './DiscoverPage.jsx';
import AccountPage from './AccountPage.jsx';
import ShopPage from './ShopPage.jsx';
import RentalsPage from './RentalsPage.jsx';
import SiteHeader from './SiteHeader.jsx';
import ServicesPage from './ServicesPage.jsx';

const products = [
  {id:1,name:'The Lekki lounge chair',category:'Advertised · Lekki, Lagos · New',seller:'Verified seller',price:'₦145,000',image:chair,kind:'Shop'},
  {id:2,name:'Wireless headphones',category:'Identity verified · Ikeja, Lagos · New',seller:'',price:'₦58,000',image:headphones,kind:'Shop'},
  {id:3,name:'Walnut bedside lamp',category:'Local maker · Wuse, Abuja · Handmade',seller:'',price:'₦32,000',image:lamp,kind:'Shop'},
  {id:4,name:'Camera kit for rent',category:'Rental · Yaba, Lagos · Dates available',seller:'',price:'₦18,000 / day',image:camera,kind:'Rent'},
];
const categories = [
 {name:'Shop',desc:'Home, tech & everyday finds',icon:ShoppingBag}, {name:'Rent',desc:'Spaces, equipment & occasions',icon:CalendarDays},
 {name:'Services',desc:'Skilled people. Great work.',icon:Sparkles}, {name:'Jobs',desc:'Your next move starts here',icon:BriefcaseBusiness},
 {name:'Rides',desc:'Get across your city',icon:CarFront}, {name:'Delivery',desc:'Send it, track it, relax',icon:Package},
];
function App(){
  const [page, setPage] = useState('home');
  const [saved,setSaved]=useState([]);
  const [activeCategory,setActiveCategory]=useState('All');
  const [search,setSearch]=useState('');
  const [mobileMenu,setMobileMenu]=useState(false);
  const [modal,setModal]=useState(null);
  const [toast,setToast]=useState('');
  const [submitted,setSubmitted]=useState(false);
 const filteredProducts=useMemo(()=>products.filter(p=>(activeCategory==='All'||activeCategory===p.kind||activeCategory==='Shop'&&p.kind==='Shop')&&(`${p.name} ${p.category}`.toLowerCase().includes(search.toLowerCase()))),[activeCategory,search]);
 const notify=(message)=>{setToast(message); window.setTimeout(()=>setToast(''),2600)};
 const goTo=(id)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMobileMenu(false)};
 const openModal=(title,description,action='Continue')=>{setSubmitted(false);setModal({title,description,action})};
 const toggleSaved=(id)=>setSaved(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
 const onSubmit=(e)=>{e.preventDefault();setSubmitted(true)};

 // Render Discover only after all hooks have been called.
 // Render pages only after all hooks have been called.
const navigate = (destination) => {
  if (destination === 'home') {
    setPage('home');
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  if (['discover', 'shop', 'rentals', 'services', 'account'].includes(destination))  {
    setPage(destination);
    setMobileMenu(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }
  setMobileMenu(false);
  if (page !== 'home') {
    setPage('home');
    window.setTimeout(() => document.getElementById(destination)?.scrollIntoView({ behavior: 'smooth' }), 80);
  } else {
    goTo(destination);
  }
};
const handleList = () => {
  setPage('home');
  openModal('List on KHUB', 'Tell us what you want to list and we’ll help you get started.', 'Start listing');
};

if (page === 'discover') {
  return <div className={styles.app}>
    <SiteHeader page={page} onNavigate={navigate} onList={handleList} />
    <DiscoverPage onHome={() => navigate('home')} onAccount={() => navigate('account')} />
  </div>;
}
if (page === 'shop') {
  return <div className={styles.app}>
    <SiteHeader page={page} onNavigate={navigate} onList={handleList} />
    <ShopPage onHome={() => navigate('home')} onRent={() => navigate('rentals')} />
  </div>;
}
if (page === 'rentals') {
  return <div className={styles.app}>
    <SiteHeader page={page} onNavigate={navigate} onList={handleList} />
    <RentalsPage onHome={() => navigate('home')} onShop={() => navigate('shop')} />
  </div>;
}

if (page === 'services') {
  return (
    <div className={styles.app}>
      <SiteHeader
        page={page}
        onNavigate={navigate}
        onList={handleList}
      />
      <ServicesPage />
    </div>
  );
}

if (page === 'account') {
  return <div className={styles.app}>
    <SiteHeader page={page} onNavigate={navigate} onList={handleList} />
    <AccountPage onHome={() => navigate('home')} />
  </div>;
}

 return <div className={styles.app}>
  <SiteHeader page={page} onNavigate={navigate} onList={handleList} />
  <main id="top">
   <section className={styles.hero} id="discover"><div className={styles.heroCopy}><span className={styles.eyebrow}>Made for your everyday</span><h1>A world of<br/>possibility.<br/>One local hub.</h1><p>Find the things, people and opportunities that move you forward. All in one trusted Nigerian marketplace.</p><div className={styles.actions}><button className={styles.primary} onClick={()=>goTo('finds')}>Explore KHUB</button><button className={styles.secondary} onClick={()=>openModal('Start selling on KHUB','Create a listing and connect with people looking for what you offer.','Get started')}>Start selling</button></div><small>Lagos · Abuja · Port Harcourt & beyond</small></div>
    <div className={styles.heroVisual}><img src={hero} alt="A Nigerian entrepreneur working from a plant-filled home workspace"/><div className={styles.imageCaption}>Local ambition. Everyday connection. <ArrowUpRight size={15}/></div></div></section>
   <section className={styles.trustStrip}><div><ShieldCheck/>Identity verification, clearly labelled</div><div><ShieldCheck/>Protected payments on eligible orders</div><div><ShieldCheck/>Local support, when you need it</div></section>
   <section className={styles.section} id="categories"><div className={styles.sectionHeading}><h2>What brings you here?</h2><p>Six ways to make your day work better.</p></div><div className={styles.categoryGrid}>{categories.map(({name,desc,icon:Icon})=><button className={`${styles.categoryCard} ${activeCategory===name?styles.categoryActive:''}`} key={name} onClick={()=>{setActiveCategory(activeCategory===name?'All':name);goTo('finds')}}><Icon size={20} strokeWidth={1.7}/><strong>{name}</strong><span>{desc}</span></button>)}</div></section>
   <section className={styles.section} id="finds"><div className={styles.sectionHeadingRow}><div className={styles.sectionHeading}><h2>Good finds, close to home</h2><p>Curated inventory from local sellers. Sponsored items are labelled Advertised.</p></div><div className={styles.searchBox}><Search size={16}/><input aria-label="Search listings" placeholder="Search finds" value={search} onChange={e=>setSearch(e.target.value)}/>{search&&<button onClick={()=>setSearch('')} aria-label="Clear search"><X size={14}/></button>}</div></div>
    <div className={styles.filterRow}><button className={activeCategory==='All'?styles.filterActive:styles.filter} onClick={()=>setActiveCategory('All')}>All finds</button>{['Shop','Rent'].map(c=><button key={c} className={activeCategory===c?styles.filterActive:styles.filter} onClick={()=>setActiveCategory(c)}>{c}</button>)}<span><SlidersHorizontal size={14}/> {filteredProducts.length} listings</span></div>
    <div className={styles.productGrid}>{filteredProducts.map(p=><article className={styles.productCard} key={p.id}><div className={styles.productImage}><img src={p.image} alt={p.name}/><button className={`${styles.saveButton} ${saved.includes(p.id)?styles.saved:''}`} onClick={()=>toggleSaved(p.id)} aria-label={saved.includes(p.id)?`Unsave ${p.name}`:`Save ${p.name}`}><Heart size={17} fill={saved.includes(p.id)?'currentColor':'none'}/></button></div><div className={styles.productInfo}><h3>{p.name}</h3><p>{p.category}</p>{p.seller&&<p>{p.seller}</p>}<strong>{p.price}</strong><div className={styles.productLinks}><button onClick={()=>openModal(p.name,`${p.price} · ${p.category}. Contact the seller to ask about availability and delivery.`,'Contact seller')}>View details <ArrowUpRight size={13}/></button><button onClick={()=>toggleSaved(p.id)}><Heart size={13} fill={saved.includes(p.id)?'currentColor':'none'}/>{saved.includes(p.id)?'Saved':'Save'}</button></div></div></article>)}{filteredProducts.length===0&&<div className={styles.emptyState}>No listings match that search. Try a different keyword or <button onClick={()=>{setSearch('');setActiveCategory('All')}}>show all finds</button>.</div>}</div>
   </section>
   <section className={styles.section} id="rent"><div className={styles.sectionHeading}><h2>Space for what’s next</h2><p>From a weekend stay to the tools for your next big idea.</p></div><div className={styles.featureRow}><img className={styles.featureImage} src={rental} alt="A sunlit contemporary apartment with a comfortable living room"/><div className={styles.featurePanel}><span className={styles.tag}>Rental · Lekki, Lagos</span><h3>A light-filled place to pause.</h3><p>Furnished one-bedroom apartment. Wi-Fi, workspace and flexible short stays.</p><strong className={styles.priceLarge}>₦65,000 / night</strong><small>Refundable deposit ₦100,000 · Fees shown before booking</small><button className={styles.primary} onClick={()=>openModal('Explore rentals','Choose your destination and dates to discover available spaces.','Search rentals')}>Explore rentals</button></div></div></section>
   <section className={styles.section} id="services"><div className={styles.sectionHeading}><h2>Expertise, a conversation away</h2><p>Find a provider who understands the work you want to do.</p></div><div className={`${styles.featureRow} ${styles.reverseOnMobile}`}><img className={styles.featureImage} src={service} alt="A creative professional working on a design project"/><div className={styles.featurePanel}><span className={styles.tag}>Creative services</span><h3>Brand identity by Ada Studio</h3><p>Logos, visual systems and launch-ready assets for growing Nigerian businesses.</p><strong className={styles.priceLarge}>From ₦45,000</strong><small>★ 4.9 · 28 illustrative reviews · Identity verified</small><button className={styles.primary} onClick={()=>openModal('Find your expert','Describe your project and we’ll help you find a relevant local service provider.','Find an expert')}>Find your expert</button></div></div></section>
   <section className={styles.section} id="jobs"><div className={styles.sectionHeading}><h2>Find your next opportunity</h2><p>Explore work with clear terms, pay and location.</p></div><div className={styles.jobGrid}><JobCard title="Product designer" company="Cedar Digital · Lagos" type="Full-time · Hybrid" salary="₦450,000–₦650,000 / month" note="Health cover · Portfolio required" onClick={()=>openModal('Product designer','Cedar Digital · Lagos · Full-time, hybrid. Health cover and portfolio required.','Explore job')}/><JobCard title="Operations coordinator" company="Riverline Commerce · Abuja" type="Full-time · On-site" salary="₦250,000–₦350,000 / month" note="Monday–Friday · 2+ years experience" onClick={()=>openModal('Operations coordinator','Riverline Commerce · Abuja · Full-time, on-site. Monday–Friday, 2+ years experience.','View opportunity')}/></div></section>
   <section className={styles.section} id="city"><div className={styles.sectionHeading}><h2>Your city. A little closer.</h2><p>Book a ride or get a parcel moving, with clear upfront estimates.</p></div><div className={styles.cityGrid}><div className={styles.cityCard}><CarFront size={23}/><h3>Get there with confidence</h3><p>Choose your pickup, compare vehicles and see the estimated fare before you request.</p><button className={styles.primary} onClick={()=>openModal('Book a ride','Add your pickup and destination to get started.','Continue to ride')}>Book a ride</button></div><div className={styles.cityCard}><Package size={23}/><h3>Send a little possibility</h3><p>Door-to-door local delivery with driver updates and a trackable timeline.</p><button className={styles.primary} onClick={()=>openModal('Send a parcel','Tell us where the parcel is going and what you need delivered.','Send a parcel')}>Send a parcel</button></div></div></section>
   <section className={styles.section}><div className={styles.sectionHeading}><h2>A marketplace built on clarity</h2><p>Confidence comes from knowing what to expect.</p></div><div className={styles.clarityGrid}>{[{title:'Know who you’re dealing with',text:'Identity checks are labelled. They do not guarantee inventory quality.'},{title:'Keep payment on KHUB',text:'Eligible payments have dispute support. Never share an OTP or pay an unknown personal account.'},{title:'Speak up, stay safe',text:'Report a listing, block a contact or reach support from every transaction.'}].map((item)=><div className={styles.clarityCard} key={item.title}><ShieldCheck size={20}/><h3>{item.title}</h3><p>{item.text}</p></div>)}</div></section>
   <section className={styles.referral}><div><h2>Better together.<br/>Bring your people to KHUB.</h2><p>Invite friends and earn ₦1,000 when an eligible first order is completed. Terms and reward limits apply.</p><button className={styles.lightButton} onClick={()=>openModal('Invite your people','Share your email to prepare a referral invite for friends and family.','Prepare invite')}>Explore referrals</button><small>For the makers, the movers and everyone building what’s next.</small></div></section>
  </main>
  <footer className={styles.footer}><div className={styles.footerTop}><div className={styles.footerBrand}><a className={styles.logo} href="#top">KHUB</a><p>Your everyday, connected.</p></div><div><h4>Explore</h4><button onClick={()=>goTo('finds')}>Shop · Rentals · Services</button><button onClick={()=>goTo('jobs')}>Jobs · Rides · Delivery</button></div><div><h4>For business</h4><button onClick={()=>openModal('Sell on KHUB','Reach customers looking for your products and services.','Start selling')}>Sell on KHUB · Offer services</button><button onClick={()=>goTo('jobs')}>Post a job · Drive with us</button></div><div><h4>Here to help</h4><button onClick={()=>openModal('Help centre','Tell us what you need help with and our support team can guide you.','Contact support')}>Help centre · Trust & safety</button><button onClick={()=>openModal('Privacy and terms','Review marketplace privacy, terms and accessibility information.','Continue')}>Privacy · Terms · Accessibility</button></div></div><div className={styles.footerBottom}>© KHUB · Nigeria · English · NGN · All business data shown in this design is illustrative.</div></footer>
  {toast&&<div className={styles.toast}><CheckCircle2 size={17}/>{toast}</div>}
  {modal&&<div className={styles.modalBackdrop} role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setModal(null)}}><section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className={styles.modalClose} onClick={()=>setModal(null)} aria-label="Close dialog"><X size={19}/></button>{submitted?<div className={styles.modalSuccess}><CheckCircle2 size={34}/><h2>Thanks — you’re on your way.</h2><p>This demo has recorded your interaction locally. No information was sent to a server.</p><button className={styles.primary} onClick={()=>setModal(null)}>Done</button></div>:<><span className={styles.tag}>KHUB · Local marketplace</span><h2 id="modal-title">{modal.title}</h2><p>{modal.description}</p><form onSubmit={onSubmit}><label>Your name<input required placeholder="Enter your name"/></label><label>Email or phone<input required placeholder="you@example.com or phone number"/></label><label>More details <textarea placeholder="Share a few details (optional)" rows="3"/></label><button className={styles.primary} type="submit">{modal.action} <ArrowRight size={15}/></button><small>Demo interface only. Submitting will not send your details anywhere.</small></form></>}</section></div>}
 </div>
}
function JobCard({title,company,type,salary,note,onClick}){return <article className={styles.jobCard}><h3>{title}</h3><span className={styles.tag}>{type}</span><p>{company}</p><strong>{salary}</strong><small>{note}</small><button className={styles.outlineButton} onClick={onClick}>Explore role <ChevronRight size={14}/></button></article>}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
