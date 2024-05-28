import React from 'react';
import { Box, Textarea, Input, VStack } from '@chakra-ui/react';

interface ParagraphProps {
  index: number;
  content?: string;
  twitterLink?: string;
  emailLink?: string;
  updateContent: (index: number, content: string, twitterLink: string, emailLink: string) => void;
}

const Paragraph: React.FC<ParagraphProps> = ({ index, content, twitterLink, emailLink, updateContent }) => {
  const [text, setText] = React.useState(content || '');
  const [twitter, setTwitter] = React.useState(twitterLink || '');
  const [email, setEmail] = React.useState(emailLink || '');

  React.useEffect(() => {
    updateContent(index, text, twitter, email);
  }, [text, twitter, email, index, updateContent]);

  return (
    <Box>
      <VStack spacing={2}>
        <Textarea
          placeholder="Enter paragraph text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          placeholder="Enter Twitter link"
          value={twitter}
          onChange={(e) => setTwitter(e.target.value)}
        />
        <Input
          placeholder="Enter email link"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </VStack>
    </Box>
  );
};

export default Paragraph;
