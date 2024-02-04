import { motion } from 'framer-motion';
export default function LoadingBounce() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <motion.div
        className="bg-slate-900 w-2 h-2 rounded-full"
        initial={{ y: 0 }}
        animate={{ y: [0, -25, 0] }}
        transition={{ delay: 0.4, duration: 1, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="bg-slate-900 w-2 h-2 rounded-full mx-1"
        initial={{ y: 0 }}
        animate={{ y: [0, -25, 0] }}
        transition={{ delay: 0.5, duration: 1, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="bg-slate-900 w-2 h-2 rounded-full"
        initial={{ y: 0 }}
        animate={{ y: [0, -25, 0] }}
        transition={{ delay: 0.6, duration: 1, repeat: Infinity }}
      ></motion.div>
    </div>
  );
}
