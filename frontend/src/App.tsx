import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, Button, VStack, Select, FormLabel, FormControl, Input, Text, Flex } from '@chakra-ui/react';
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

  //login functionality
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Check local storage for token
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token by making request to protected route
      axios.get('http://localhost:5000/api/auth/protected', {
        headers: { Authorization: token }
      }).then(response => {
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      }).catch(() => {
        localStorage.removeItem('token'); // Remove invalid token
      });
    }
  }, []);

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token); // token store
        setIsLoggedIn(true);
      }
      setMessage(response.data.message);
    } catch (error) {
      setMessage((error as { response: { data: { message: string } } }).response?.data?.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token'); 
  };
  //login functionality ends

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
        {isLoggedIn ? (
          <>
            <Flex borderWidth={1} borderRadius="md" p={2} align="center" justify="space-between">
              <Button mt={4} colorScheme="teal" onClick={handleLogout}>Logout</Button>
              <a href="http://localhost:3001" style={{ color: 'blue' }} target='_blank' rel='noopener'>Access HTML generator Portal here</a>
            </Flex>
            <br /> <br />
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
          </>
        )
          :
          (
            <Box>
              <h2>Please log in</h2>
              <form onSubmit={handleLogin}>
                <FormControl id="username" mb={4}>
                  <FormLabel>Username:</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" mb={4}>
                  <FormLabel>Password:</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Flex borderWidth={1} borderRadius="md" p={2} align="center" justify="space-between">
                  <Button type="submit" colorScheme="teal">Login</Button>
                  <a href="http://localhost:3001" style={{ color: 'blue' }} target='_blank' rel='noopener'>Access HTML generator portal here</a>
                </Flex>
              </form>
              <br />

              {message && <Text mt={4}>{message}</Text>}
            </Box>
          )
        }
      </Box>
    </ChakraProvider>
  );
};

export default App;
