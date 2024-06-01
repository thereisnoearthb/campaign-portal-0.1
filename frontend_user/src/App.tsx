import React, { useEffect, useState } from 'react';
import { ChakraProvider, Box, VStack, Button, Flex, Heading, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import EditWebpageForm from './components/EditWebpageForm';

interface Webpage {
  _id: string;
  elements: {
    type: string;
    content?: string;
    twitterLink?: string;
    emailLink?: string;
    links?: { link: string; displayText: string }[] | undefined;
    partnerLogos?: { partnerName: string; partnerSiteLink: string; partnerLogoLink: string; displayText: string }[] | undefined;
  }[];
}

const App: React.FC = () => {
  const [webpages, setWebpages] = useState<Webpage[]>([]);
  const [selectedWebpage, setSelectedWebpage] = useState<Webpage | null>(null);

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
        localStorage.removeItem('token'); 
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

  useEffect(() => {
    const fetchWebpages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/webpage/webpages');
        setWebpages(response.data);
      } catch (error) {
        console.error('Error fetching webpages:', error);
      }
    };

    fetchWebpages();
  }, []);

  const getHeading = (elements: Webpage['elements']) => {
    const headingElement = elements.find(element => element.type === 'heading');
    return headingElement ? headingElement.content : 'No Heading';
  };

  const handleButtonClick = (elements: Webpage['elements']) => {
    const htmlPage = generateHTMLPage(elements);
    const blob = new Blob([htmlPage], { type: 'text/html' });
    saveAs(blob, 'generated_page.html');
  };

  //editing functionality start
  const handleEditClick = (webpage: Webpage) => {
    if (selectedWebpage && selectedWebpage._id === webpage._id) {
      setSelectedWebpage(null);
    } else {
      setSelectedWebpage(webpage);
    }
  };

  const handleUpdate = (updatedWebpage: Webpage) => {
    setWebpages((prev) =>
      prev.map((webpage) => (webpage._id === updatedWebpage._id ? updatedWebpage : webpage))
    );
    setSelectedWebpage(null);
  };
  //editing functionality end

  const generateHTMLSnippet = (element: {
    type: string;
    content?: string;
    twitterLink?: string;
    emailLink?: string;
    links?: { link: string; displayText: string }[] | undefined;
    partnerLogos?: { partnerName: string; partnerSiteLink: string; partnerLogoLink: string; displayText: string }[] | undefined;
  }) => {
    switch (element.type) {
      case 'heading':
        return `<!-- heading -->
                <center>
                <h2>${element.content || ''}</h2>
                </center>
                <!-- heading ends -->`;
      case 'paragraph':
        return `<!-- paragraph -->
                  <div class="yellow-card">
                    <p>${element.content || ''}</p>
                    <div class="social-buttons-container">
                      ${element.twitterLink ? `<a id="tweet-quote" target="_blank" class="fa fa-twitter twitter-button" title="Tweet this Quote!" href="${element.twitterLink}">Tweet!</a>` : ''}
                      ${element.emailLink ? `<a href="mailto:${element.emailLink}" target="_blank" class="halfway-fab waves-effect waves-light btn-large red pulse email-button"><i class="large material-icons">forward_to_inbox</i></a>` : ''}
                    </div>
                  </div>
                <!-- paragraph ends -->`;

      case 'carousel':
        return `<!-- carousel -->
        <div class="card-image large">
          <div
            class="main-carousel carousel carousel-slider no-autoinit"
            data-flickity='{ "wrapAround": true,"contain":true,"imagesLoaded": true, "percentPosition": false }'
          >
            ${element.links?.map(link => {
          return `<div class="carousel-cell"><img src="${link.link}" alt="${link.displayText}" style=" background-size: cover; width: 100%"/></div>`;
        }).join('') || ''}
          </div>
        </div>
      <!-- carousel ends -->`;
      case 'links':
        return `<!-- links (outgoing) -->
        ${element.links?.map(link => {
          return `<a class="link" target="_blank" href="${link.link}">${link.displayText}</a>`;
        }).join('') || ''}
      <!-- links ends -->`;
      case 'youtubeVideo':
        return `<!-- youtube -->
                  <div class="video-container">
                    <iframe width="853" height="480" src="${element.content}" frameborder="0" allowfullscreen></iframe>
                  </div>
                <!-- youtube ends -->`;
      case 'partnerLogos':
        return `<!-- partner logo -->
        <div class="org-logo">
          ${element.partnerLogos?.map(link => {
          return `<div class="org-img-div column"><img class="org-img" src="${link.partnerLogoLink}" alt="${link.displayText}" loading="lazy"/><a class="img-link" target="_blank" href="${link.partnerSiteLink}">${link.partnerName}</a></div>`;
        }).join('') || ''}
        </div>
        <!-- partner logo ends -->`;
      default:
        return '';
    }
  };

  const generateHTMLPage = (elements: {
    type: string;
    content?: string;
    twitterLink?: string;
    emailLink?: string;
    links?: { link: string; displayText: string }[] | undefined;
    partnerLogos?: { partnerName: string; partnerSiteLink: string; partnerLogoLink: string; displayText: string }[] | undefined;
  }[]) => {
    const htmlSnippets = elements.map(element => generateHTMLSnippet(element)).join('\n');
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link
          rel="icon"
          href="https://thereisnoearthb.com/TINEB_LOGO.jpeg"
          type="image/x-icon"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://thereisnoearthb.com/css/materialize.css"
          media="screen,projection"
        />
        <link
          type="text/css"
          rel="stylesheet"
          href="https://thereisnoearthb.com/style.css"
          media="screen,projection"
        />

        <!--
        Import Google Icon Font
        Theme sourced from https://materializecss.com/getting-started.html
        -->
        
        <link
          rel="stylesheet"
          href="https://unpkg.com/flickity@2/dist/flickity.min.css"
        />

        <link rel="stylesheet" href="main.css" />
        <title>Generated Page</title>
      </head>
      <body>
        <script src="https://unpkg.com/flickity@2/dist/flickity.pkgd.min.js"></script>

        <div id="links">
          <div class="row container">
            <div class="">
              <strong>
                ${htmlSnippets}
              </strong>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        {isLoggedIn ? (
          <>
            <Flex borderWidth={1} borderRadius="md" p={2} align="center" justify="space-between">
              <a href="http://localhost:3000" style={{ color: 'blue' }} target='_blank'>Access Element Selector Portal here</a>
              <Button mt={4} colorScheme="teal" onClick={handleLogout}>Logout</Button>
            </Flex>
            <br /> <br />
            <VStack spacing={4} align="stretch">
              {webpages.map((webpage) => (
                <Flex key={webpage._id} borderWidth={1} borderRadius="md" p={4} align="center" justify="space-between">
                  <Button onClick={() => handleButtonClick(webpage.elements)}>
                    {getHeading(webpage.elements)}
                  </Button>
                  <Button onClick={() => handleEditClick(webpage)} colorScheme="blue">
                    {selectedWebpage && selectedWebpage._id === webpage._id ? 'Close' : 'Edit'}
                  </Button>
                </Flex>
              ))}
            </VStack>
            {selectedWebpage && (
              <EditWebpageForm webpage={selectedWebpage} onUpdate={handleUpdate} />
            )}
          </>
        )
          :
          (
            <Box>
              <Heading>Please log in</Heading>
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
                  <a href="http://localhost:3000" style={{ color: 'blue' }} target='_blank'>Access Element Selector Portal here</a>
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
