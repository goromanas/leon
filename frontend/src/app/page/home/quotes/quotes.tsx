import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';

import { AsyncContent } from 'app/components/layout';
import { loggerService } from 'app/service/logger-service';
import { ComponentSmallSpinner } from 'app/page/common/page-loading-spinner/component-small-spinner';

import styles from './quotes.module.scss';

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
                    return data[Math.floor(Math.random() * data.length - 1)];
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
            loader={<ComponentSmallSpinner />}
        >
            <div className={styles.quotes} >
                <div>"{quoteText}"</div>
                <div className={styles.quotesAuthor}>{quoteAuthor}</div>
            </div>
        </AsyncContent>
    );
};

export { Quotes };
