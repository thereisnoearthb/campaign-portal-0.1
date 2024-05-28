import React, { useState } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

interface PartnerLogosProps {
  index: number;
  links?: string[];
  updateLinks: (index: number, links: string[]) => void;
}

const PartnerLogos: React.FC<PartnerLogosProps> = ({ index, links = [], updateLinks }) => {
  const [logoLinks, setLogoLinks] = useState<string[]>(links);

  const addLink = () => {
    setLogoLinks([...logoLinks, '']);
  };

  const updateLink = (linkIndex: number, value: string) => {
    const newLinks = [...logoLinks];
    newLinks[linkIndex] = value;
    setLogoLinks(newLinks);
    updateLinks(index, newLinks);
  };

  return (
    <Box>
      <VStack spacing={2}>
        {logoLinks.map((link, linkIndex) => (
          <Input
            key={linkIndex}
            placeholder={`Enter partner logo link ${linkIndex + 1}`}
            value={link}
            onChange={(e) => updateLink(linkIndex, e.target.value)}
          />
        ))}
        <Button onClick={addLink}>Add Another Link</Button>
      </VStack>
    </Box>
  );
};

export default PartnerLogos;
