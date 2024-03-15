import React, {PropsWithChildren} from 'react';
import {ColorValue, View} from 'react-native';
import Svg, {Path, Ellipse, Rect} from 'react-native-svg';

type MenuIconProps = PropsWithChildren<{
  color?: ColorValue;
  size?: number;
}>;

const Solat = ({
  color = 'whitesmoke',
  size = 48,
}: MenuIconProps): JSX.Element => {
  return (
    <View>
      <Svg width={size} height={size} viewBox="0 0 60 61" fill="none">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8.12732 45.5039C4.29244 45.504 1.18367 48.8241 1.18367 52.9196C1.18367 57.0151 4.29244 60.3352 8.12732 60.3353L8.12732 45.5039Z"
          fill={color}
        />
        <Ellipse
          cx="7.8118"
          cy="7.83562"
          rx="7.4157"
          ry="7.81174"
          transform="rotate(90 7.8118 7.83562)"
          fill={color}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.6235 50.9816L15.6235 7.83569L6.38962e-05 7.83569L6.38962e-05 50.952C0.0168839 46.87 3.50784 43.5659 7.81174 43.5659C12.126 43.5659 15.6235 46.886 15.6235 50.9816H15.6235Z"
          fill={color}
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15.6236 9.77368H11.7571V14.2349H15.6236V9.77368ZM18.4642 14.2349H29.2862C40.7844 14.2349 50.1056 23.5561 50.1056 35.0544C50.1056 46.5527 40.7844 55.8739 29.2862 55.8739H10.0212V45.5038H7.8118L7.8118 9.77368H7.81177L7.81177 60.3353H53.5775V9.77368H18.4642V14.2349Z"
          fill={color}
        />
        <Rect
          x="50.5352"
          y="9.71582"
          width="9.46479"
          height="6.42254"
          rx="3.21127"
          fill={color}
        />
        <Rect
          x="50.5352"
          y="53.9976"
          width="9.46479"
          height="6.42254"
          rx="3.21127"
          fill={color}
        />
        <Rect
          x="50.5352"
          y="31.8564"
          width="9.46479"
          height="6.42254"
          rx="3.21127"
          fill={color}
        />
        <Rect
          x="50.5352"
          y="42.3354"
          width="9.46479"
          height="6.42254"
          rx="3.21127"
          fill={color}
        />
        <Rect
          x="50.5352"
          y="20.8706"
          width="9.46479"
          height="6.42254"
          rx="3.21127"
          fill={color}
        />
      </Svg>
    </View>
  );
};

export default Solat;
