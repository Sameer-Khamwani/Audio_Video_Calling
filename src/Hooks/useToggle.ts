import {useState} from 'react';
import { UseToggleResult } from '../Utils/interface';

const useToggle = (initialState: boolean = false): UseToggleResult => {
  const [data, setData] = useState(null);
  const [show, setShow] = useState(initialState);

  const toggle = (data: any = null) => {
    setData(data);
    if (show) {
      setShow(false);
    } else {
      setTimeout(() => {
        setShow(prev => !prev);
      }, 400);
    }
  };
  return [show, setShow, toggle, data];
};

export default useToggle;
