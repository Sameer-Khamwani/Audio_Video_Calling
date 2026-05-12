import React, { FC, useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import icons from '../../Assets/Icons';
import { colors } from '../../Utils/theme';
import styles from './style';
import CustomTextInput from '../CustomTextInput';
import Button from '../Button';
import Icons from '../ImageIcons/Icons';
import { fonts } from '../../Assets/Fonts';
import { ISearchBar } from '../../Utils/interface';

const SearchBar: FC<ISearchBar> = ({
  placeholder = 'Search...',
  onSearch,
  onFilterPress,
  filter,
  rootStyle,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (text: string) => {
    setQuery(text);
    if (onSearch) {
      onSearch(text);
    }
  };

  return (
    <View style={[styles.rootContainer, rootStyle]}>
      <View style={styles.container}>
        <CustomTextInput
          containerStyle={{
            backgroundColor: colors.white,
          }}
          textInputContainerStyle={{
            elevation: 4,
            borderColor: colors.white,
            backgroundColor: colors.white,
          }}
          rightIcon={icons.search}
          style={styles.input}
          value={query}
          onChangeText={handleSearch}
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
        />
      </View>
      {filter === false ? null : (
        <Button style={styles.buttonStyle} onPress={onFilterPress}>
          <Icons size={20} source={icons.filter} onPress={onFilterPress} />
        </Button>
      )}
    </View>
  );
};

export default SearchBar;
