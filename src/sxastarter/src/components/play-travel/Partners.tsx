import React from 'react';
import {
  Field,
  ImageField,
  Image as JssImageField,
  RichText as JssRichText,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Box, Flex } from '@chakra-ui/react';

type Partner = {
  image: { jsonValue: ImageField };
  description: { jsonValue: Field<string> };
};

type Partners = {
  children: {
    results: Partner[];
  };
};

interface Fields {
  data: {
    partners: Partners | null;
  };
}

export type PartnersProps = {
  params: { [key: string]: string };
  fields: Fields;
};

const PartnersRender = (partners: Partners): JSX.Element => {
  return (
    <Flex className="items-start flex-col gap-5">
      {partners.children.results.map((partnerItem, idx) => (
        <Box
          className="flex justify-start flex-row rounded-3xl w-full items-center"
          key={idx}
          bgColor="white"
          minH="170px"
        >
          <Flex
            w={{ base: '120px', md: '210px' }}
            className="justify-center px-4 mg:px-6 flex-shrink-0"
          >
            <JssImageField
              alt={partnerItem.image.jsonValue.value?.alt}
              field={partnerItem.image.jsonValue}
              style={{ width: '110px' }}
            />
          </Flex>
          <JssRichText
            field={partnerItem.description.jsonValue}
            className="pr-10 py-4 grow text-sm md:text-base lg:text-xl"
          />
        </Box>
      ))}
    </Flex>
  );
};

export const Default = (props: PartnersProps): JSX.Element => {
  const id = props.params.RenderingIdentifier;
  const { partners } = props.fields.data;
  const partnersComponentBody = (
    <>
      {partners && partners.children.results.length > 0 ? (
        <PartnersRender {...partners} />
      ) : (
        <span className="is-empty-hint">Partners</span>
      )}
    </>
  );

  return (
    <div className={`partners component ${props.params.styles}`} id={id ? id : undefined}>
      <div className="component-content">{partnersComponentBody}</div>
    </div>
  );
};
