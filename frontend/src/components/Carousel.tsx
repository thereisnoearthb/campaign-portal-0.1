import React, { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

interface CarouselProps {
  updateLinks: (index: number, links: string[]) => void;
  index: number;
}

const Carousel: React.FC<CarouselProps> = ({ updateLinks, index }) => {
  const [links, setLinks] = useState<string[]>(['']);
  
  const addLink = () => {
    setLinks([...links, '']);
  };

  const updateLink = (linkIndex: number, value: string) => {
    const newLinks = [...links];
    newLinks[linkIndex] = value;
    setLinks(newLinks);
    updateLinks(index, newLinks);
  };

  return (
    <Box>
      <VStack spacing={2}>
        {links.map((link, linkIndex) => (
          <Input
            key={linkIndex}
            placeholder={`Enter link ${linkIndex + 1}`}
            value={link}
            onChange={(e) => updateLink(linkIndex, e.target.value)}
          />
        ))}
        <Button onClick={addLink}>Add Another Link</Button>
      </VStack>
    </Box>
  );
};

export default Carousel;
