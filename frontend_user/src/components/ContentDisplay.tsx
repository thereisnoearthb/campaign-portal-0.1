import React, { useEffect, useState } from 'react';
import { getContent } from '../services/ContentService';

//importing styles
import "../styles/styles.css"

//importing chakra UI for caraousel
import { Box, Center, Heading, Text, Flex, keyframes } from "@chakra-ui/react";
import ImageSlider from "./ImageSlider";
import { SlideData } from "./SlideData";

//font awesome twitter icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';

interface Link {
    displayText: string;
    url: string;
}

interface Content {
    heading: string;
    caraousel: string[];
    paragraph: string;
    links: Link[];
}

//keyframes for email icon
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`;

const ContentDisplay: React.FC = () => {
    const [content, setContent] = useState<Content[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await getContent();
                if (response) {
                    setContent(response.data);
                }
            } catch (error) {
                console.error("Error fetching content:", error);
            }
        })();
    }, []);

    return (
        <div>
            {content.map((item, index) => (
                <Box textAlign="center" p={4} key={index}>
                    <Heading as="h1" size="2xl" mb={4} fontWeight="bold">{item.heading}</Heading>

                    {/* trying the caraousel */}
                    <Box w="100%" p={0} color="white">
                        <Box w="70%" mx="auto">
                            <ImageSlider slides={SlideData} />
                        </Box>
                    </Box>

                    {/* paragraph with twitter on left and email icon on right */}
                    <Text mx="auto" fontSize="xl" p={6} style={{ backgroundColor: '#e8d4b4' }} w="70%" textAlign="center">{item.paragraph}
                        <br /> <br />
                        <Flex justify="space-between" align="center" position="relative">
                            <Box color="#008AD8">
                                <FontAwesomeIcon icon={faTwitter} size="2x" />
                            </Box>
                            <Box color="#FF5349" position="relative" animation={`${pulse} 2s infinite`}>
                                <FontAwesomeIcon icon={faEnvelope} size="2x" />
                            </Box>
                        </Flex>
                    </Text>

                    <Box>
                        {item.links.map((link, linkIndex) => (
                            <Box w="70%" mx="auto" my={5} border="2px solid black" p={6} textAlign="center" fontSize="xl" key={linkIndex}>
                                <a href={link.url} target='_blank' ><b>{link.displayText}</b></a>
                            </Box>
                        ))}
                    </Box>
                </Box>
            ))}
        </div>
    );
};

export default ContentDisplay;
