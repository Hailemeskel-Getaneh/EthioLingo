import { View } from 'react-native';

export function ProgressBar({ percentage, color }) {
  return (
    <View
      className="rounded-full h-1.5 "
      style={{ width: `${percentage}%`, backgroundColor: `${color}` }}
    />
  );
}
