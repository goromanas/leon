import React, { useEffect, useState } from 'react';

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
    return (<>
        <div style={{width: '100%', marginRight:'0.5em'}}>
            <div style={{fontStyle: 'italic'}}>"{quoteText}"</div>
            <div style={{display: 'inline-block', float: 'right', marginRight:'10px'}}>{quoteAuthor}</div>
        </div>
    </>);
};

export { Quotes };
