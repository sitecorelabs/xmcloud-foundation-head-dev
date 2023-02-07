import React from 'react';
import {
  ImageField,
  RichText as JssRichText,
  TextField,
  LinkField,
  Field,
  Text as JssTextField,
  Image as JssImageField,
  Link as JssLink,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Box, Flex, Button } from '@chakra-ui/react';

const VISIBLE_SLOTS = 3;
const LINK_CLASS_NAME = 'sc-sxa-link-with-reload';

interface SlotField {
  jsonValue: LinkField;
  targetItem: {
    content: { jsonValue: Field<string> };
    image: { jsonValue: ImageField };
    title: { jsonValue: TextField };
  };
}

type Slot = {
  field: SlotField;
};

interface Fields {
  data: {
    datasource: {
      children: {
        results: Slot[];
      };
      field: {
        title: TextField;
      };
    };
  };
}

type SlotsItemProps = {
  key: string;
  field: SlotField;
};

export type SlotsProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const SlotsItem = ({ field }: SlotsItemProps) => {
  return field.targetItem ? (
    <Box
      className="slot-card basis-full md:basis-1/3 flex flex-col my-4 p-0"
      boxShadow="2px 8px 8px 0 rgba(190,190,190,0.25)"
      backgroundColor="blackAlpha.50"
      borderRadius="30"
    >
      <JssImageField
        style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
        alt={field.targetItem?.title.jsonValue.value}
        field={field.targetItem?.image.jsonValue}
        className="w-full"
        height={285}
      />
      <Box className="flex-1 px-5 py-5">
        <Box className="font-bold text-xl md:text-2xl">
          <JssTextField field={field.targetItem?.title.jsonValue} />
        </Box>
        <Box className="flex-1 mt-5 text-sm md:text-lg" color="gray.500">
          <JssRichText field={field.targetItem?.content.jsonValue} />
        </Box>
      </Box>
      <Flex className="pt-0 md:pt-5 pb-5 px-5">
        <Button
          bgGradient="linear(135deg, #8482FF, #7723FE)"
          className="font-normal mb-3 basis-full"
          _hover={{ bg: '#7723FE' }}
          colorScheme="purple"
          borderRadius="45"
          height="43px"
        >
          <JssLink className={`text-sm ${LINK_CLASS_NAME}`} field={field.jsonValue} />
        </Button>
      </Flex>
    </Box>
  ) : (
    <Box className="basis-1/3 flex flex-col items-center py-5">
      <JssLink className={LINK_CLASS_NAME} field={field.jsonValue} />
    </Box>
  );
};

export const Default = ({ params, fields }: SlotsProps): JSX.Element => {
  const id = params.RenderingIdentifier;
  const datasource = fields?.data?.datasource;
  const slots = fields ? (
    <>
      {datasource.children.results.map((element: Slot, key: number) => (
        <>{key < VISIBLE_SLOTS && <SlotsItem key={`${key}`} field={element.field} />}</>
      ))}
    </>
  ) : (
    <span className="is-empty-hint">[Slots]</span>
  );

  return (
    <div className={`component slots ${params.styles.trimEnd()}`} id={id ? id : undefined}>
      <Box className="font-bold text-2xl md:text-5xl">
        <JssTextField field={fields?.data?.datasource.field.title} />
      </Box>
      <Flex className="grid columns-1 md:columns-3 flex-col md:flex-row gap-0 md:gap-8 mt-6 md:mt-12">
        {slots}
      </Flex>
    </div>
  );
};
