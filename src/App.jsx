import { useEffect, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Asterisk, Menu, X, MoveUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LivingScene from './components/LivingScene.jsx';

gsap.registerPlugin(ScrollTrigger);
const projects = [
  { id: '01', name: 'THE CANOPY HOUSE', type: 'Residential / Costa Rica', year: '2026', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85', tone: 'Canopy House lets the forest move through the architecture rather than stopping at its edge.' },
  { id: '02', name: 'MOSS / COMMONS', type: 'Cultural / Copenhagen', year: '2025', image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85', tone: 'A public room shaped by daylight, reclaimed stone, and a slower relationship with the city.' },
  { id: '03', name: 'AFTER THE RAIN', type: 'Landscape / Kyoto', year: '2025', image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=85', tone: 'A quiet sequence of water, native planting, and paths that reveal themselves gradually.' }
];
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-kicker, .hero-title-line, .hero-bottom', { y: 28, opacity: 0, duration: 1.05, stagger: 0.12, ease: 'power3.out', delay: 0.18 });
      gsap.utils.toArray('[data-reveal]').forEach((el) => gsap.from(el, { y: 42, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 84%', once: true } }));
      gsap.to('.hero-orbit-note', { y: -12, duration: 3.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });
    return () => ctx.revert();
  }, []);
  useEffect(() => { document.body.style.overflow = menuOpen || activeProject ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [menuOpen, activeProject]);
  const goTo = (id) => { setMenuOpen(false); document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' }); };
  return <>
    <header className="topbar"><a href="#top" className="wordmark" aria-label="FERAL home">FERAL<span>®</span></a><div className="topbar-center"><span className="status-dot"/> INDEPENDENT DESIGN PRACTICE <span className="topbar-sep">/</span> EST. 2019</div><button className="menu-trigger" onClick={() => setMenuOpen(true)} aria-label="Open navigation">MENU <Menu size={17}/></button></header>
    <main id="top">
      <section className="hero">
        <div className="hero-grid"><div className="hero-copy"><p className="eyebrow hero-kicker"><span>01 — 04</span> ARCHITECTURE / LANDSCAPE / OBJECTS</p><h1><span className="hero-title-line">LET THE</span><span className="hero-title-line italic">WILD</span><span className="hero-title-line">IN<span className="period">.</span></span></h1><p className="hero-intro">We design spaces that make room for the living world. Architecture with softer edges, deeper roots, and a little less certainty.</p><button className="text-link hero-link" onClick={() => goTo('#work')}>EXPLORE OUR WORLD <ArrowDownRight size={18}/></button></div>
          <div className="hero-art"><div className="art-index">FIG. 001 <span>—</span> A STUDY IN COEXISTENCE</div><LivingScene/><div className="hero-orbit-note"><span className="tiny-cross">✳</span><span>FORM FOLLOWS<br/>FEELING</span></div><div className="art-caption"><span>BIOMORPHIC STUDY No. 04</span><span>51°30'26.4"N<br/>00°07'39.0"W</span></div></div>
        </div><div className="hero-bottom"><span>SCROLL TO FEEL SOMETHING</span><span className="scroll-line"/><span>SCROLL / 001</span></div>
        <div className="side-index">DESIGNING WITH NATURE, NOT AGAINST IT</div>
      </section>
      <section className="manifesto" id="approach"><div className="section-meta" data-reveal><span>02 / OUR POINT OF VIEW</span><span>LESS CONTROL. MORE CONNECTION.</span></div><div className="manifesto-body"><p className="manifesto-label" data-reveal><Asterisk size={20}/> A DIFFERENT KIND OF PRACTICE</p><h2 data-reveal>We don't believe in building <em>over</em> nature. We believe in building <span className="highlight">alongside it.</span></h2><div className="manifesto-foot" data-reveal><p>FERAL is an independent architecture and creative practice exploring the space between the built and the grown. We work with living systems, honest materials, and the beautiful unpredictability of the natural world.</p><a className="circle-link" href="#principles" aria-label="Explore our principles"><ArrowDownRight/></a></div></div></section>
      <section className="principles" id="principles"><div className="principle-image" data-reveal><img src="https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=85" alt="Sculptural modern architecture framed by trees"/><span className="image-label">MATERIAL STUDY / 03</span></div><div className="principle-content" data-reveal><p className="eyebrow">03 — OUR APPROACH</p><h2>Built to<br/><em>belong.</em></h2><p className="principle-copy">Every site has a pulse. A wind direction. A history beneath the soil. We start by listening, then design from what is already there.</p><div className="principle-list"><div><span>01</span><strong>LISTEN TO THE LAND</strong><span>Read the existing story.</span></div><div><span>02</span><strong>WORK WITH TIME</strong><span>Let materials age honestly.</span></div><div><span>03</span><strong>LEAVE ROOM TO GROW</strong><span>Design for what comes next.</span></div></div><a href="#work" className="text-link">OUR DESIGN PHILOSOPHY <ArrowUpRight size={17}/></a></div></section>
      <section className="work" id="work"><div className="work-heading" data-reveal><div><p className="eyebrow">04 — SELECTED WORLDS</p><h2>Made of <em>place.</em></h2></div><p>Each project begins with a question, not a signature style.</p></div><div className="project-grid">{projects.map((p, i) => <button className={`project-card project-${i+1}`} key={p.id} onClick={() => setActiveProject(p)} data-reveal><div className="project-image"><img src={p.image} alt="" loading="lazy"/><span className="project-open"><ArrowUpRight/></span><span className="project-number">{p.id}</span></div><div className="project-info"><div><h3>{p.name}</h3><p>{p.type}</p></div><span>{p.year}</span></div></button>)}</div><div className="work-footer"><span>THOUGHTFULLY MADE. NEVER FINISHED.</span><span>3 SELECTED STUDIES <Asterisk size={14}/></span></div></section>
      <section className="closing" id="contact"><div className="closing-top"><span>HAVE A PLACE IN MIND?</span><span>WE'RE ALL EARS. AND ROOTS.</span></div><h2 data-reveal>Let's grow<br/><em>something</em><br/>together<span className="period">.</span></h2><a className="contact-link" href="mailto:hello@feral.studio">TELL US ABOUT IT <ArrowUpRight/></a><div className="closing-graphic" aria-hidden="true"><span/><span/><span/><span/><span/></div><div className="footer"><a href="#top" className="wordmark">FERAL<span>®</span></a><span>INDEPENDENT BY NATURE.</span><span>© FERAL STUDIO 2026</span><a href="#top">BACK TO TOP ↑</a></div></section>
    </main>
    {menuOpen && <div className="menu-overlay"><div className="menu-top"><a href="#top" className="wordmark" onClick={() => setMenuOpen(false)}>FERAL<span>®</span></a><button onClick={() => setMenuOpen(false)} aria-label="Close navigation"><X/></button></div><nav><button onClick={() => goTo('#approach')}>01 <span>POINT OF VIEW</span><ArrowUpRight/></button><button onClick={() => goTo('#principles')}>02 <span>OUR APPROACH</span><ArrowUpRight/></button><button onClick={() => goTo('#work')}>03 <span>SELECTED WORLDS</span><ArrowUpRight/></button><button onClick={() => goTo('#contact')}>04 <span>CONTACT</span><ArrowUpRight/></button></nav><p>GOOD DESIGN SHOULD FEEL ALIVE.</p></div>}
    {activeProject && <div className="project-modal" role="dialog" aria-modal="true" aria-label={activeProject.name} onClick={() => setActiveProject(null)}><button className="modal-close" onClick={() => setActiveProject(null)} aria-label="Close project"><X/></button><div className="modal-content" onClick={e => e.stopPropagation()}><img src={activeProject.image} alt=""/><p className="eyebrow">{activeProject.id} / {activeProject.type}</p><h2>{activeProject.name}</h2><p>{activeProject.tone}</p><span className="modal-year">CONCEPT STUDY — {activeProject.year}</span></div></div>}
  </>;
}
