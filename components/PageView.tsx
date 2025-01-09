import type { ReactElement } from 'react';
import { View, ViewProps } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native';

type PageViewProps = ViewProps & {
  header?: ReactElement;
  topNavBar?: ReactElement;
  contentClassName?: string;
};

const PageView = ({
  children,
  topNavBar,
  className = '',
  contentClassName = '',
  ...otherProps
}: PageViewProps) => {
  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-zinc-900">
      <View
        className={`flex-1 ${className}`}
        {...otherProps}
      >
        {Platform.OS === 'web' ? topNavBar : null}

        <View
          className={`flex-1 overflow-auto ${contentClassName}`}
        >
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default PageView;
