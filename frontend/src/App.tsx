import React, { useState } from 'react';
import { ChakraProvider, Box, Button, VStack, Select } from '@chakra-ui/react';
import Heading from './components/Heading';
import Paragraph from './components/Paragraph';
import Carousel from './components/Carousel';
import Links from './components/Links';
import YouTubeVideo from './components/YouTubeVideo';
import PartnerLogos from './components/PartnerLogos';
import axios from 'axios';

interface Link {
  link: string;
  displayText: string;
}

interface Partner {
  partnerName: string;
  partnerSiteLink: string;
  partnerLogoLink: string;
  displayText: string;
}

type Element = {
  type: string;
  content?: string;
  twitterLink?: string;
  emailLink?: string;
  links?: Link[] | Partner[]; 
};

const App: React.FC = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [selectedElement, setSelectedElement] = useState<string>('');

  const addElement = () => {
    setElements([...elements, { type: selectedElement }]);
    setSelectedElement('');
  };

  const updateContent = (index: number, content: string, twitterLink?: string, emailLink?: string) => {
    const newElements = [...elements];
    newElements[index] = { ...newElements[index], content, twitterLink, emailLink };
    setElements(newElements);
  };

  const updateLinks = (index: number, links: Link[] | Partner[]) => {
    const newElements = [...elements];
    if (elements[index].type === 'partnerLogos') {
      (newElements[index] as any) = { ...newElements[index], partnerLogos: links as Partner[] };
    } else {
      newElements[index] = { ...newElements[index], links };
    }
    setElements(newElements);
  };
  
  

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/webpage/save', { elements });
      alert('Webpage saved successfully!');
    } catch (error) {
      console.error('Error saving webpage:', error);
      alert('Error saving webpage');
    }
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack spacing={4} align="stretch">
          <Select placeholder="Select element to add" value={selectedElement} onChange={(e) => setSelectedElement(e.target.value)}>
            <option value="heading">Heading</option>
            <option value="paragraph">Paragraph</option>
            <option value="carousel">Carousel</option>
            <option value="links">Links</option>
            <option value="youtubeVideo">YouTube Video</option>
            <option value="partnerLogos">Partner Logos</option>
          </Select>
          <Button onClick={addElement} isDisabled={!selectedElement}>Add Element</Button>
          {elements.map((element, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="lg">
              {element.type === 'heading' && <Heading index={index} content={element.content} updateContent={(i, content) => updateContent(i, content)} />}
              {element.type === 'paragraph' && <Paragraph index={index} content={element.content} twitterLink={element.twitterLink} emailLink={element.emailLink} updateContent={updateContent} />}
              {element.type === 'carousel' && <Carousel index={index} updateLinks={updateLinks} />}
              {element.type === 'links' && <Links index={index} links={element.links as Link[]} updateLinks={updateLinks} />}
              {element.type === 'youtubeVideo' && <YouTubeVideo index={index} content={element.content} updateContent={(i, content) => updateContent(i, content)} />}
              {element.type === 'partnerLogos' && <PartnerLogos index={index} links={element.links as Partner[]} updateLinks={updateLinks} />} 
            </Box>
          ))}
          <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
