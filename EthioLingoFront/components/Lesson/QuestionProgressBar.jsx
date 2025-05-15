import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;

const QuestionProgressBar = ({
  total,
  current,
  statuses = {},
  onJumpTo = () => {},
}) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const ITEM_WIDTH = 50;
  const CONTAINER_PADDING = 20;

  const updateArrows = (contentWidth, scrollXVal) => {
    const visibleWidth = SCREEN_WIDTH - CONTAINER_PADDING * 2 - 80; // 80 = approx arrow buttons
    setShowLeftArrow(scrollXVal > 5);
    setShowRightArrow(scrollXVal < contentWidth - visibleWidth - 5);
  };

  useEffect(() => {
    const listener = scrollX.addListener(({ value }) => {
      scrollRef.current?.getNode().getScrollResponder()?.scrollResponderScrollTo({
        x: value,
        animated: false,
      });
    });
    return () => scrollX.removeListener(listener);
  }, []);

  const scrollBy = (offset) => {
    scrollRef.current?.getNode().scrollTo({
      x: scrollX._value + offset,
      animated: true,
    });
  };

  return (
    <View className="flex-row items-center mb-4 px-4">
      {showLeftArrow && (
        <TouchableOpacity
          onPress={() => scrollBy(-SCREEN_WIDTH / 2)}
          className="pr-2"
        >
          <Ionicons name="chevron-back-circle" size={24} color="#313574" />
        </TouchableOpacity>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(contentWidth) => updateArrows(contentWidth, scrollX._value)}
        onScroll={(e) => {
          const scrollXVal = e.nativeEvent.contentOffset.x;
          updateArrows(e.nativeEvent.contentSize.width, scrollXVal);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: CONTAINER_PADDING }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === current;
          const status = statuses[i]; // 'correct', 'incorrect', 'skipped'
          let bgColor = '#e0e0e0';
          if (status === 'correct') bgColor = '#4CAF50'; // green
          else if (status === 'incorrect') bgColor = '#F44336'; // red
          else if (status === 'skipped') bgColor = '#FFC107'; // amber
          else if (isActive) bgColor = '#313574'; // primary active

          return (
            <TouchableOpacity
              key={i}
              onPress={() => onJumpTo(i)}
              className="mx-1"
            >
              <View
                style={{
                  width: ITEM_WIDTH,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: bgColor,
                }}
              >
                <Text
                  style={{
                    color: isActive ? '#fff' : '#000',
                    fontWeight: isActive ? 'bold' : 'normal',
                  }}
                >
                  {i + 1}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {showRightArrow && (
        <TouchableOpacity
          onPress={() => scrollBy(SCREEN_WIDTH / 2)}
          className="pl-2"
        >
          <Ionicons name="chevron-forward-circle" size={24} color="#313574" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuestionProgressBar;
