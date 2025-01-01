import { View, Text } from 'react-native';
import { Platform } from 'react-native';
import IconSymbol, {
  IconSymbolName,
} from '@/components/IconSymbol';

type TabIconProps = {
  name: string;
  icon: IconSymbolName;
  size?: number;
  color: string;
  focused: boolean;
};

const TabIcon = ({
  name,
  icon,
  size,
  color,
  focused,
}: TabIconProps) => {
  return (
    <View
      className="items-center justify-center gap-1 w-12"
      style={Platform.select({
        default: {
          paddingTop: 8,
        },
      })}
    >
      <IconSymbol
        size={size ?? 24}
        name={icon}
        color={color}
      />
      <Text
        className={`text-xs min-w-12 text-center transition-color ${
          focused ? 'text-purple-900' : 'text-slate-500'
        }`}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabIcon;
