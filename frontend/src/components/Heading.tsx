import React from 'react';
import { Box, Input } from '@chakra-ui/react';

interface HeadingProps {
  index: number;
  content?: string;
  updateContent: (index: number, content: string) => void;
}

const Heading: React.FC<HeadingProps> = ({ index, content, updateContent }) => {
  return (
    <Box>
      <Input
        placeholder="Enter heading text"
        value={content || ''}
        onChange={(e) => updateContent(index, e.target.value)}
      />
    </Box>
  );
};

export default Heading;
