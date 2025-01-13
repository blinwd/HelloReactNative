import { ScrollView, View } from 'react-native';
import HelloVidaAppVideo from '@/components/HelloVidaAppVideo';

const TavusScreen = () => {
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View className="flex flex-1 items-center pt-6 gap-6 bg-white dark:bg-zinc-900">
        <HelloVidaAppVideo />
      </View>
    </ScrollView>
  );
};

export default TavusScreen;
