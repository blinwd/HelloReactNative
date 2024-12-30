import type { ReactElement } from 'react';
import {
  SafeAreaView,
  View,
  ViewProps,
} from 'react-native';
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
    <SafeAreaView className="w-full h-full">
      <View
        className={`w-full flex-1 ${className}`}
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
