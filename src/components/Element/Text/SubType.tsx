import React, { CSSProperties, FC, ReactElement } from "react";

interface SubType {
  type: string;
  className: string;
  style: CSSProperties | undefined;
  children: ReactElement | string;
}
export const SubType: FC<SubType> = (props) => {
  switch (props.type) {
    case "text": {
      return (
        <div className={props.className} style={props.style}>
          {props.children}
        </div>
      );
    }
    case "heading1": {
      return (
        <h1 className={props.className} style={props.style}>
          {props.children}
        </h1>
      );
    }
    case "heading2": {
      return (
        <h2 className={props.className} style={props.style}>
          {props.children}
        </h2>
      );
    }
    case "heading3": {
      return (
        <h3 className={props.className} style={props.style}>
          {props.children}
        </h3>
      );
    }
  }
};
