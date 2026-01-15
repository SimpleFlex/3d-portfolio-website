import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import myimage from "../assets/pics/my-image.png";
import EarthCanvas from "./canvas/stars";

gsap.registerPlugin(ScrollTrigger);

export const Hero = () => {
  const hiRef = useRef<HTMLSpanElement>(null);
  const elijahRef = useRef<HTMLSpanElement>(null);
  const primoRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const diamondRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: elijahRef.current,
          start: "top 80%",
          end: "bottom -50%",
          toggleActions: "play reverse play reverse",
        },
      });

      tl.fromTo(
        hiRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.15 }
      )
        .fromTo(
          elijahRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.2 }
        )
        .fromTo(
          primoRef.current,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.18 }
        )
        .fromTo(
          descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.18 },
          "-=0.1"
        )
        .fromTo(
          buttonRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.18 },
          "-=0.1"
        )
        .fromTo(
          imageRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "power2.out" },
          "-=0.35"
        )
        .fromTo(
          diamondRef.current,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.4)" },
          "-=0.3"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen mx-auto">
      {/* 3D Earth & Star Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <EarthCanvas />
      </div>

      {/* Main Hero Content */}
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24 md:pt-28 lg:pt-32 sm:h-screen flex items-center">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8 md:gap-12">
          {/* Left Text - Appears SECOND on mobile (below image) */}
          <div className="w-full md:w-1/2 lg:w-3/5 z-20 text-center md:text-left">
            <h1 className="font-fancy text-white font-extrabold leading-tight">
              <span
                ref={hiRef}
                className="block text-[28px] sm:text-[36px] md:text-[44px] text-white/80"
              >
                Hi, I'm
              </span>
              <span
                ref={elijahRef}
                className="block text-[56px] sm:text-[72px] md:text-[100px] lg:text-[120px]"
              >
                ELIJAH
              </span>
              <span
                ref={primoRef}
                className="block text-[#915eff] text-[24px] sm:text-[32px] md:text-[40px] tracking-[0.25em] sm:tracking-[0.35em] mt-2"
              >
                PRIMO
              </span>
            </h1>

            <p
              ref={descRef}
              className="mt-6 max-w-3xl text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] leading-relaxed text-white/80 font-medium mx-auto md:mx-0"
            >
              A{" "}
              <span className="text-[#915eff] font-semibold">
                full-stack web developer
              </span>{" "}
              and{" "}
              <span className="text-[#915eff] font-semibold">
                Solana blockchain developer
              </span>
              , crafting elegant user experiences and building{" "}
              <span className="text-white font-semibold">
                scalable, high-performance on-chain applications
              </span>{" "}
              with precision and purpose.
            </p>

            <a
              href="#contact"
              ref={buttonRef}
              className="mt-8 px-8 sm:px-12 py-3 sm:py-4 text-[16px] sm:text-[18px] md:text-[20px] font-bold tracking-wide bg-gradient-to-r from-[#915eff] to-[#7a4aff] text-white rounded-2xl shadow-xl shadow-[#915eff]/40 hover:scale-105 hover:shadow-[#915eff]/60 transition-all duration-300 relative z-30 inline-block"
            >
              HIRE ME
            </a>
          </div>

          {/* Right-side Hero Image - Appears FIRST on mobile (at top) */}
          <div className="relative w-full md:w-1/2 lg:w-2/5 flex justify-center md:justify-end items-center z-10">
            {/* Radiating Halo Behind Image */}
            <div className="absolute top-1/2 -translate-y-1/2 left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 md:right-0 w-[300px] sm:w-[400px] md:w-[450px] lg:w-[500px] aspect-square rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-indigo-400 opacity-20 blur-3xl animate-pulse-slow z-0"></div>

            {/* Hero Image Container */}
            <div
              ref={imageRef}
              className="relative w-[240px] sm:w-[280px] md:w-[320px] lg:w-[380px] h-[380px] sm:h-[450px] md:h-[500px] lg:h-[550px] overflow-hidden rounded-2xl shadow-2xl shadow-purple-500/40 border-2 border-white/10"
            >
              <img
                src={myimage}
                alt="Hero"
                className="w-full h-full object-cover object-top"
              />

              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

              {/* Decorative overlay shapes */}
              <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-purple-500/30 blur-xl"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-pink-500/20 blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Diamond Decoration Below Image */}
      <div
        ref={diamondRef}
        className="absolute bottom-10 sm:bottom-20 right-1/2 translate-x-1/2 md:translate-x-0 md:right-1/3 lg:right-1/4 w-12 sm:w-16 h-12 sm:h-16 transform rotate-45 bg-gradient-to-tr from-purple-500 to-pink-500 shadow-lg shadow-purple-500/40 rounded-sm z-10 animate-[float_3s_ease-in-out_infinite]"
      >
        <div className="absolute inset-2 bg-gradient-to-tr from-transparent to-white/20 rounded-sm"></div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }
      `}</style>
    </section>
  );
};
