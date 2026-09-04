import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, MapPin, Download, ExternalLink, Code2, Database, Layers, TrendingUp, Award, Briefcase, Calendar, Star, CheckCircle2, Zap, Target, Users, Coffee } from 'lucide-react';

// Global Styles Component
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');
      
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      
      html {
        scroll-behavior: smooth;
      }
      
      html, body, #root {
        background: #0C0C0C;
        font-family: 'Kanit', sans-serif;
      }
      
      .hero-heading {
        background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .gradient-accent {
        background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .gradient-bg {
        background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%);
      }

      /* Scroll Progress Bar */
      .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #B600A8, #7621B0, #BE4C00);
        transform-origin: 0%;
        z-index: 9999;
      }

      /* Smooth scrolling */
      section {
        scroll-margin-top: 80px;
      }

      html.custom-cursor, html.custom-cursor body, html.custom-cursor a, html.custom-cursor button {
        cursor: none;
      }

      .nav-link {
        position: relative;
      }

      .nav-link::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -4px;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #B600A8, #BE4C00);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .nav-link:hover::after {
        transform: scaleX(1);
      }

      .shine-btn {
        position: relative;
        overflow: hidden;
      }

      .shine-btn::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.28) 50%, transparent 70%);
        transform: translateX(-120%);
        transition: transform 0.7s ease;
      }

      .shine-btn:hover::before {
        transform: translateX(120%);
      }

      @keyframes float-orb {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
        50% { transform: translate3d(18px, -24px, 0) scale(1.08); }
      }

      @keyframes marquee-left {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }

      @keyframes marquee-right {
        from { transform: translateX(-50%); }
        to { transform: translateX(0); }
      }

      @keyframes shimmer-bar {
        0% { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }

      .skill-fill {
        background-size: 200% 100%;
        background-image: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%),
          linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
        animation: shimmer-bar 2.4s ease-in-out infinite;
      }

      .marquee-track {
        display: flex;
        gap: 1rem;
        width: max-content;
        animation: marquee-left 42s linear infinite;
      }

      .marquee-track.reverse {
        animation-name: marquee-right;
      }

      .marquee-row:hover .marquee-track {
        animation-play-state: paused;
      }

      .glow-card {
        transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.35s ease;
      }

      .glow-card:hover {
        box-shadow: 0 12px 40px rgba(182, 0, 168, 0.18);
      }

      .img-reveal {
        overflow: hidden;
      }

      .img-reveal img {
        transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
      }

      .img-reveal:hover img {
        transform: scale(1.06);
      }

      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        .marquee-track, .skill-fill, .shine-btn::before {
          animation: none !important;
        }
        * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);
  return null;
};

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const usePrefersReducedMotion = () => {
  const reduced = useReducedMotion();
  return !!reduced;
};

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return <motion.div className="scroll-progress" style={{ scaleX }} />;
};

const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 380, damping: 32 });
  const springY = useSpring(y, { stiffness: 380, damping: 32 });
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setHovering(!!el.closest('a, button, [data-cursor="hover"]'));
    };
    const leave = () => setVisible(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    document.addEventListener('mouseleave', leave);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
    };
  }, [reduced, x, y]);

  useEffect(() => {
    if (reduced || window.matchMedia('(pointer: coarse)').matches) return;
    document.documentElement.classList.add('custom-cursor');
    return () => document.documentElement.classList.remove('custom-cursor');
  }, [reduced]);

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[10000] mix-blend-difference hidden md:block"
      style={{ x: springX, y: springY, opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="rounded-full border border-white"
        animate={{
          width: hovering ? 44 : 16,
          height: hovering ? 44 : 16,
          x: hovering ? -22 : -8,
          y: hovering ? -22 : -8,
          backgroundColor: hovering ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.85)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      />
    </motion.div>
  );
};

const CountUp: React.FC<{ value: string; className?: string; style?: React.CSSProperties }> = ({ value, className, style }) => {
  const reduced = usePrefersReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : value;
  const [n, setN] = useState(reduced ? target : 0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const start = performance.now();
      const dur = 1100;
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        setN(Math.round(target * eased));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, target]);

  return (
    <div ref={ref} className={className} style={style}>
      {match ? `${n}${suffix}` : value}
    </div>
  );
};

const TiltCard: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: 800 }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
};

