import React, { useEffect, useState } from 'react';
import { getContent } from '../services/ContentService';

interface ILink {
    displayText: string;
    url: string;
}

interface IContent {
    heading: string;
    caraousel: string[];
    paragraph: string;
    links: ILink[];
}

const ContentDisplay: React.FC = () => {
    const [content, setContent] = useState<IContent[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getContent();
                setContent(response.data);
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {content.map((item, index) => (
                <div key={index}>
                    <h1>{item.heading}</h1>
                    <ul>
                        {item.caraousel.map((carouselItem, carouselIndex) => (
                            <li key={carouselIndex}>{carouselItem}</li>
                        ))}
                    </ul>
                    <p>{item.paragraph}</p>
                    <ul>
                        {item.links.map((link, linkIndex) => (
                            <li key={linkIndex}><a href={link.url}>{link.displayText}</a></li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ContentDisplay;
