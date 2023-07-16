import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

function AnimatedText({ text, your, potential }) {
  const coursesSection = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: "30px" },
  };

  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <div className="flex flex-col" ref={ref}>
      <div className="flex">
        {text.split("").map((letter, index) => (
          <motion.div
            className="text-6xl sm:text-8xl text-[#C7FB04] cubano uppercase"
            key={index}
            animate={controls}
            initial="hidden"
            variants={coursesSection}
            transition={{ delay: index * 0.08 }}
          >
            {letter}
          </motion.div>
        ))}
      </div>

      <div className="flex">
        {your.split("").map((your, index) => (
          <motion.div
            className="text-6xl sm:text-8xl text-white cubano uppercase"
            key={index}
            animate={controls}
            initial="hidden"
            variants={coursesSection}
            transition={{ delay: index * 0.08 + 0.5 }}
          >
            {your}
          </motion.div>
        ))}
      </div>

      <div className="flex">
        {potential.split("").map((potential, index) => (
          <motion.div
            className="text-6xl sm:text-8xl text-[#C7FB04] cubano uppercase"
            key={index}
            animate={controls}
            initial="hidden"
            variants={coursesSection}
            transition={{ delay: index * 0.08 + 0.7 }}
          >
            {potential}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AnimatedText;
