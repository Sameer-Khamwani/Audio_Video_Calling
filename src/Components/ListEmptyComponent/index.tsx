import { IListEmptyComponent } from '../../Utils/interface';
import colors from '../../Utils/theme';
import CustomText from '../CustomText';

const ListEmptyComponent = ({
  text,
  style,
  size,
  color,
  weight,
}: IListEmptyComponent) => {
  return (
    <CustomText
      text={text}
      size={size ? size : 20}
      color={color ? color : colors.lightText}
      weight={weight ? weight : 'semibold'}
      style={[
        {
          width: '100%',
          marginTop: '50%',
          textAlign: 'center',
        },
        style,
      ]}
    />
  );
};

export default ListEmptyComponent;
