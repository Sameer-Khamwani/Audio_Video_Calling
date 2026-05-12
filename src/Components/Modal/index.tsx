import { BlurView } from '@react-native-community/blur';
import React, { FC } from 'react';
import { Image, Modal, View } from 'react-native';
import Button from '../Button';
import CustomText from '../CustomText';
import Icons from '../ImageIcons/Icons';
import { styles } from './styles';
import { IModalComponent } from '../../Utils/interface';
import { colors } from '../../Utils/theme';
import icons from '../../Assets/Icons';

const ModalComponent: FC<IModalComponent> = ({
  open,
  close,
  text,
  icon,
  buttons,
  children,
  header,
  style,
  buttonStyle,
  textStyle,
}) => {
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        statusBarTranslucent>
        <BlurView
          style={styles.absolute}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor={colors.ModalBLur}
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeButton}>
              <Icons source={icons.cross} color={colors.black} size={20} onPress={close} />
            </View>
            <View style={styles.childrenContainer}>
              {icon && <Image source={icon} style={styles.modalImage} />}
              {header && (
                <CustomText
                  text={header}
                  size={18}
                  weight="bold"
                  style={styles.headerText}
                />
              )}
              {text && (
                <CustomText
                  style={[styles.modalText, textStyle]}
                  text={text}
                  size={16}
                />
              )}
            </View>
            {children}
            <View
              style={[styles.buttonsRow, style]}>
              {buttons?.map((item, index) => (
                <Button
                  // size={12}
                  children={item.text}
                  style={[styles.customButton, buttonStyle, item?.style]}
                  onPress={item.onPress}
                  buttonType={
                    item?.type
                      ? item?.type
                      : index % 2
                        ? 'secondary'
                        : 'primary'
                  }
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalComponent;
