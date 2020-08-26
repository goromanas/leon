import React, { useEffect, useState } from 'react';

import styles from './quotes.module.scss';
import { AsyncContent } from '../layout';
import { Spin } from 'antd';
import { loggerService } from 'app/service/logger-service';

const Quotes: React.FC = () => {
    const [quoteText, setQouteText] = useState('');
    const [quoteAuthor, setQouteAuthor] = useState('');
    const [loading, setLoading] = useState(true);

    async function getQuoteText(): Promise<void> {
        try {
            const singleQuoteText = await fetch('https://type.fit/api/quotes')
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    return data[Math.floor(Math.random() * data.length - 1)]
                });
            setQouteText(singleQuoteText.text);
            setQouteAuthor(singleQuoteText.author);
        } catch (e) {
            loggerService.error('Error getting quotes');
        }
    }

    useEffect(() => {
        const ac = new AbortController();
        getQuoteText();
        return () => ac.abort();
    }, []);
    return (
        <AsyncContent
            loading={loading}
            loader={<Spin tip="Loading..." />}
        >
            <div className={styles.quotes} >
                <div>"{quoteText}"</div>
                <div className={styles.quotesAuthor}>{quoteAuthor}</div>
            </div>
        </AsyncContent>
    );
};

export { Quotes };
