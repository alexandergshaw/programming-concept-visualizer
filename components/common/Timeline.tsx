'use client';

import { motion, useAnimation, useInView } from 'framer-motion';
import { Box, useTheme } from '@mui/material';
import { useEffect, useRef } from 'react';

export interface TimelineStep {
    icon: React.ReactNode;
    content: React.ReactNode;
    loopToIndex?: number;
}

export interface TimelineProps {
    steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: true });
    const theme = useTheme();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [inView, controls]);

    const timelineVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.6,
                ease: 'easeInOut',
            },
        }),
    };

    return (
        <Box ref={ref} sx={{ position: 'relative', paddingLeft: '30px' }}>
            {/* Vertical line */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: '14px',
                    width: '2px',
                    height: '100%',
                    backgroundColor: theme.palette.grey[400],
                    zIndex: 0,
                }}
            />

            {/* Arrowhead marker defs */}
            <svg width="0" height="0">
                <defs>
                    <marker
                        id="arrowhead"
                        markerWidth="8"
                        markerHeight="8"
                        refX="5"
                        refY="4"
                        orient="auto"
                        markerUnits="strokeWidth"
                    >
                        <path d="M0,0 L8,4 L0,8" fill={theme.palette.secondary.main} />
                    </marker>
                </defs>
            </svg>

            {steps.map(({ icon, content, loopToIndex }, i) => {
                const loopBackOffset = loopToIndex !== undefined ? (i - loopToIndex) * 60 : 0;

                return (
                    <motion.div
                        key={i}
                        custom={i}
                        initial="hidden"
                        animate={controls}
                        variants={timelineVariants}
                        whileHover={{
                            scale: 1.025,
                            boxShadow: `0px 6px 24px ${theme.palette.primary.main}33`,
                            transition: {
                                type: 'spring',
                                stiffness: 120,
                                damping: 18,
                            },
                        }}
                        style={{
                            position: 'relative',
                            marginBottom: '60px',
                            borderRadius: '10px',
                            background: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.paper,
                            padding: '16px',
                            cursor: 'pointer',
                        }}
                    >
                        {/* Loop line */}
                        {loopToIndex !== undefined && (
                            <svg
                                width="80"
                                height={loopBackOffset}
                                viewBox={`0 0 80 ${loopBackOffset}`}
                                style={{
                                    position: 'absolute',
                                    left: '-66px',
                                    top: '24px',
                                    zIndex: 0,
                                }}
                            >
                                <path
                                    d={`
                    M 78 0
                    C 20 0, 20 ${loopBackOffset - 10}, 78 ${loopBackOffset - 10}
                  `}
                                    stroke={theme.palette.secondary.main}
                                    strokeWidth="2"
                                    fill="none"
                                    markerEnd="url(#arrowhead)"
                                />
                            </svg>
                        )}

                        {/* Icon */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '50%',
                                transform: 'translateY(-50%)', // This centers the icon vertically
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                backgroundColor: theme.palette.primary.main,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#fff',
                                zIndex: 1,
                                fontSize: '16px',
                            }}
                        >
                            {icon}
                        </Box>

                        {/* Content */}
                        <Box sx={{ ml: 5 }}>{content}</Box>
                    </motion.div>
                );
            })}
        </Box>
    );
}
