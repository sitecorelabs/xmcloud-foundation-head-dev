import React, { useEffect, useState } from 'react';
import {
  ImageField,
  LinkField,
  RichTextField,
  RichText as JssRichText,
  Image as JssImageField,
  TextField,
  Text as JssTextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Box, Button, Flex } from '@chakra-ui/react';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
import config from 'temp/config';

interface Fields {
  data: {
    item: {
      description: { jsonValue: RichTextField };
      image: { jsonValue: ImageField };
      link: LinkField;
      title: { jsonValue: TextField };
    };
  };
}

export type PageCardProps = {
  params: { [key: string]: string };
  fields: Fields;
};

export const Default = ({ params, fields }: PageCardProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();
  const id = params.RenderingIdentifier;
  const [buttonText, setButtonText] = useState<string>('');

  useEffect(() => {
    dictionaryServiceFactory
      .create()
      .fetchDictionaryData(sitecoreContext.language || config.defaultLanguage)
      .then((data) => setButtonText(data['LEARN_MORE']));
  }, []);

  return (
    <div className={`component page-card ${params.styles.trimEnd()}`} id={id ? id : undefined}>
      {(fields.data.item && (
        <Box
          className="component-content my-4"
          boxShadow="2px 8px 8px 0 rgba(190,190,190,0.25)"
          backgroundColor="blackAlpha.50"
          borderRadius="30"
        >
          <JssImageField
            style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
            alt={fields.data.item?.title.jsonValue}
            field={fields.data.item?.image.jsonValue}
            className="w-full"
            height={285}
          />
          <Box className="flex-1 px-5 py-5">
            <Box className="font-bold text-xl md:text-2xl">
              <JssTextField field={fields.data.item?.title.jsonValue} />
            </Box>
            <Box className="flex-1 mt-5 text-sm md:text-lg" color="gray.500">
              <JssRichText field={fields.data.item?.description.jsonValue} />
            </Box>
          </Box>
          <Flex className="pt-0 md:pt-5 pb-5 px-5">
            <Button
              bgGradient="linear(135deg, #8482FF, #7723FE)"
              className="text-sm mb-3 basis-full"
              _hover={{ bg: '#7723FE' }}
              colorScheme="purple"
              borderRadius="45"
              height="43px"
            >
              {buttonText}
            </Button>
          </Flex>
        </Box>
      )) || <h3 className="text-center">Choose a Page as the data source for this component</h3>}
    </div>
  );
};
