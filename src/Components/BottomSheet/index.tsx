import React, { FC, useState } from 'react';
import { Modal, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { styles } from './style';
import DropDown from '../CustomDropDown';
import { BottomSheetProps } from '../../Utils/interface';
import icons from '../../Assets/Icons';
import CustomText from '../CustomText';
import Icons from '../ImageIcons/Icons';
import Row from '../Row';
import Button from '../Button';

const Category = [
  { label: 'ABC', value: 1 },
  { label: 'ABC', value: 2 },
  { label: 'ABC', value: 3 },
  { label: 'ABC', value: 4 },
  { label: 'ABC', value: 5 },
];
const Sort = [
  { label: 'ABC', value: 6 },
  { label: 'ABC', value: 7 },
  { label: 'ABC', value: 8 },
  { label: 'ABC', value: 9 },
  { label: 'ABC', value: 10 },
];

const BottomSheet: FC<BottomSheetProps> = ({
  open,
  close,
  children,
  applyOnpress,
  categoryData,
  productData,
  loader,
  clearOnPress,
}) => {
  const [category, setCategory] = useState('');
  const [product, setProduct] = useState('');

  return (
    <Modal
      statusBarTranslucent
      style={styles.modalRoot}
      transparent
      visible={open}
      animationType="slide"
      onRequestClose={close}>
      {/* Backdrop */}
      <TouchableWithoutFeedback onPress={close}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      {/* Bottom Sheet Container */}
      <View style={styles.container}>
        {/* <Row style={styles.rowStyle}>
          <Icons source={icons.back} size={19} onPress={close} />
          <CustomText text="Filter By" size={18} weight="semibold" />
        </Row> */}

        <TouchableOpacity hitSlop={20} style={styles.sheetDragHandle} onPress={close} />

        {children ? (
          children
        ) : (
          <>
            <DropDown
              value={category}
              items={categoryData ?? Category}
              label="Category"
              onChangeValue={val => setCategory(val)}
              placeholder={category ? category : 'Select Category'}
            />
            <DropDown
              value={product}
              items={productData ?? Sort}
              label="Sort By"
              onChangeValue={val => setProduct(val)}
              placeholder="Select"
            />
          </>
        )}

        {/* <Row
          justifyContent="space-between"
          style={{
            marginVertical: heightPixel(30),
          }}>
          <Button
            onPress={() => applyOnpress(category, product)}
            text="Apply"
            loading={loader}
            style={styles.buttonStyle}
          />
          <Button
            style={styles.buttonStyle}
            buttonType="secondary"
            text="Clear"
            onPress={() => {
              clearOnPress();
              setCategory(null);
              setProduct(null);
            }}
          />
        </Row> */}
      </View>
    </Modal>
  );
};

export default BottomSheet;
