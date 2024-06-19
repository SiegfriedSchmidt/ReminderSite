import React, {FC, InputHTMLAttributes, useEffect} from 'react';
import EditFieldInput from "./EditFieldInput.tsx";
import {animated, useSpring} from "@react-spring/web";

const AnimatedField = animated(EditFieldInput);

interface AnimatedEditFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  show: boolean
  title?: string
}


const AnimatedEditFieldInput: FC<AnimatedEditFieldProps> = ({show, title, ...props}) => {
  const [styles, api] = useSpring(() => (
    {
      opacity: show ? 1 : 0,
      y: show ? 0 : -10,
      config: {
        tension: 200,
        friction: 20
      }
    }
  ))

  useEffect(() => {
    if (show) {
      api.start({opacity: 1, y: 0})
    } else {
      api.start({opacity: 0, y: -10})
    }
  }, [show]);

  return (
    <AnimatedField {...props} title={title} style={styles}/>
  );
};

export default AnimatedEditFieldInput;