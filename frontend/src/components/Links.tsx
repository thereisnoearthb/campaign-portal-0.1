import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

interface Link {
  link: string;
  displayText: string;
}

interface LinksProps {
  index: number;
  links?: Link[];
  updateLinks: (index: number, links: Link[]) => void;
}

const Links: React.FC<LinksProps> = ({ index, links = [], updateLinks }) => {
  const [linkList, setLinkList] = useState<Link[]>(links);

  useEffect(() => {
    updateLinks(index, linkList);
  }, [linkList, index, updateLinks]);

  const addLink = () => {
    setLinkList([...linkList, { link: '', displayText: '' }]);
  };

  const updateLink = (linkIndex: number, field: keyof Link, value: string) => {
    const newLinks = [...linkList];
    newLinks[linkIndex][field] = value;
    setLinkList(newLinks);
  };

  return (
    <Box>
      <VStack spacing={2}>
        {linkList.map((link, linkIndex) => (
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

export default Links;
