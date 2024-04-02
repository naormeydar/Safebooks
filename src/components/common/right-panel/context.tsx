import { ReactNode, createContext, useContext, useState } from 'react';

const PANE_WIDTH = '560px';

type Context = {
  isOpen: boolean;
  Component: ReactNode | null;
  open: (node: ReactNode, width?: string | number) => void;
  close: () => void;
  width: string;
};

const RightPaneContext = createContext<Context>({} as Context);

export const useRightPane = () => useContext(RightPaneContext);

type Props = {
  children: ReactNode;
};

export const RightPaneProvider = ({ children }: Props) => {
  const [width, setWidth] = useState(PANE_WIDTH);
  const [isOpen, setIsOpen] = useState(false);
  const [node, setNode] = useState<ReactNode | null>(null);

  const open: Context['open'] = (component, _width) => {
    _width && setWidth(_width.toString());

    setNode(component);
    setIsOpen(true);
  };

  const close = () => {
    setNode(null);
    setIsOpen(false);
  };

  return (
    <RightPaneContext.Provider
      value={{
        isOpen,
        close,
        open,
        Component: node,
        width,
      }}
    >
      {children}
    </RightPaneContext.Provider>
  );
};
