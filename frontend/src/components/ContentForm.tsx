import React, { useState } from 'react';
import { createContent } from '../services/ContentService';

const ContentForm: React.FC = () => {
    const [heading, setHeading] = useState('');
    const [caraousel, setCaraousel] = useState<string[]>([]);
    const [caraouselElement, setCaraouselElement] = useState("");

    const [paragraph, setParagraph] = useState('');

    const [links, setLinks] = useState<{ displayText: string, url: string }[]>([]);
    const [displayText, setDisplayText] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createContent({ heading, caraousel, paragraph, links });
        setHeading('');
        setCaraousel([]);
        setParagraph('');
        setLinks([]);
        setDisplayText('');
        setUrl('');
    };

    const addCaraouselElement = () => {
        setCaraousel([...caraousel, caraouselElement]);
        setCaraouselElement('');
    };

    const addLink = () => {
        setLinks([...links, { displayText, url }]);
        setDisplayText('');
        setUrl('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Heading:</label>
                <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} />
            </div>
            <div>
                <label>Caraousel Content:</label>
                <input type="text" value={caraouselElement} onChange={(e) => setCaraouselElement(e.target.value)} />
                <button type="button" onClick={addCaraouselElement}>Add Caraousel Content</button>
                <ul>
                    {caraousel.map((elem, index) => (
                        <li key={index}>{elem}</li>
                    ))}
                </ul>
            </div>
            <div>
                <label>Paragraph:</label>
                <textarea value={paragraph} onChange={(e) => setParagraph(e.target.value)} />
            </div>
            <div>
                <label>Link Display Text:</label>
                <input type="text" value={displayText} onChange={(e) => setDisplayText(e.target.value)} />
            
                <label>Link URL:</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
                
                <button type="button" onClick={addLink}>Add Link</button>
            </div>
            <ul>
                {links.map((link, index) => (
                    <li key={index}>{link.displayText} - {link.url}</li>
                ))}
            </ul>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ContentForm;
