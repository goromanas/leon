const variantsWeek = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: 0 },
};

const variantsDay = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 150,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

const variantsUl = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.15 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const variantsUsersList = {
    open: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0,
        },
        height: '100%',
    },
    closed: {
        transition: { staggerChildren: 0.01, staggerDirection: 1 },
        height: 0,
    },
};

const variantsUser = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        y: 100,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 },
        },
    },
};

const variantsBonusList = {
    open: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0,
        },
        height: '100%',
    },
    closed: {
        transition: { staggerChildren: 0.01, staggerDirection: 1 },
        height: 0,
    },
};

const variantsBonus = {
    open: {
        y: 100,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: 100 },
        },
    },
    closed: {
        y: 0,
        opacity: 0,
        transition: {
            y: { stiffness: 1 },
        },
    },
};

export { variantsDay, variantsWeek, variantsUl, variantsUsersList, variantsUser, variantsBonus, variantsBonusList };
