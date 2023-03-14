import React from 'react';
import {
  ComponentParams,
  ComponentRendering,
  Placeholder,
  ImageField,
} from '@sitecore-jss/sitecore-jss-nextjs';

type WrapperFields = {
  BackgroundImage: ImageField;
};

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams };
  params: ComponentParams;
  fields: WrapperFields;
}

export const Default = (props: ComponentProps): JSX.Element => {
  const containerStyles = props.params && props.params.Styles ? props.params.Styles : '';
  const styles = `${props.params.GridParameters} ${containerStyles}`.trimEnd();
  const phKey = `wrapper-${props.params.DynamicPlaceholderId}`;
  const id = props.params.RenderingIdentifier;
  const backgroundImage = props.fields.BackgroundImage.value?.src;
  let backgroundStyle: { [key: string]: string } = {};

  if (backgroundImage) {
    backgroundStyle = {
      backgroundImage: `url('${backgroundImage}')`,
    };
  }

  return (
    <div className={`container-wrapper component ${styles}`} id={id ? id : undefined}>
      <div className="component-content bg-no-repeat bg-top bg-cover" style={backgroundStyle}>
        <div className="flex-wrap flex">
          <Placeholder name={phKey} rendering={props.rendering} />
        </div>
      </div>
    </div>
  );
};
