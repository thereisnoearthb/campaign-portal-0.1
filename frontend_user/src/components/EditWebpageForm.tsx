import React, { useState } from 'react';
import { Box, VStack, Input, Textarea, Button, Text, HStack, IconButton, Select } from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';

interface EditWebpageFormProps {
    webpage: Webpage;
    onUpdate: (updatedWebpage: Webpage) => void;
}

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

const EditWebpageForm: React.FC<EditWebpageFormProps> = ({ webpage, onUpdate }) => {
    const [elements, setElements] = useState(webpage.elements);
    const [newElementType, setNewElementType] = useState('');

    const handleInputChange = (index: number, field: string, value: string) => {
        const newElements = [...elements];
        (newElements[index] as any)[field] = value;
        setElements(newElements);
    };

    const handleLinksChange = (index: number, links: { link: string; displayText: string }[]) => {
        const newElements = [...elements];
        (newElements[index] as any).links = links;
        setElements(newElements);
    };

    const handlePartnerLogosChange = (index: number, partnerLogos: { partnerName: string; partnerSiteLink: string; partnerLogoLink: string; displayText: string }[]) => {
        const newElements = [...elements];
        (newElements[index] as any).partnerLogos = partnerLogos;
        setElements(newElements);
    };

    const handleDeleteLink = (elementIndex: number, linkIndex: number) => {
        const newElements = [...elements];
        newElements[elementIndex].links?.splice(linkIndex, 1);
        setElements(newElements);
    };

    const handleDeletePartnerLogo = (elementIndex: number, logoIndex: number) => {
        const newElements = [...elements];
        newElements[elementIndex].partnerLogos?.splice(logoIndex, 1);
        setElements(newElements);
    };

    const handleAddLink = (elementIndex: number) => {
        const newElements = [...elements];
        if (!newElements[elementIndex].links) {
            newElements[elementIndex].links = [];
        }
        newElements[elementIndex].links!.push({ link: '', displayText: '' });
        setElements(newElements);
    };

    const handleAddPartnerLogo = (elementIndex: number) => {
        const newElements = [...elements];
        if (!newElements[elementIndex].partnerLogos) {
            newElements[elementIndex].partnerLogos = [];
        }
        newElements[elementIndex].partnerLogos!.push({ partnerName: '', partnerSiteLink: '', partnerLogoLink: '', displayText: '' });
        setElements(newElements);
    };

    const handleDelete = (index: number) => {
        const newElements = elements.filter((_, i) => i !== index);
        setElements(newElements);
    };

    const handleSave = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/webpage/update/${webpage._id}`, { elements });
            onUpdate(response.data);
        } catch (error) {
            console.error('Error updating webpage:', error);
        }
    };

    const handleAddNewElement = () => {
        if (newElementType) {
            const newElements = [...elements, { type: newElementType }];
            setElements(newElements);
            setNewElementType('');
        }
    };

    return (
        <Box>
            <br />
            <VStack spacing={4} align="stretch">
                {elements.map((element, index) => (
                    <Box key={index} p={4} borderWidth={1} borderRadius="md">
                        <HStack justify="space-between">
                            <Text fontWeight="bold">{element.type}</Text>
                            <Button colorScheme="red" size="sm" onClick={() => handleDelete(index)}>
                                Delete Element
                            </Button>
                        </HStack>
                        {element.type === 'heading' && (
                            <>
                                <br />
                                <Input
                                    placeholder="Enter heading content"
                                    value={element.content || ''}
                                    onChange={(e) => handleInputChange(index, 'content', e.target.value)}
                                />
                            </>
                        )}
                        {element.type === 'paragraph' && (
                            <>
                                <br />
                                <Textarea
                                    placeholder="Enter paragraph content"
                                    value={element.content || ''}
                                    onChange={(e) => handleInputChange(index, 'content', e.target.value)}
                                />
                                <Input
                                    placeholder="Enter Twitter link"
                                    value={element.twitterLink || ''}
                                    onChange={(e) => handleInputChange(index, 'twitterLink', e.target.value)}
                                />
                                <Input
                                    placeholder="Enter email link"
                                    value={element.emailLink || ''}
                                    onChange={(e) => handleInputChange(index, 'emailLink', e.target.value)}
                                />
                            </>
                        )}
                        {element.type === 'carousel' && (
                            <>
                                <br />
                                <VStack spacing={2}>
                                    {element.links?.map((link, linkIndex) => (
                                        <HStack key={linkIndex} w="100%">
                                            <Input
                                                placeholder="Enter link URL"
                                                value={link.link}
                                                onChange={(e) => handleLinksChange(index, element.links!.map((l, i) => i === linkIndex ? { ...l, link: e.target.value } : l))}
                                            />
                                            <Input
                                                placeholder="Enter display text"
                                                value={link.displayText}
                                                onChange={(e) => handleLinksChange(index, element.links!.map((l, i) => i === linkIndex ? { ...l, displayText: e.target.value } : l))}
                                            />
                                            <IconButton
                                                aria-label="Delete link"
                                                icon={<CloseIcon />}
                                                onClick={() => handleDeleteLink(index, linkIndex)}
                                            />
                                        </HStack>
                                    ))}
                                    <Button onClick={() => handleAddLink(index)} colorScheme="green" size="sm">
                                        Add Another Link
                                    </Button>
                                </VStack>
                            </>
                        )}
                        {element.type === 'links' && (
                            <>
                                <br />
                                <VStack spacing={2}>
                                    {element.links?.map((link, linkIndex) => (
                                        <HStack key={linkIndex} w="100%">
                                            <Input
                                                placeholder="Enter link URL"
                                                value={link.link}
                                                onChange={(e) => handleLinksChange(index, element.links!.map((l, i) => i === linkIndex ? { ...l, link: e.target.value } : l))}
                                            />
                                            <Input
                                                placeholder="Enter display text"
                                                value={link.displayText}
                                                onChange={(e) => handleLinksChange(index, element.links!.map((l, i) => i === linkIndex ? { ...l, displayText: e.target.value } : l))}
                                            />
                                            <IconButton
                                                aria-label="Delete link"
                                                icon={<CloseIcon />}
                                                onClick={() => handleDeleteLink(index, linkIndex)}
                                            />
                                        </HStack>
                                    ))}
                                    <Button onClick={() => handleAddLink(index)} colorScheme="green" size="sm">
                                        Add Another Link
                                    </Button>
                                </VStack>
                            </>
                        )}
                        {element.type === 'youtubeVideo' && (
                            <>
                                <br />
                                <Input
                                    placeholder="Enter YouTube video link"
                                    value={element.content || ''}
                                    onChange={(e) => handleInputChange(index, 'content', e.target.value)}
                                />
                            </>
                        )}
                        {element.type === 'partnerLogos' && (
                            <>
                                <br />
                                <VStack spacing={2}>
                                    {element.partnerLogos?.map((logo, logoIndex) => (
                                        <HStack key={logoIndex} w="100%">
                                            <Input
                                                placeholder="Enter partner name"
                                                value={logo.partnerName}
                                                onChange={(e) => handlePartnerLogosChange(index, element.partnerLogos!.map((l, i) => i === logoIndex ? { ...l, partnerName: e.target.value } : l))}
                                            />
                                            <Input
                                                placeholder="Enter partner site link"
                                                value={logo.partnerSiteLink}
                                                onChange={(e) => handlePartnerLogosChange(index, element.partnerLogos!.map((l, i) => i === logoIndex ? { ...l, partnerSiteLink: e.target.value } : l))}
                                            />
                                            <Input
                                                placeholder="Enter partner logo link"
                                                value={logo.partnerLogoLink}
                                                onChange={(e) => handlePartnerLogosChange(index, element.partnerLogos!.map((l, i) => i === logoIndex ? { ...l, partnerLogoLink: e.target.value } : l))}
                                            />
                                            <IconButton
                                                aria-label="Delete partner logo"
                                                icon={<CloseIcon />}
                                                onClick={() => handleDeletePartnerLogo(index, logoIndex)}
                                            />
                                        </HStack>
                                    ))}
                                    <Button onClick={() => handleAddPartnerLogo(index)} colorScheme="green" size="sm">
                                        Add Another Partner
                                    </Button>
                                </VStack>
                            </>
                        )}
                    </Box>
                ))}
                <Box width="100%" overflowX="auto" overflowY="auto">
                    <HStack spacing={4}>
                        <Select placeholder="Select element type" value={newElementType} onChange={(e) => setNewElementType(e.target.value)}>
                            <option value="heading">Heading</option>
                            <option value="paragraph">Paragraph</option>
                            <option value="carousel">Carousel</option>
                            <option value="links">Links</option>
                            <option value="youtubeVideo">YouTube Video</option>
                            <option value="partnerLogos">Partner Logos</option>
                        </Select>
                        <Button onClick={handleAddNewElement} colorScheme="green">Add Element</Button>
                    </HStack>
                </Box>
                <Button onClick={handleSave} colorScheme="blue">Save Changes</Button>
            </VStack>
        </Box>
    );
};

export default EditWebpageForm;
