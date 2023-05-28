declare module 'react-to-pdf' {
  import { RefObject, ReactNode } from 'react';

  function ReactToPdf(
    targetRef?: any,
    filename?: string,
    x?: number,
    y?: number,
    options?: object,
    onComplete?: Function,
    scale?: number,
  ): JSX.Element;

  export = ReactToPdf;
}