// Typing Animation Component
const TypingAnimation: React.FC<{ texts: string[] }> = ({ texts }) => {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(currentText.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, textIndex, isDeleting, texts]);

  return (
    <span className="gradient-accent font-bold">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// FadeIn Component
const FadeIn: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  element?: string;
}> = ({ children, delay = 0, duration = 0.55, x = 0, y = 24, element = 'div' }) => {
  const MotionComponent = motion.create(element as any);
  const reduced = usePrefersReducedMotion();

  return (
    <MotionComponent
      initial={reduced ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px', amount: 0.15 }}
      transition={{
        duration: reduced ? 0 : duration,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </MotionComponent>
  );
};

// Magnet Component
const Magnet: React.FC<{
  children: React.ReactNode;
  padding?: number;
  strength?: number;
}> = ({ children, padding = 150, strength = 3 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const edgeDistance = Math.min(
        Math.abs(e.clientX - rect.left),
        Math.abs(e.clientX - rect.right),
        Math.abs(e.clientY - rect.top),
        Math.abs(e.clientY - rect.bottom)
      );

      if (edgeDistance <= padding) {
        setIsActive(true);
        const translateX = deltaX / strength;
        const translateY = deltaY / strength;
        element.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
      } else {
        setIsActive(false);
        element.style.transform = 'translate3d(0, 0, 0)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      style={{
        willChange: 'transform',
        transition: isActive ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out',
      }}
    >
      {children}
    </div>
  );
};

const AnimatedText: React.FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const words = text.split(' ');

  return (
    <p className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.32em]"
          initial={{ opacity: 0.2, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: Math.min(i * 0.02, 0.6), duration: 0.4, ease: EASE }}
        >
          {word}
        </motion.span>
      ))}
    </p>
  );
};

// Contact Button
const ContactButton: React.FC = () => {
  return (
    <motion.a
      href="mailto:raj88anshu@gmail.com"
      className="shine-btn rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base text-white font-medium uppercase tracking-widest inline-block"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      Contact Me
    </motion.a>
  );
};

