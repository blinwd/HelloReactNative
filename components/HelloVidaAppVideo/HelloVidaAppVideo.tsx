import {
  TouchableOpacity,
  View,
  ViewStyle,
  Dimensions,
} from 'react-native';
import {
  useVideoPlayer,
  VideoPlayerStatus,
  VideoView,
} from 'expo-video';
import { useEventListener } from 'expo';
import { useEffect, useState } from 'react';
import { usePathname } from 'expo-router';

import IconSymbolView from '@/components/IconSymbol';

const assetId = require('../../assets/videos/e35ed68291.mp4');

const HelloVidaApp = ({ style }: { style?: ViewStyle }) => {
  const pathname = usePathname();
  const player = useVideoPlayer(assetId, (_player) => {
    _player.loop = true;
  });

  const [isMuted, setIsMuted] = useState(true);
  const [videoStatus, setVideoStatus] =
    useState<VideoPlayerStatus>();

  const videoWidth =
    style?.width ?? Dimensions.get('window').width * 0.9;
  const videoHeight =
    style?.height ?? ((videoWidth as number) * 9) / 16;

  useEventListener(player, 'statusChange', ({ status }) => {
    setVideoStatus(status);
  });

  useEffect(() => {
    if (videoStatus === 'readyToPlay') {
      player.muted = isMuted === true;

      if (isMuted === true) {
        player.pause();
      } else {
        player.play();
      }
    }
  }, [player, isMuted, videoStatus, pathname]);

  return (
    <View
      className="relative"
      style={[
        {
          width: videoWidth,
          height: videoHeight,
        },
      ]}
    >
      <VideoView
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 16,
        }}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
        nativeControls={false}
        contentFit="contain"
      />
      <TouchableOpacity
        className="absolute bottom-4 right-4 w-12 h-12 flex items-center justify-center rounded-full bg-black/10 p-2"
        onPress={() => setIsMuted((prev) => !prev)}
      >
        <IconSymbolView
          name={
            isMuted ? 'speaker.slash' : 'speaker.wave.2'
          }
          size={24}
          color="white"
        />
      </TouchableOpacity>
    </View>
  );
};

export default HelloVidaApp;
