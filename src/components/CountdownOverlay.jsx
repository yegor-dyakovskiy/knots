/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion"; // ✅ добавили motion

export default function CountdownOverlay({ start = 3, onComplete }) {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (count <= 0) {
      onComplete && onComplete();
      return;
    }
    const timer = setTimeout(() => setCount(count - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, onComplete]);


  return (
    <div style={styles.overlay}>
      <AnimatePresence mode="wait">
        {count > 0 && (
         <motion.div
  key={count}
  initial={{ scale: 0, opacity: 0 }}
  animate={{ scale: 1.5, opacity: 1 }}
  exit={{ scale: 1.8, opacity: 0 }}
  transition={{ duration: 0.4, ease: "easeInOut" }}
  style={styles.number}
>
  {count}
</motion.div>

        )}
      </AnimatePresence>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    color: "#fff",
    fontSize: "100px",
    fontWeight: "bold",
  },
  number: {
    position: "absolute",
  },
};
