import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }}
            style={{ width: '100%' }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;
