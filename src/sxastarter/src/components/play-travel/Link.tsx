import { Flex } from '@chakra-ui/react';
import {
  ComponentParams,
  ComponentRendering,
  Link as JssLink,
  LinkField,
} from '@sitecore-jss/sitecore-jss-nextjs';
import Image from 'next/image';
import Arrow from '../../assets/images/arrow.svg';

type LinkProps = {
  fields: {
    Link: LinkField;
  };
  rendering: ComponentRendering & { params: ComponentParams };
  params?: { [key: string]: string };
  children?: JSX.Element;
};

export const ButtonWithArrow = (props: LinkProps): JSX.Element => {
  const datasource = props.rendering?.dataSource;

  return (
    <CommonLinkComponent {...props}>
      <div className="component-content justify-between button-link font-inter flex items-center px-6 py-1 sm:py-4 text-lg rounded-full font-medium">
        {(datasource && <JssLink field={props.fields.Link} />) || <h3>Link</h3>}
        <Flex className="circle-bg h-6 w-6 lg:h-8 lg:w-8 justify-center rounded-full align-center ml-3.5">
          <Image className="inline" alt={props.fields.Link.value.text || ''} src={Arrow} />
        </Flex>
      </div>
    </CommonLinkComponent>
  );
};

export const Button = (props: LinkProps): JSX.Element => {
  const datasource = props.rendering?.dataSource;

  return (
    <CommonLinkComponent {...props}>
      <div className="component-content justify-center button-link font-inter px-6 py-1 text-lg rounded-full font-medium">
        {(datasource && <JssLink field={props.fields.Link} />) || <h3>[Link]</h3>}
      </div>
    </CommonLinkComponent>
  );
};

export const Default = (props: LinkProps): JSX.Element => {
  const datasource = props.rendering?.dataSource;

  return (
    <CommonLinkComponent {...props}>
      <div className="component-content">
        {(datasource && <JssLink field={props.fields.Link} />) || <h3>[Link]</h3>}
      </div>
    </CommonLinkComponent>
  );
};

const CommonLinkComponent = (props: LinkProps): JSX.Element => {
  const styles = `component link flex items-center ${props.params?.styles}`.trimEnd();
  const id = props.params?.RenderingIdentifier;

  return (
    <div className={styles} id={id ? id : undefined}>
      {props.children}
    </div>
  );
};
