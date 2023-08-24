interface Element {
  id: string;
  type: string;
  content: string;
  style: unknown;
}

interface WrapperProps {
  element: Element;
  index: number;
}

type RenderElement = (
  element: Element,
  index: number,
  active: boolean
) => JSX.Element;

export type { Element, WrapperProps, RenderElement };
