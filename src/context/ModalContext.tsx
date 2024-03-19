import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type IContext = {show: boolean; setShow: Dispatch<SetStateAction<boolean>>};

const initiaContext: IContext = {
  show: false,
  setShow: (value: any) => value,
};

const ModalContext = createContext<IContext>(initiaContext);

const ModalProvider = ({children}: PropsWithChildren): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    console.log(show);
  }, [show]);

  return (
    <ModalContext.Provider value={{show, setShow}}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = (): IContext => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export {ModalProvider, useModal};
