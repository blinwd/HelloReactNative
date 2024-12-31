// This file is a fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';
import type { IconSymbolName } from './constants/Mapping';
import { Mappings } from './constants/Mapping';

type IconSymbolViewProps = {
  name: SymbolViewProps['name'] | IconSymbolName;
  size?: number;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
  className?: string;
};

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
const IconSymbolView = ({
  name,
  size = 24,
  style,
  ...restProps
}: IconSymbolViewProps) => (
  <MaterialIcons
    size={size}
    name={Mappings[name]}
    style={style}
    {...restProps}
  />
);

export default IconSymbolView;
