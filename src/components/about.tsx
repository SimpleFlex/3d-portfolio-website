import { useEffect, useRef } from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { SERVICES } from "../constants";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

gsap.registerPlugin(ScrollTrigger);

type ServiceCardProps = {
  index: number;
  title: string;
  icon: string;
};

// Service Card
const ServiceCard = ({ index, title, icon }: ServiceCardProps) => {
  return (
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className="xs:w-[250px] w-full"
    >
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col">
          <img
            src={icon}
            alt={title}
            className="w-16 h-16 object-contain"
            style={{
              animation: "float 1.5s ease-in-out infinite",
              animationDelay: `${index * 0.1}s`,
              willChange: "transform",
            }}
          />
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

// About
export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(sectionRef.current, {
        opacity: 0,
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <SectionWrapper idName="about">
      <div ref={sectionRef}>
        {/* Title */}
        <div className="flex flex-col items-center text-center">
          <motion.div variants={textVariant()}>
            <p className={styles.sectionSubText}>Introduction</p>
            <h2 className={styles.sectionHeadText}>ABOUT ME</h2>
          </motion.div>

          {/* Body */}
          <motion.p
            variants={fadeIn(undefined, undefined, 0.1, 1)}
            className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px] text-center"
          >
            I am a highly skilled web and blockchain developer with strong
            proficiency in TypeScript and JavaScript, and deep experience
            building modern applications using React, Node.js, and Three.js. I
            also specialize in Solana blockchain development, designing and
            integrating high-performance, secure on-chain programs and Web3
            interfaces. I am a fast learner who collaborates closely with
            clients to deliver efficient, scalable, and user-centric solutions
            that address real-world challenges. From concept to deployment, I
            focus on clean architecture, performance, and long-term
            maintainability. Let’s work together to transform your ideas into
            reliable, production-ready products.
          </motion.p>
        </div>

        {/* Service Card */}
        <div className="mt-20 flex flex-wrap gap-10 justify-center">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} index={i} {...service} />
          ))}
        </div>

        <style>{`
          @keyframes float {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(3deg);
            }
          }
        `}</style>
      </div>
    </SectionWrapper>
  );
};
