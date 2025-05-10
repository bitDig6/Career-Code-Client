import React from 'react';
import { easeOut, motion } from "motion/react";
import team1 from '../../assets/team-1.jpg';
import team2 from '../../assets/team-2.jpg';

const Banner = () => {
    return (
        <div className="hero bg-base-200 min-h-96">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className='flex-1'>
                    <motion.img 
                    className='max-w-sm border-l-4 border-b-4 border-blue-400 rounded-t-3xl rounded-br-3xl shadow-2xl' 
                    animate={{y: [100, 50, 100]}}
                    transition={{duration: 10, repeat: Infinity}}
                    src={team1} alt="team1" />

                    <motion.img 
                    className='max-w-sm border-l-4 border-b-4 border-blue-400 rounded-t-3xl rounded-br-3xl shadow-2xl' 
                    animate={{x: [100, 150, 100]}}
                    transition={{duration: 10, delay: 5, repeat: Infinity}}
                    src={team2} alt="team1" />


                </div>

                <div className='flex-1'>
                    <motion.h1
                        animate={{ x: 50 }}
                        transition={{ duration: 2, delay: 1, ease: easeOut, repeat: Infinity }}
                        className="text-5xl font-bold"
                    >
                        Latest <motion.span
                            animate={{ color: ['#ecff33', '#33ffe3', '#ff6133'] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
                        >Jobs</motion.span> For You!
                    </motion.h1>
                    <p className="py-6">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;