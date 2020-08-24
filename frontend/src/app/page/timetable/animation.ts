const variantsWeek = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 0 },
}

const variantsDay = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 150,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const variantsUl = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.15 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};


export { variantsDay, variantsWeek, variantsUl };
