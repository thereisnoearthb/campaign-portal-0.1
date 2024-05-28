import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

interface LinksProps {
  index: number;
  links?: string[];
  updateLinks: (index: number, links: string[]) => void;
}

const Links: React.FC<LinksProps> = ({ index, links = [], updateLinks }) => {
  const [linkList, setLinkList] = useState<string[]>(links);

  useEffect(() => {
    updateLinks(index, linkList);
  }, [linkList, index, updateLinks]);

  const addLink = () => {
    setLinkList([...linkList, '']);
  };

  const updateLink = (linkIndex: number, value: string) => {
    const newLinks = [...linkList];
    newLinks[linkIndex] = value;
    setLinkList(newLinks);
  };

  return (
    <Box>
      <VStack spacing={2}>
        {linkList.map((link, linkIndex) => (
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

export default Links;
