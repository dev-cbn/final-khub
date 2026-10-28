import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, SlidersHorizontal } from 'lucide-react';
import styles from './RentalsPage.module.css';
import rental from './assets/rental.jpg';
import camera from './assets/camera.jpg';
import chair from './assets/chair.jpg';

const rentals = [
 {id:1,title:'Light-filled Lekki apartment',type:'Short stays',location:'Lekki Phase 1, Lagos',meta:'1 bedroom · 2 guests',price:65000,unit:'/ night',deposit:100000,image:rental},
 {id:2,title:'Mirrorless creator kit',type:'Equipment',location:'Yaba, Lagos',meta:'Camera + lens + battery',price:18000,unit:'/ day',deposit:80000,image:camera},
 {id:3,title:'Creative meeting studio',type:'Event spaces',location:'Victoria Island, Lagos',meta:'Up to 8 guests',price:35000,unit:'/ day',deposit:20000,image:rental},
 {id:4,title:'Camera kit · Abuja',type:'Equipment',location:'Wuse II, Abuja',meta:'Pickup available',price:20000,unit:'/ day',deposit:80000,image:camera},
 {id:5,title:'Lounge chair for an event',type:'Event spaces',location:'Lagos, Nigeria',meta:'Single item rental',price:12000,unit:'/ day',deposit:15000,image:chair},
];
const money = n => `₦${n.toLocaleString('en-NG')}`;
export default function RentalsPage({ onHome, onShop }) {
 const [location,setLocation]=useState('Lagos, Nigeria');
 const [start,setStart]=useState('2026-10-16');
 const [end,setEnd]=useState('2026-10-18');
 const [type,setType]=useState('All rentals');
 const [query,setQuery]=useState('');
 const [filters,setFilters]=useState(false);
 const [selected,setSelected]=useState(null);
 const [guests,setGuests]=useState('2 adults');
 const filtered=useMemo(()=>rentals.filter(r=>(type==='All rentals'||r.type===type)&&`${r.title} ${r.location} ${r.meta}`.toLowerCase().includes(query.toLowerCase())&&(location==='Anywhere'||r.location.toLowerCase().includes(location.split(',')[0].toLowerCase()))),[type,query,location]);
 const nights=Math.max(1,Math.ceil((new Date(end)-new Date(start))/86400000)||1);
 return <div className={styles.page}>
<main className={styles.main}><div className={styles.eyebrow}>03 / RENTALS / LISTINGS</div><h1>Own the moment. Rent the rest.</h1><p className={styles.subtitle}>Find a space, equipment or a little extra possibility.</p>
   <section className={styles.searchPanel}><label><MapPin size={16}/>Where?<input value={location} onChange={e=>setLocation(e.target.value)} placeholder="Lagos, Nigeria"/></label><label><CalendarDays size={16}/>Start date<input type="date" value={start} onChange={e=>setStart(e.target.value)}/></label><label><CalendarDays size={16}/>End date<input type="date" min={start} value={end} onChange={e=>setEnd(e.target.value)}/></label><button className={styles.primary} onClick={()=>setQuery('')}>Find available rentals</button></section>
   <div className={styles.categories}>{['All rentals','Short stays','Equipment','Event spaces','Vehicles'].map(c=><button key={c} className={type===c?styles.activeCategory:''} onClick={()=>setType(c)}>{c}</button>)}</div>
   <div className={styles.resultsBar}><span>{filtered.length*8} available rentals · {location} · {nights} {nights===1?'night':'nights'}</span><button onClick={()=>setFilters(v=>!v)}><SlidersHorizontal size={15}/> Filters & sort</button></div>
   {filters&&<div className={styles.filterPanel}><label>Search rentals<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Apartment, camera, studio..."/></label><button onClick={()=>{setType('All rentals');setQuery('');setLocation('Anywhere')}}>Clear filters</button></div>}
   <section className={styles.grid}>{filtered.map(r=><article className={styles.card} key={r.id}><div className={styles.photo}><img src={r.image} alt={r.title}/><span>Available to request</span></div><div className={styles.cardBody}><h2>{r.title}</h2><p>{r.location} · {r.meta}</p><small>Refundable deposit {money(r.deposit)}</small><strong>{money(r.price)} <em>{r.unit}</em></strong><div className={styles.links}><button onClick={()=>setSelected(r)}>View details <ArrowUpRight size={14}/></button><button onClick={()=>setSelected(r)}>Reserve dates</button></div></div></article>)}{filtered.length===0&&<div className={styles.empty}>No rentals found for those filters. Try a different location or category.</div>}</section>
   <div className={styles.note}>A deposit is not a fee. Refundability depends on the rental condition and agreed terms. Confirm availability before payment.</div>
  </main><footer className={styles.footer}><span>© KHUB · Privacy · Terms · Illustrative marketplace content</span><span>Trust & safety　/　Contact support</span></footer>
  {selected&&<div className={styles.overlay} onMouseDown={e=>{if(e.target===e.currentTarget)setSelected(null)}}><section className={styles.detail}><button className={styles.back} onClick={()=>setSelected(null)}><ArrowLeft size={16}/> Back to rentals</button><img src={selected.image} alt={selected.title}/><span className={styles.eyebrow}>RENTALS / DETAIL & AVAILABILITY</span><h2>{selected.title}</h2><p>{selected.location} · {selected.meta}</p><strong className={styles.detailPrice}>{money(selected.price)} {selected.unit}</strong><p>Refundable deposit: {money(selected.deposit)}. Confirm the listing terms and availability with the host before booking.</p><label className={styles.guestLabel}>Guests<select value={guests} onChange={e=>setGuests(e.target.value)}><option>1 adult</option><option>2 adults</option><option>3 adults</option><option>4 adults</option><option>5+ guests</option></select></label><p>{nights} nights/days estimate: <strong>{money(selected.price*nights)}</strong></p><button className={styles.primary} onClick={()=>window.alert('Demo only: reservation is not connected to a booking service yet.')}>Reserve dates</button></section></div>}
 </div>;
}
