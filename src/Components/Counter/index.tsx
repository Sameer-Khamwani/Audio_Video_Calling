import { FC } from 'react';
import { View } from 'react-native';
import { icons } from '../../Assets/Icons';
import Row from '../Row';
import ImageIcons from '../ImageIcons/Icons';
import CustomText from '../CustomText';
import { ICounterProps } from '../../Utils/interface';
import { styles } from './style';

const Counter: FC<ICounterProps> = ({
  value,
  onIncrement,
  onDecrement,
  minValue = 0,
}) => {
  return (
    <Row gap={7} alignItems="center" style={styles.counterContainer}>
      <ImageIcons
        source={icons.minusButton}
        size={26}
        onPress={onDecrement}
        disabled={typeof value === 'number' ? value <= minValue : false}
      />
      <View style={styles.valueContainer}>
        <CustomText text={`${value}`} size={14} weight="bold" />
      </View>
      <ImageIcons source={icons.plusButton} size={26} onPress={onIncrement} />
    </Row>
  );
};

export default Counter;
