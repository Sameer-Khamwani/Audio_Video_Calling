import {useState} from 'react';
import dayjs from 'dayjs';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import React from 'react';
import {DateMode, UseDateTimePickerResult} from '../Utils/interface';

const useDateTimePicker = (
  initialDate: Date | null = null,
  initialMode: DateMode = 'date',
  initialFormat: string = 'YYYY-MM-DD',
  onSelect?: (date: Date, formattedDate: string) => void,
  minimumDate?: Date,
): UseDateTimePickerResult => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [mode, setMode] = useState<DateMode>(initialMode);
  const [dateFormat, setDateFormat] = useState<string>(initialFormat);

  const showPicker = (): void => setIsVisible(true);
  const hidePicker = (): void => setIsVisible(false);
  const togglePicker = (): void => setIsVisible(prev => !prev);

  const handleConfirm = (date: Date): void => {
    hidePicker();
    setSelectedDate(date);
    const formatted = dayjs(date).format(dateFormat);
    if (onSelect) {
      onSelect(date, formatted);
    }
    // togglePicker();
  };

  const formattedDate = selectedDate
    ? dayjs(selectedDate).format(dateFormat)
    : null;

  const onDateChange = (date: Date): void => {
    setSelectedDate(date);
    const formatted = dayjs(date).format(dateFormat);
    if (onSelect) {
      onSelect(date, formatted);
    }
  };

  const DatePickerModal = (
    <DateTimePickerModal
      minimumDate={minimumDate}
      isVisible={isVisible}
      mode={mode}
      onConfirm={handleConfirm}
      onCancel={hidePicker}
      date={selectedDate || new Date()}
    />
  );

  return {
    DatePickerModal,
    isVisible,
    showPicker,
    hidePicker,
    togglePicker,
    selectedDate,
    formattedDate,
    setSelectedDate,
    mode,
    setMode,
    dateFormat,
    setDateFormat,
    onDateChange,
  };
};

export default useDateTimePicker;
