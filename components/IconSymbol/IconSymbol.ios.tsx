import { SymbolView, SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { StyleProp, ViewStyle } from 'react-native';
import type  { IconSymbolName } from './constants/Mapping'

type IconSymbolViewProps = {
  name: SymbolViewProps['name'] | IconSymbolName;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
  className?: string;
};

const IconSymbolView = ({
  name,
  size = 24,
  color,
  style,
  weight = 'regular',
  className,
}: IconSymbolViewProps) => (
  <SymbolView
    className={className}
    weight={weight}
    tintColor={color}
    resizeMode="scaleAspectFit"
    name={name}
    style={[
      {
        width: size,
        height: size,
      },
      style,
    ]}
  />
);

export default IconSymbolView;