// Download Resume Button
const DownloadResumeButton: React.FC = () => {
  return (
    <motion.a
      href="/Aryan_Raj_Resume.pdf"
      download
      className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-xs sm:text-sm md:text-base hover:bg-[#D7E2EA]/10 inline-flex items-center gap-3"
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
    >
      <Download size={20} />
      Resume
    </motion.a>
  );
};

// Hero Section
const HeroSection: React.FC = () => {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="min-h-screen flex flex-col relative" style={{ overflowX: 'clip' }}>
      {!reduced && (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute top-[18%] left-[8%] h-56 w-56 rounded-full blur-3xl opacity-40"
            style={{ background: 'radial-gradient(circle, #B600A8 0%, transparent 70%)', animation: 'float-orb 8s ease-in-out infinite' }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[22%] right-[10%] h-64 w-64 rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, #7621B0 0%, transparent 70%)', animation: 'float-orb 10s ease-in-out infinite reverse' }}
          />
        </>
      )}
      {/* Navbar */}
      <FadeIn delay={0} y={-20}>
        <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
          <motion.div 
            className="text-2xl font-black gradient-accent"
            whileHover={{ scale: 1.05 }}
          >
            AR
          </motion.div>
          <div className="flex gap-6 md:gap-8">
            {['About', 'Experience', 'Skills', 'Projects', 'Contact'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="nav-link text-[#D7E2EA] font-medium uppercase tracking-wider text-xs md:text-sm hover:text-[#B600A8] transition-colors duration-200"
              >
                {link}
              </a>
            ))}
          </div>
        </nav>
      </FadeIn>

      {/* Hero Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 md:px-10 text-center">
        <FadeIn delay={0.12} y={24}>
          <motion.div
            className="relative mb-8"
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div
              className="absolute -inset-1 rounded-full opacity-80 blur-md"
              style={{ background: 'linear-gradient(123deg, #B600A8, #7621B0, #BE4C00)' }}
            />
            <img
              src="/images/hero-avatar.webp"
              alt="Aryan Raj"
              className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-full object-cover border-4 border-[#0C0C0C]"
            />
          </motion.div>
        </FadeIn>

        <FadeIn delay={0.2} y={30}>
          <p className="text-[#D7E2EA]/70 text-sm md:text-base mb-4 uppercase tracking-widest">
            Welcome to my portfolio
          </p>
        </FadeIn>

        <FadeIn delay={0.3} y={40}>
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none mb-6" style={{ fontSize: 'clamp(3rem, 12vw, 120px)' }}>
            {'Aryan Raj'.split(' ').map((word, wi) => (
              <span key={word} className="inline-block" style={{ marginRight: wi === 0 ? '0.28em' : 0 }}>
                {word.split('').map((char, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    className="inline-block"
                    initial={reduced ? false : { opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 + (wi * word.length + i) * 0.04, duration: 0.45, ease: EASE }}
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </FadeIn>

        <FadeIn delay={0.4} y={30}>
          <div className="text-2xl md:text-4xl text-[#D7E2EA] mb-4">
            I'm a <TypingAnimation texts={['Full Stack Developer', 'MERN Stack Expert', 'Problem Solver', 'Tech Enthusiast']} />
          </div>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <p className="text-[#D7E2EA]/80 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
            Passionate BCA student specializing in building exceptional digital experiences.
            Currently crafting innovative solutions with React, Node.js, and MongoDB.
          </p>
        </FadeIn>

        <FadeIn delay={0.6} y={20}>
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <ContactButton />
            <DownloadResumeButton />
          </div>
        </FadeIn>

        <FadeIn delay={0.7} y={20}>
          <div className="flex gap-6">
            {[
              { icon: Github, href: 'https://github.com/Anshu052', label: 'GitHub' },
              { icon: Linkedin, href: 'https://linkedin.com/in/aryan-raj88', label: 'LinkedIn' },
              { icon: Mail, href: 'mailto:raj88anshu@gmail.com', label: 'Email' },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.label !== 'Email' ? '_blank' : undefined}
                rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
                className="p-3 rounded-full bg-[#D7E2EA]/10 text-[#D7E2EA] hover:bg-[#B600A8] hover:text-white transition-colors"
                whileHover={{ scale: 1.12, y: -3 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </div>
        </FadeIn>
      </div>

      {/* Scroll Indicator */}
      <FadeIn delay={0.8} y={20}>
        <div className="pb-8 flex flex-col items-center gap-2">
          <p className="text-[#D7E2EA]/50 text-xs uppercase tracking-widest">Scroll Down</p>
          <motion.div
            animate={reduced ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 rounded-full border-2 border-[#D7E2EA]/30 flex items-start justify-center p-2"
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-[#B600A8]"
              animate={reduced ? undefined : { y: [0, 12, 0], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </div>
      </FadeIn>
    </section>
  );
};

// Achievement Badges Section
const AchievementBadges: React.FC = () => {
  const achievements = [
    { icon: Zap, text: '4+ Months Experience', color: '#B600A8' },
    { icon: Code2, text: '10+ Projects Built', color: '#7621B0' },
    { icon: Award, text: '6 Certifications', color: '#BE4C00' },
    { icon: Target, text: '100% Dedication', color: '#B600A8' },
  ];

  return (
    <section className="bg-[#0C0C0C] py-16 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {achievements.map((achievement, i) => (
          <FadeIn key={i} delay={i * 0.08} y={24}>
            <motion.div
              data-cursor="hover"
              className="glow-card relative p-6 rounded-2xl bg-gradient-to-br from-[#D7E2EA]/5 to-transparent border border-[#D7E2EA]/10 hover:border-[#B600A8]/50 text-center group"
              whileHover={{ scale: 1.04, y: -6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#B600A8]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              <achievement.icon 
                className="w-10 h-10 mx-auto mb-3 transition-transform group-hover:scale-110" 
                style={{ color: achievement.color }}
              />
              <p className="text-[#D7E2EA] text-sm font-medium relative z-10">{achievement.text}</p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

// Stats Section with Animation
const StatsSection: React.FC = () => {
  const stats = [
    { number: '4+', label: 'Months Experience', icon: Briefcase, color: '#B600A8' },
    { number: '10+', label: 'Projects Completed', icon: Code2, color: '#7621B0' },
    { number: '6', label: 'Certifications', icon: Award, color: '#BE4C00' },
    { number: '100%', label: 'Client Satisfaction', icon: TrendingUp, color: '#B600A8' },
  ];

  return (
    <section className="bg-[#0C0C0C] py-20 px-5 sm:px-8 md:px-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="text-center text-3xl md:text-5xl font-bold text-[#D7E2EA] mb-4">
            My Impact <span className="gradient-accent">in Numbers</span>
          </h2>
          <p className="text-center text-[#D7E2EA]/70 mb-16 max-w-2xl mx-auto">
            Transforming ideas into reality through code and dedication
          </p>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <FadeIn key={i} delay={i * 0.1} y={24}>
              <motion.div
                data-cursor="hover"
                className="glow-card text-center p-8 rounded-3xl bg-gradient-to-br from-[#B600A8]/5 to-[#7621B0]/5 border border-[#D7E2EA]/10 hover:border-[#B600A8]/50 relative overflow-hidden group"
                whileHover={{ scale: 1.04, y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#B600A8]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <stat.icon className="w-12 h-12 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: stat.color }} />
                <CountUp
                  value={stat.number}
                  className="text-5xl md:text-6xl font-black mb-3 relative z-10"
                  style={{ color: stat.color }}
                />
                <p className="text-[#D7E2EA]/80 text-sm font-medium uppercase tracking-wide relative z-10">
                  {stat.label}
                </p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// Experience Timeline
const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="bg-[#0C0C0C] py-20 sm:py-24 md:py-32 px-5 sm:px-8 md:px-10">
      <FadeIn delay={0} y={40}>
        <h2 className="hero-heading font-black uppercase text-center mb-6" style={{ fontSize: 'clamp(3rem, 10vw, 100px)' }}>
          Experience
        </h2>
        <p className="text-center text-[#D7E2EA]/70 mb-16 max-w-2xl mx-auto text-lg">
          Building real-world solutions and gaining hands-on expertise
        </p>
      </FadeIn>

      <div className="max-w-4xl mx-auto">
        <FadeIn delay={0.2} y={40}>
          <motion.div
            className="relative pl-12 border-l-4 border-[#B600A8] pb-12"
            whileHover={{ borderColor: '#7621B0' }}
          >
            {/* Timeline Dot */}
            <motion.div
              className="absolute left-0 top-0 w-6 h-6 -translate-x-[13px] rounded-full bg-[#B600A8] border-4 border-[#0C0C0C]"
              whileHover={{ scale: 1.3 }}
            />

            <div className="glow-card bg-gradient-to-br from-[#D7E2EA]/5 to-transparent border border-[#D7E2EA]/20 rounded-3xl p-8 hover:border-[#B600A8]/50">
              <div className="flex items-center gap-3 text-[#B600A8] mb-4">
                <Calendar size={20} />
                <span className="text-sm font-semibold uppercase tracking-wider">Aug 2025 - Nov 2025 (4 months)</span>
              </div>

              <h3 className="text-3xl md:text-4xl font-black text-[#D7E2EA] mb-3">
                Full Stack Web Developer <span className="gradient-accent">Intern</span>
              </h3>
              
              <div className="flex items-center gap-3 mb-6">
                <Briefcase size={20} className="text-[#B600A8]" />
                <p className="text-xl text-[#D7E2EA]/80">Zidio Development • Bangalore, India</p>
              </div>

              <div className="space-y-4 mb-6">
                {[
                  'Analyzed application data and identified performance bottlenecks, improving system efficiency by 25%',
                  'Collaborated with cross-functional teams in Agile sprints to deliver high-quality features',
                  'Conducted comprehensive testing (unit, integration, E2E) before production deployment',
                  'Built full-stack applications using MERN stack (MongoDB, Express.js, React, Node.js)',
                  'Implemented RESTful APIs and integrated third-party services',
                  'Fixed critical bugs in both frontend and backend, improving app stability by 30%',
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-4 text-[#D7E2EA]/90 leading-relaxed"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <CheckCircle2 size={20} className="text-[#B600A8] mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                {['React', 'Node.js', 'Express', 'MongoDB', 'JavaScript', 'TypeScript', 'Git', 'REST APIs', 'Agile'].map((tech) => (
                  <motion.span
                    key={tech}
                    className="px-4 py-2 text-sm bg-[#B600A8]/20 text-[#D7E2EA] rounded-full border border-[#B600A8]/40 font-medium"
                    whileHover={{ scale: 1.1, backgroundColor: 'rgba(182, 0, 168, 0.3)' }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </FadeIn>
      </div>
    </section>
  );
};

// Marquee Section
const MarqueeSection: React.FC = () => {
  const images1 = [
    'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
    'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
    'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
    'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
    'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
    'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
    'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
    'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
    'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
    'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
    'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  ];

  const images2 = [
    'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
    'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
    'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
    'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
    'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
    'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
    'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
    'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
    'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
    'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
  ];

  const Row: React.FC<{ images: string[]; reverse?: boolean }> = ({ images, reverse }) => (
    <div className="marquee-row overflow-hidden">
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`}>
        {[...images, ...images].map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            className="rounded-2xl object-cover"
            style={{ width: '420px', height: '270px', flexShrink: 0 }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-[#0C0C0C] pt-20 pb-10">
      <FadeIn delay={0} y={24}>
        <h3 className="text-center text-2xl md:text-3xl font-bold text-[#D7E2EA] mb-12">
          Inspired by <span className="gradient-accent">Modern Design</span>
        </h3>
      </FadeIn>
      <div className="flex flex-col gap-4">
        <Row images={images1} />
        <Row images={images2} reverse />
      </div>
    </div>
  );
};

// About Section
const AboutSection: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 relative">
      {/* Decorative elements with parallax */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9}>
        <motion.img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png"
          alt=""
          className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
          whileHover={{ rotate: 360, scale: 1.2 }}
          transition={{ duration: 1 }}
        />
      </FadeIn>
      
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9}>
        <motion.img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png"
          alt=""
          className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]"
          whileHover={{ y: -20, rotate: -15 }}
        />
      </FadeIn>
      
      <FadeIn delay={0.15} x={80} y={0} duration={0.9}>
        <motion.img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png"
          alt=""
          className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
          whileHover={{ rotate: -360, scale: 1.2 }}
          transition={{ duration: 1 }}
        />
      </FadeIn>
      
      <FadeIn delay={0.3} x={80} y={0} duration={0.9}>
        <motion.img
          src="https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png"
          alt=""
          className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]"
          whileHover={{ y: -20, rotate: 15 }}
        />
      </FadeIn>

      <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16 relative z-10">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 140px)' }}>
            About me
          </h2>
        </FadeIn>

        <div className="flex flex-col items-center gap-12">
          <AnimatedText
            text="I'm a passionate BCA student and Full Stack Developer specializing in the MERN stack. My journey in technology is fueled by an insatiable curiosity and a commitment to creating impactful digital solutions. From building sophisticated data analytics platforms to reverse-engineering complex AI interfaces, I embrace challenges that expand my technical horizons. With industry-recognized certifications from Microsoft, IBM, and AWS, I continuously evolve my skill set to remain at the forefront of modern web development."
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[800px] text-lg"
          />
          
          {/* Quick Facts */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
            {[
              { icon: Coffee, label: 'Always Learning', value: '24/7' },
              { icon: Users, label: 'Team Player', value: 'Collaborative' },
              { icon: Target, label: 'Goal Oriented', value: 'Driven' },
            ].map((fact, i) => (
              <FadeIn key={i} delay={0.3 + i * 0.1} y={20}>
                <motion.div
                  className="p-6 rounded-2xl bg-gradient-to-br from-[#D7E2EA]/5 to-transparent border border-[#D7E2EA]/20 text-center hover:border-[#B600A8]/50 transition-all"
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <fact.icon className="w-8 h-8 mx-auto mb-3 text-[#B600A8]" />
                  <p className="text-[#D7E2EA] font-bold text-lg">{fact.value}</p>
                  <p className="text-[#D7E2EA]/60 text-sm">{fact.label}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          
          <div className="flex gap-4 flex-wrap justify-center">
            <ContactButton />
            <DownloadResumeButton />
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Skills Section with Progress Bars
const SkillsSection: React.FC = () => {
  const skillCategories = [
    {
      category: 'Frontend Development',
      icon: Layers,
      skills: [
        { name: 'React & TypeScript', level: 90 },
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'HTML5 & CSS3', level: 95 },
        { name: 'Tailwind CSS', level: 88 },
        { name: 'Framer Motion', level: 80 },
        { name: 'Responsive Design', level: 92 },
      ]
    },
    {
      category: 'Backend Development',
      icon: Database,
      skills: [
        { name: 'Node.js & Express', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'MySQL', level: 75 },
        { name: 'RESTful APIs', level: 88 },
        { name: 'JWT Authentication', level: 82 },
        { name: 'API Integration', level: 85 },
      ]
    },
    {
      category: 'Programming Languages',
      icon: Code2,
      skills: [
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 82 },
        { name: 'Python', level: 70 },
        { name: 'Java', level: 65 },
        { name: 'C', level: 60 },
      ]
    },
    {
      category: 'Tools & Technologies',
      icon: Briefcase,
      skills: [
        { name: 'Git & GitHub', level: 88 },
        { name: 'VS Code', level: 95 },
        { name: 'Postman', level: 85 },
        { name: 'AWS Basics', level: 70 },
        { name: 'Excel & Data Analysis', level: 80 },
        { name: 'Figma', level: 65 },
      ]
    },
  ];

  return (
    <section id="skills" className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2 className="text-[#0C0C0C] font-black uppercase text-center mb-6" style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}>
        Skills
      </h2>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto text-lg">
        My technical expertise and proficiency across various technologies
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {skillCategories.map((category, i) => (
          <FadeIn key={i} delay={i * 0.15} y={40}>
            <motion.div
              className="p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 hover:border-[#B600A8] hover:shadow-2xl"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-2xl gradient-bg">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-[#0C0C0C]">{category.category}</h3>
              </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-2">
                      <span className="text-[#0C0C0C] font-medium">{skill.name}</span>
                      <span className="text-[#B600A8] font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full skill-fill rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: idx * 0.06, ease: EASE }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

// Certifications with Hover Effects
const CertificationsSection: React.FC = () => {
  const certifications = [
    { name: 'Career Essentials in Generative AI', issuer: 'Microsoft & LinkedIn', year: '2024', icon: '🤖' },
    { name: 'Android Development Workshop', issuer: 'IIT Delhi', year: '2024', icon: '📱' },
    { name: 'Cyber Job Simulation', issuer: 'Deloitte', year: '2024', icon: '🔒' },
    { name: 'Artificial Intelligence Fundamentals', issuer: 'IBM', year: '2024', icon: '🧠' },
    { name: 'AWS Cloud Practitioner Essentials', issuer: 'AWS Training', year: '2024', icon: '☁️' },
    { name: 'Building with Claude API', issuer: 'Anthropic', year: '2025', icon: '⚡' },
  ];

  return (
    <section className="bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24">
      <h2 className="text-[#0C0C0C] font-black uppercase text-center mb-6" style={{ fontSize: 'clamp(2.5rem, 9vw, 90px)' }}>
        Certifications
      </h2>
      <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
        Industry-recognized credentials validating my expertise
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((cert, i) => (
          <FadeIn key={i} delay={i * 0.1} y={30}>
            <motion.div
              className="p-6 rounded-2xl bg-gradient-to-br from-white to-gray-50 border-2 border-gray-200 hover:border-[#B600A8] group relative overflow-hidden"
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <div className="absolute top-0 right-0 text-6xl opacity-10 group-hover:opacity-20 transition-opacity">
                {cert.icon}
              </div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="text-4xl">{cert.icon}</div>
                <span className="px-3 py-1 bg-[#B600A8]/10 text-[#B600A8] rounded-full text-xs font-bold">
                  {cert.year}
                </span>
              </div>
              <h3 className="text-lg font-bold text-[#0C0C0C] mb-2 group-hover:text-[#B600A8] transition-colors">
                {cert.name}
              </h3>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <Award size={16} className="text-[#B600A8]" />
                {cert.issuer}
              </p>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

// Projects with Enhanced Hover
const ProjectsSection: React.FC = () => {
  const projects = [
    {
      number: '01',
      name: 'Excel Analytics Platform',
      category: 'Full Stack Application',
      description: 'A comprehensive web platform for analyzing Excel data with real-time visualization, data validation, and automated reporting features. Built with scalability and performance in mind.',
      link: 'https://github.com/Anshu052/Excel-Analytics',
      tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Chart.js', 'Data Viz'],
      highlights: ['Real-time Analysis', 'Auto Reports', 'Data Validation'],
      images: {
        col1img1: '/images/excel-sheet.jpg',
        col1img2: '/images/excel-charts.jpg',
        col2img: '/images/excel-dashboard.jpg',
      },
    },
    {
      number: '02',
      name: 'Google Gemini Clone',
      category: 'Frontend Showcase',
      description: 'Pixel-perfect recreation of Google Gemini AI interface featuring smooth animations, responsive design, and optimized performance. Demonstrates advanced React patterns and modern UI/UX principles.',
      link: 'https://github.com/Anshu052/Gemini-Clone',
      tags: ['React', 'TypeScript', 'Tailwind', 'API', 'Responsive', 'Animations'],
      highlights: ['Pixel Perfect', 'Smooth UX', 'Type Safe'],
      images: {
        col1img1: '/images/gemini-chat.jpg',
        col1img2: '/images/gemini-code.jpg',
        col2img: '/images/gemini-ai.jpg',
      },
    },
    {
      number: '03',
      name: 'Interactive Portfolio',
      category: 'Personal Branding',
      description: 'A modern, animated portfolio website showcasing projects and skills with advanced scroll animations, magnetic hover effects, and seamless navigation. Built to impress and engage.',
      link: 'https://github.com/Anshu052/aryan-portfolio',
      tags: ['React', 'Framer Motion', 'TypeScript', '3D Effects', 'Modern UI'],
      highlights: ['Advanced Animations', 'Interactive', 'Modern Design'],
      images: {
        col1img1: '/images/hero-avatar.webp',
        col1img2: '/images/portfolio-experience.webp',
        col2img: '/images/portfolio-hero.webp',
      },
    },
  ];

  const ProjectCard: React.FC<{ project: typeof projects[0]; index: number }> = ({ project, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ['start end', 'start start'],
    });

    const targetScale = 1 - (projects.length - 1 - index) * 0.03;
    const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

    return (
      <div ref={ref} className="h-[110vh] flex items-center justify-center">
        <motion.div
          style={{ scale, top: `${index * 28}px` }}
          className="sticky top-20 md:top-24 w-full max-w-6xl bg-[#0C0C0C] rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] p-6 sm:p-8 md:p-10 hover:border-[#B600A8] transition-all"
        >
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="flex items-start gap-4 md:gap-6 flex-1">
                <motion.span
                  className="font-black gradient-accent"
                  style={{ fontSize: 'clamp(3rem, 7vw, 70px)' }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {project.number}
                </motion.span>
                <div className="flex flex-col gap-3 flex-1">
                  <span className="text-[#D7E2EA]/60 text-xs uppercase tracking-widest font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-[#D7E2EA] font-black leading-tight" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                    {project.name}
                  </h3>
                  <p className="text-[#D7E2EA]/80 text-sm md:text-base leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.highlights.map((highlight) => (
                      <span key={highlight} className="px-3 py-1 text-xs bg-[#B600A8]/30 text-[#D7E2EA] rounded-full border border-[#B600A8]/50 font-medium">
                        ✓ {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-6 py-3 text-sm hover:bg-[#B600A8] hover:border-[#B600A8] hover:text-white transition-all inline-flex items-center gap-2 self-start"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Project
                <ExternalLink size={16} />
              </motion.a>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="px-3 py-1.5 text-xs bg-[#D7E2EA]/10 text-[#D7E2EA] rounded-full border border-[#D7E2EA]/30 font-medium"
                  whileHover={{ backgroundColor: 'rgba(182, 0, 168, 0.2)', borderColor: 'rgba(182, 0, 168, 0.5)' }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Images */}
            <TiltCard className="flex gap-3 md:gap-4">
              <div className="flex flex-col gap-3 md:gap-4" style={{ width: '40%' }}>
                <div className="img-reveal rounded-[30px] sm:rounded-[40px]" style={{ height: 'clamp(130px, 16vw, 230px)' }}>
                  <img
                    src={project.images.col1img1}
                    alt={`${project.name} screenshot 1`}
                    className="w-full h-full rounded-[30px] sm:rounded-[40px] object-cover"
                  />
                </div>
                <div className="img-reveal rounded-[30px] sm:rounded-[40px]" style={{ height: 'clamp(160px, 22vw, 340px)' }}>
                  <img
                    src={project.images.col1img2}
                    alt={`${project.name} screenshot 2`}
                    className="w-full h-full rounded-[30px] sm:rounded-[40px] object-cover"
                  />
                </div>
              </div>
              <div className="img-reveal rounded-[30px] sm:rounded-[40px]" style={{ width: '60%' }}>
                <img
                  src={project.images.col2img}
                  alt={`${project.name} screenshot 3`}
                  className="w-full h-full rounded-[30px] sm:rounded-[40px] object-cover"
                />
              </div>
            </TiltCard>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <section id="projects" className="bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-10 px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
      <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-6" style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}>
        Featured Work
      </h2>
      <p className="text-center text-[#D7E2EA]/70 mb-20 max-w-2xl mx-auto text-lg">
        A showcase of my best projects demonstrating technical expertise and creative problem-solving
      </p>

      <div>
        {projects.map((project, i) => (
          <ProjectCard key={i} project={project} index={i} />
        ))}
      </div>

      <div className="text-center mt-20">
        <motion.a
          href="https://github.com/Anshu052"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-bold uppercase tracking-widest hover:bg-[#B600A8] hover:border-[#B600A8] hover:text-white transition-all text-sm"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.95 }}
        >
          <Github size={24} />
          Explore All Projects on GitHub
        </motion.a>
      </div>
    </section>
  );
};

// Testimonials Section (New)
const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Hiring Manager',
      role: 'Zidio Development',
      text: 'Aryan demonstrated exceptional problem-solving skills and delivered quality code consistently. His ability to learn quickly and adapt to new technologies was impressive.',
      rating: 5,
    },
    {
      name: 'Team Lead',
      role: 'Development Team',
      text: 'Great team player with strong technical skills. Always willing to help others and contribute to the success of the project. His MERN stack expertise is solid.',
      rating: 5,
    },
    {
      name: 'Peer Developer',
      role: 'Fellow Intern',
      text: 'Working with Aryan was a pleasure. He brings fresh ideas and has a great eye for detail. His code quality and documentation standards are commendable.',
      rating: 5,
    },
  ];

  return (
    <section className="bg-[#0C0C0C] py-20 px-5 sm:px-8 md:px-10">
      <h2 className="hero-heading font-black uppercase text-center mb-6" style={{ fontSize: 'clamp(2.5rem, 9vw, 90px)' }}>
        Recommendations
      </h2>
      <p className="text-center text-[#D7E2EA]/70 mb-16 max-w-2xl mx-auto">
        What colleagues and mentors say about working with me
      </p>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, i) => (
          <FadeIn key={i} delay={i * 0.15} y={30}>
            <motion.div
              data-cursor="hover"
              className="glow-card p-8 rounded-3xl bg-gradient-to-br from-[#D7E2EA]/5 to-transparent border border-[#D7E2EA]/20 hover:border-[#B600A8]/50"
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-[#B600A8] text-[#B600A8]" />
                ))}
              </div>
              <p className="text-[#D7E2EA]/90 leading-relaxed mb-6 italic">
                "{testimonial.text}"
              </p>
              <div className="border-t border-[#D7E2EA]/20 pt-4">
                <p className="text-[#D7E2EA] font-bold">{testimonial.name}</p>
                <p className="text-[#D7E2EA]/60 text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
};

// Contact Section
const ContactSection: React.FC = () => {
  return (
    <footer id="contact" className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 border-t border-[#D7E2EA]/20">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center mb-6" style={{ fontSize: 'clamp(3rem, 9vw, 100px)' }}>
            Let's Build Together
          </h2>
          <p className="text-center text-[#D7E2EA]/70 mb-16 max-w-2xl mx-auto text-lg">
            Have a project in mind? Let's turn your vision into reality
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <FadeIn delay={0.2} x={-30}>
            <div>
              <h3 className="text-[#D7E2EA] text-2xl md:text-3xl font-bold mb-6">Get In Touch</h3>
              <p className="text-[#D7E2EA]/70 mb-8 leading-relaxed">
                I'm actively seeking Full Stack Developer roles, internships, and freelance opportunities. Let's create something amazing together!
              </p>
              
              <div className="space-y-5">
                {[
                  { icon: Mail, text: 'raj88anshu@gmail.com', href: 'mailto:raj88anshu@gmail.com' },
                  { icon: Phone, text: '+91 8877734333', href: 'tel:+918877734333' },
                  { icon: MapPin, text: 'Bangalore, Karnataka, India', href: null },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={item.href ? { x: 10 } : {}}
                  >
                    {item.href ? (
                      <a href={item.href} className="flex items-center gap-4 text-[#D7E2EA] hover:text-[#B600A8] transition-colors group">
                        <div className="p-3 rounded-xl bg-[#D7E2EA]/10 group-hover:bg-[#B600A8]/20 transition-colors">
                          <item.icon size={22} />
                        </div>
                        <span className="text-lg">{item.text}</span>
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 text-[#D7E2EA]">
                        <div className="p-3 rounded-xl bg-[#D7E2EA]/10">
                          <item.icon size={22} />
                        </div>
                        <span className="text-lg">{item.text}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="flex gap-4 mt-10">
                {[
                  { icon: Github, href: 'https://github.com/Anshu052' },
                  { icon: Linkedin, href: 'https://linkedin.com/in/aryan-raj88' },
                  { icon: Mail, href: 'mailto:raj88anshu@gmail.com' },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target={social.icon !== Mail ? '_blank' : undefined}
                    rel={social.icon !== Mail ? 'noopener noreferrer' : undefined}
                    className="p-4 rounded-xl bg-[#D7E2EA]/10 text-[#D7E2EA] hover:bg-[#B600A8] hover:text-white transition-all"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <social.icon size={26} />
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Quick Actions */}
          <FadeIn delay={0.3} x={30}>
            <div>
              <h4 className="text-[#D7E2EA] text-xl font-semibold mb-6">Quick Actions</h4>
              <div className="space-y-4">
                {[
                  { icon: Download, text: 'Download Resume', href: '/Aryan_Raj_Resume.pdf', download: true },
                  { icon: Github, text: 'View GitHub Profile', href: 'https://github.com/Anshu052' },
                  { icon: Linkedin, text: 'Connect on LinkedIn', href: 'https://linkedin.com/in/aryan-raj88' },
                ].map((action, i) => (
                  <motion.a
                    key={i}
                    href={action.href}
                    download={action.download}
                    target={!action.download ? '_blank' : undefined}
                    rel={!action.download ? 'noopener noreferrer' : undefined}
                    className="flex items-center justify-between p-5 rounded-2xl bg-[#D7E2EA]/5 border border-[#D7E2EA]/20 hover:border-[#B600A8] hover:bg-[#B600A8]/10 transition-all group"
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-[#D7E2EA] font-medium text-lg">{action.text}</span>
                    <action.icon className="text-[#D7E2EA] group-hover:text-[#B600A8] transition-colors" size={22} />
                  </motion.a>
                ))}
              </div>

              <motion.div
                className="mt-8 p-8 rounded-3xl gradient-bg text-white relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute top-0 right-0 text-9xl opacity-10">💼</div>
                <h5 className="text-xl font-bold mb-3 relative z-10">Currently Available</h5>
                <p className="text-white/90 relative z-10 leading-relaxed">
                  Open to Full Stack Developer roles, exciting projects, and collaborative opportunities. Let's build the future together!
                </p>
              </motion.div>
            </div>
          </FadeIn>
        </div>
        
        <div className="pt-8 border-t border-[#D7E2EA]/20 text-center space-y-3">
          <p className="text-[#D7E2EA]/50 text-sm">
            &copy; 2026 Aryan Raj. All rights reserved.
          </p>
          <p className="text-[#D7E2EA]/40 text-xs">
            Crafted with ❤️ using React • TypeScript • Tailwind CSS • Framer Motion
          </p>
          <div className="flex justify-center gap-2 flex-wrap">
            {['React', 'TypeScript', 'Tailwind', 'Framer Motion', 'Vite'].map((tech) => (
              <span key={tech} className="text-[#D7E2EA]/30 text-xs">#{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App
const App: React.FC = () => {
  return (
    <div style={{ overflowX: 'clip' }}>
      <GlobalStyles />
      <CustomCursor />
      <ScrollProgress />
      <HeroSection />
      <AchievementBadges />
      <StatsSection />
      <ExperienceSection />
      <MarqueeSection />
      <AboutSection />
      <SkillsSection />
      <CertificationsSection />
      <ProjectsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
};

export default App;