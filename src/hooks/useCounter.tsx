import React, {useState} from 'react';

const useCounter = (initialCount: number): any => {
  const [count, setCount] = useState(initialCount);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    setCount(count - 1);
  };

  return {count, increment, decrement};
};

export default useCounter;
