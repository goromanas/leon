import React, { useEffect, useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';

import styles from './quotes.module.scss';

const Quotes: React.FC = () => {
    const [quoteText, setQouteText] = useState('');
    const [quoteAuthor, setQouteAuthor] = useState('');

    async function getQuoteText() {
        try {
            const singleQuoteText = await fetch('https://type.fit/api/quotes')
                .then(response => response.json())
                .then(data => data[Math.floor(Math.random() * data.length - 1)]);
            setQouteText(singleQuoteText.text);
            setQouteAuthor(singleQuoteText.author);
        } catch (e) {
            console.log('Error while fetching quotes. Contact Rytis M.');
        } finally {
            console.log('Finished fetching quotes');
        }
    }

    useEffect(() => {
        getQuoteText();

    }, []);
    return (
        <>
            <div className={styles.quotes} >
                <div>{quoteText}"</div>
                <div className={styles.quotesAuthor}><ArrowRightOutlined style={{ fontSize: '2rem' }} /></div>
            </div>
        </>
    );
};

export { Quotes };
