import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

interface Link {
  link: string;
  displayText: string;
}

interface CarouselProps {
  updateLinks: (index: number, links: Link[]) => void;
  index: number;
}

const Carousel: React.FC<CarouselProps> = ({ updateLinks, index }) => {
  const [links, setLinks] = useState<Link[]>([{ link: '', displayText: '' }]);

  const addLink = () => {
    setLinks([...links, { link: '', displayText: '' }]);
  };

  const updateLink = (linkIndex: number, field: keyof Link, value: string) => {
    const newLinks = [...links];
    newLinks[linkIndex][field] = value;
    setLinks(newLinks);
    updateLinks(index, newLinks);
  };

  useEffect(() => {
    updateLinks(index, links);
  }, [index, links, updateLinks]);

  return (
    <Box>
      <VStack spacing={2}>
        {links.map((link, linkIndex) => (
          <React.Fragment key={linkIndex}>
            <Input
              placeholder={`Enter link ${linkIndex + 1}`}
              value={link.link}
              onChange={(e) => updateLink(linkIndex, 'link', e.target.value)}
            />
            <Input
              placeholder={`Enter display text ${linkIndex + 1}`}
              value={link.displayText}
              onChange={(e) => updateLink(linkIndex, 'displayText', e.target.value)}
            />
          </React.Fragment>
        ))}
        <Button onClick={addLink}>Add Another Link</Button>
      </VStack>
    </Box>
  );
};

export default Carousel;
