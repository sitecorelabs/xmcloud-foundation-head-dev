import React, { useEffect, useState } from 'react';
import {
  ImageField,
  RichTextField,
  RichText as JssRichText,
  Image as JssImageField,
  TextField,
  Text as JssTextField,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Box, Flex, Link } from '@chakra-ui/react';
import { dictionaryServiceFactory } from 'lib/dictionary-service-factory';
import config from 'temp/config';

interface Fields {
  data: {
    item: {
      description: { jsonValue: RichTextField };
      image: { jsonValue: ImageField };
      link: {
        url: string;
      };
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
      .create(config.jssAppName)
      .fetchDictionaryData(sitecoreContext.language || config.defaultLanguage)
      .then((data) => setButtonText(data['LEARN_MORE']));
  }, [sitecoreContext.language]);

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
            <Link
              className="text-sm mb-3 basis-full flex justify-center link-button items-center transition-shadow"
              href={sitecoreContext.pageEditing ? undefined : fields.data.item.link.url}
              bgGradient="linear(135deg, #8482ff 0%, #7723fe 100%)"
              _hover={{
                bgGradient: 'linear(135deg, #7723fe 0%, #7723fe 100%)',
                textDecoration: 'none',
                color: 'white',
              }}
              borderRadius="45"
              color="white"
              height="43px"
            >
              {buttonText}
            </Link>
          </Flex>
        </Box>
      )) || <h3 className="text-center">[Choose a Page as the data source for this component]</h3>}
    </div>
  );
};
