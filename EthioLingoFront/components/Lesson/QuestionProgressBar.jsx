import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = 50; // width of each number circle
const SPACING = 12;    // space between items
const SIDE_PADDING = 20;
const ARROW_WIDTH = 28; // space taken by each arrow
const BUFFER = 10; // extra buffer to prevent cutoff

const QuestionProgressBar = ({
  total,
  current,
  statuses = {},
  onJumpTo = () => {},
}) => {
  const scrollRef = useRef(null);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const updateArrows = (contentWidth, scrollXVal) => {
    const visibleWidth = SCREEN_WIDTH - 2 * SIDE_PADDING - 2 * ARROW_WIDTH;
    setShowLeftArrow(scrollXVal > 5);
    setShowRightArrow(scrollXVal < contentWidth - visibleWidth - 5);
  };

  const scrollToIndex = (index) => {
    const itemTotalWidth = ITEM_WIDTH + SPACING;
    const centerX = SCREEN_WIDTH / 2 - ARROW_WIDTH; // center between arrows
    const offset = index * itemTotalWidth - centerX + ITEM_WIDTH / 2 + BUFFER;

    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: Math.max(0, offset),
        animated: true,
      });
    }
  };

  useEffect(() => {
    scrollToIndex(current);
  }, [current]);

  return (
    <View className="flex-row items-center mb-4 px-4">
      {showLeftArrow && (
        <TouchableOpacity
          onPress={() => scrollRef.current?.scrollTo({ x: 0, animated: true })}
          className="pr-2"
        >
          <Ionicons name="chevron-back-circle" size={24} color="#313574" />
        </TouchableOpacity>
      )}

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onContentSizeChange={(contentWidth) => {
          setScrollWidth(contentWidth);
          updateArrows(contentWidth, 0);
        }}
        onScroll={(e) => {
          const scrollXVal = e.nativeEvent.contentOffset.x;
          updateArrows(scrollWidth, scrollXVal);
        }}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingHorizontal: SIDE_PADDING }}
      >
        {Array.from({ length: total }).map((_, i) => {
          const isActive = i === current;
          const status = statuses[i]; // 'correct', 'incorrect', 'skipped'
          let bgColor = '#e0e0e0';
          if (status === 'correct') bgColor = '#4CAF50';
          else if (status === 'incorrect') bgColor = '#F44336';
          else if (status === 'skipped') bgColor = '#FFC107';
          else if (isActive) bgColor = '#313574';

          return (
            <TouchableOpacity
              key={i}
              onPress={() => onJumpTo(i)}
              style={{ marginHorizontal: SPACING / 2 }}
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
          onPress={() => scrollRef.current?.scrollToEnd({ animated: true })}
          className="pl-2"
        >
          <Ionicons name="chevron-forward-circle" size={24} color="#313574" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default QuestionProgressBar;
