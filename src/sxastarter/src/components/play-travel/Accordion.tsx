import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

import {
  ComponentParams,
  ComponentRendering,
  Image as JssImageField,
  RichText as JssRichText,
  RichTextField,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

interface AccordionItemProps {
  heading: { jsonValue: RichTextField };
  content: { jsonValue: RichTextField };
  image: { jsonValue: ImageField };
}

interface Fields {
  data: {
    accordion: {
      children: {
        results: AccordionItemProps[];
      };
    };
  };
}

interface AccordionProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: Fields;
}

const AccordionItemRendering = (props: AccordionItemProps): JSX.Element => {
  const SIZE_OF_IMAGE = 123;

  return (
    <AccordionItem>
      <AccordionButton className="h-20" _hover={{ bgColor: 'white' }}>
        <Box className="flex justify-between font-bold w-full" fontSize="28px">
          <JssRichText field={props.heading.jsonValue} class="text-left w-full" />
          <AccordionIcon color="gray.600" className="ml-2" />
        </Box>
      </AccordionButton>
      <AccordionPanel
        borderTopWidth="1px"
        padding={{ base: '0 0 1.25rem 0', md: '1.25rem 0.75rem 1.75rem 1.5rem' }}
        className="flex justify-start flex-col md:flex-row"
      >
        <Box
          className="min-w-full max-w-full mt-5 md:mt-2.5 md:mr-10 mb-6 md:mb-0"
          minWidth={{ md: SIZE_OF_IMAGE }}
          maxWidth={{ md: SIZE_OF_IMAGE }}
          minHeight={{ base: SIZE_OF_IMAGE }}
          maxHeight={{ base: SIZE_OF_IMAGE }}
          height={{ base: SIZE_OF_IMAGE }}
        >
          <JssImageField
            style={{ width: '100%', height: '100%' }}
            alt={props?.heading.jsonValue.value}
            field={props?.image.jsonValue}
            className="w-full object-cover"
          />
        </Box>
        <Box color="color.600">
          <JssRichText field={props.content.jsonValue} className="text-base w-full leading-7" />
        </Box>
      </AccordionPanel>
    </AccordionItem>
  );
};

export const Default = (props: AccordionProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const accordionData = props.fields?.data?.accordion?.children?.results;
  const accordion = accordionData.length ? (
    <Accordion
      allowMultiple={!!props.params.CanOpenMultiple}
      allowToggle={!!!props.params.CanOpenMultiple}
      defaultIndex={props.params.ExpandedByDefault ? [0] : undefined}
    >
      {accordionData.map((accordion: AccordionItemProps) => (
        <AccordionItemRendering {...accordion} key={JSON.stringify(accordion)} />
      ))}
    </Accordion>
  ) : (
    <span className="is-empty-hint">[Accordion]</span>
  );

  return (
    <Box id={id ? id : undefined} className={`component accordion ${props.params?.styles}`}>
      {accordion}
    </Box>
  );
};
