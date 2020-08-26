import React, { useEffect, useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';

import styles from './quotes.module.scss';
import { AsyncContent } from '../layout';
import { PageLoadingSpinner } from 'app/page/common/page-loading-spinner/page-loading-spinner';
import { Spin } from 'antd';

const Quotes: React.FC = () => {
    const [quoteText, setQouteText] = useState('');
    const [quoteAuthor, setQouteAuthor] = useState('');
    const [loading, setLoading] = useState(true);

    async function getQuoteText() {
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
            console.log('Error while fetching quotes. Contact Rytis M.');
        } finally {
            console.log('Finished fetching quotes');
        }
    }

    useEffect(() => {
        getQuoteText();

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
