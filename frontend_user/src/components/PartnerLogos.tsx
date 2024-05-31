import React, { useState, useEffect } from 'react';
import { Box, Button, Input, VStack } from '@chakra-ui/react';

interface Partner {
  partnerName: string;
  partnerSiteLink: string;
  partnerLogoLink: string;
  displayText: string;
}

interface PartnerLogosProps {
  index: number;
  links: Partner[];
  updateLinks: (index: number, links: Partner[]) => void;
}

const PartnerLogos: React.FC<PartnerLogosProps> = ({ index, links, updateLinks }) => {
  const [partnerLinks, setPartnerLinks] = useState<Partner[]>(links);

  useEffect(() => {
    updateLinks(index, partnerLinks);
  }, [partnerLinks, index, updateLinks]);

  const addLink = () => {
    setPartnerLinks([...partnerLinks, { partnerName: '', partnerSiteLink: '', partnerLogoLink: '', displayText: '' }]);
  };

  const updateLink = (linkIndex: number, field: keyof Partner, value: string) => {
    const newLinks = [...partnerLinks];
    newLinks[linkIndex][field] = value;
    setPartnerLinks(newLinks);
  };

  return (
    <Box>
      <VStack spacing={2}>
        {partnerLinks.map((link, linkIndex) => (
          <React.Fragment key={linkIndex}>
            <Input
              placeholder={`Enter partner name ${linkIndex + 1}`}
              value={link.partnerName}
              onChange={(e) => updateLink(linkIndex, 'partnerName', e.target.value)}
            />
            <Input
              placeholder={`Enter partner site link ${linkIndex + 1}`}
              value={link.partnerSiteLink}
              onChange={(e) => updateLink(linkIndex, 'partnerSiteLink', e.target.value)}
            />
            <Input
              placeholder={`Enter partner logo link ${linkIndex + 1}`}
              value={link.partnerLogoLink}
              onChange={(e) => updateLink(linkIndex, 'partnerLogoLink', e.target.value)}
            />
            <Input
              placeholder={`Enter display text ${linkIndex + 1}`}
              value={link.displayText}
              onChange={(e) => updateLink(linkIndex, 'displayText', e.target.value)}
            />
          </React.Fragment>
        ))}
        <Button onClick={addLink}>Add Another Partner</Button>
      </VStack>
    </Box>
  );
};

export default PartnerLogos;
