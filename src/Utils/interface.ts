import { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  ColorValue,
  ImageSourcePropType,
  ImageStyle,
  KeyboardTypeOptions,
  ReturnKeyType,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { PhoneInputProps } from 'react-native-phone-number-input';

export interface ICustomText {
  style?: StyleProp<TextStyle>;
  lines?: number;
  weight?: 'bold' | 'semibold' | 'regular' | 'light';
  color?: ColorValue;
  size?: number;
  text?: string;
  onPress?: () => void;
  required?: boolean;
  requiredStyle?: TextStyle;
  textContainer?: StyleProp<TextStyle>;
  children?: ReactNode
  disabled?: boolean
}

export interface ICustomTextInput {
  name?: string;
  size?: number;
  label?: string;
  required?: boolean;
  leftIcon?: ImageSourcePropType;
  children?: ReactNode;
  rightIcon?: ImageSourcePropType;
  leftIconStyle?: StyleProp<ImageStyle>;
  rightIconStyle?: StyleProp<ImageStyle>;
  onPressRightIcon?: () => {};
  rightIcon2?: ImageSourcePropType;
  rightIcon2Style?: StyleProp<ImageStyle>;
  onPressRightIcon2?: () => {};
  secureTextEntry?: boolean;
  eyeIconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  textInputContainerStyle?: StyleProp<ViewStyle>;
  labelStyle?: TextStyle;
  requiredStyle?: TextStyle;
  placeholderTextColor?: string;
  onChangeText?: (value?: any) => void;
  value?: string;
  placeholder?: string;
  style?: {};
  returnKeyType?: ReturnKeyType | 'default';
  multiline?: boolean;
  keyboardType?: KeyboardTypeOptions;
  lines?: number;
  error?: string;
}

type TSubscription = {
  title: string;
  amount: number;
  interval: string;
  features: string[];
};

export interface ISubscriptionCard {
  data: TSubscription;
  header?: string;
  prize?: string;
  backgroundColor?: string;
  textcolor?: string;
  onPress?: () => void;
  iconColor?: string;
  buttonType?: string;
  buttonStyle?: StyleProp<ViewStyle>;
}

export interface ISubscriptionLogs {
  data: any;
  buttonText: string;
  onPress?: () => void;
}
export interface IPhoneNumberInput {
  value?: string;
  required?: boolean;
  requiredStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  focused?: boolean;
  onChange?: (e: string) => void;
  name: string;
  onChangeCountry?: () => void;
  error?: string | boolean;
  defaultCode?: PhoneInputProps;
}

export interface IButton {
  onPress?: any
  text?: string;
  children?: string | ReactNode;
  buttontextcolor?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  weight?: any;
  size?: number;
  buttonLoader?: boolean;
  family?: 'inter' | 'poppins';
  buttonType?: 'primary' | 'secondary' | string;
  loading?: boolean;
  disabled?: boolean;
  primaryStyle?: ViewStyle;
  loader?: boolean,
  loaderColor?: string,
  icon?: ImageSourcePropType;
  iconColor?: string;
  iconSize?: number;
}

export interface DropdownProps {
  items: { label: string; value: string }[];
  placeholder?: string;
  onChangeValue?: (value: string | null) => void;
  style?: object;
  containerStyle?: object;
}

export interface IAuthWrapper {
  children?: ReactNode;
  headerText?: string;
  buttonText?: string;
  functionText?: string;
  onPress?: () => void;
  helperButton?: () => void;
  navigatorText?: string;
  buttonLoader?: boolean;
}

export interface IIcons {
  source: ImageSourcePropType;
  onPress?: any;
  color?: string;
  style?: StyleProp<ImageStyle>;
  size?: number;
  disabled?: boolean;
  hitSlop?: number
}
export interface IModalComponent {
  open: Boolean | any;
  buttonStyle?: StyleProp<ViewStyle>;
  type?: 'primary' | 'secondary';
  header?: string;
  close: () => void;
  children?: ReactNode;
  secondButton?: boolean;
  text?: string;
  icon?: ImageSourcePropType;
  primaryButtonText?: string;
  secondaryButton1Text?: string;
  secondaryButton2Text?: string;
  onPress?: () => {};
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttons?: buttons[];
  iconColor?: string
  modalViewStyle?: StyleProp<ViewStyle>;
  modalIconStyle?: StyleProp<ImageStyle>;
}

type buttons = {
  text?: string;
  onPress?: () => void | boolean;
  type?: 'primary' | 'secondary';
  buttonTextColor?: string,
  weight?: 'bold' | 'regular' | 'light' | 'semibold',
  size?: number
  style?: StyleProp<ViewStyle>;
};
export interface BottomSheetProps {
  open: boolean;
  clearOnPress?: () => void;
  close: () => void;
  children?: React.ReactNode;
  applyOnpress?: () => void;
  categoryData?: any;
  productData?: any;
  loader?: boolean;
}

export interface ProductCardI {
  itemName?: string;
  price?: number;
  headerText?: string;
  image?: ImageSourcePropType;
  stock?: string | number;
  rootStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
  onCartPress?: () => void;
  itemLiked?: boolean;
  onPressLike?: () => void;
}

export interface IMyCartCard {
  border?: boolean;
  setQuantity?: (price: number) => void;
  quantity?: number;
  noOfItems?: boolean;
  key?: number;
  data?: any;
  onDelete?: () => void;
  itemName?: string;
  category?: string;
  productPrice?: string;
  itemImage?: string;
  imageStyle?: ImageStyle;
  size?: number;
}

export interface IRow {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
  justifyContent?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  gap?: number;
  onPress?: () => void;
}

export interface IQuantityCounter {
  border?: boolean;
  setQuantity: (price: number) => void;
  quantity: number;
  style?: StyleProp<ViewStyle>;
  productQuantity?: number;
}

export interface IListEmptyComponent {
  text: string;
  style?: ViewStyle;
  size?: number;
  color?: string;
  weight?: 'bold' | 'semibold' | 'regular' | 'light';
}


export interface IAuthWrapper {
  header?: string,
  subText?: string,
  children?: React.ReactNode
}


export interface ISupportCard {
  item: any,
  onPress?: () => void
}


export type DateMode = 'date' | 'time' | 'datetime';

export interface UseDateTimePickerResult {
  DatePickerModal: React.ReactNode;
  isVisible: boolean;
  selectedDate: Date | null;
  formattedDate: string | null;
  showPicker: () => void;
  hidePicker: () => void;
  togglePicker: () => void;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  mode: DateMode;
  setMode: React.Dispatch<React.SetStateAction<DateMode>>;
  dateFormat: string;
  setDateFormat: React.Dispatch<React.SetStateAction<string>>;
  onDateChange: (date: Date) => void;
  minimumDate?: Date;
}


export interface ICheckBox {
  value?: boolean;
  onPress?: (val: boolean) => void;
  tintColor?: string;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  backgroundColor?: string;
  text?: string;
  textStyle?: StyleProp<TextStyle>;
  size?: number;
  borderColor?: String,
  filledBoxStyle?: StyleProp<ViewStyle>
  , rootStyle?: StyleProp<ViewStyle>
}

export interface INotificationCard {
  item: any;
  onPress?: () => void;
  status?: string;
  onPressDelete?: () => void
  isLoading?: boolean
  loadingId?: any
}

export interface LoaderProps {
  loaderStyle?: ViewStyle;
  color?: string;
  size?: 'small' | 'large';
  isButtonLoader?: boolean;
  text?: string;
  isModalLoader?: boolean;
  visible?: boolean;
}

export type ScheduleItem = {
  id: string;
  name: string;
  details: string;
  time: string;
  day: string;
  dateLabel: string;
  status: "cancelled" | "upcoming" | "completed";
  mode: "in-person" | "online";
};

export type WeeklyScheduleItem = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  enabled: boolean;
  timeSlot: string;
};

export type LocationFee = {
  id: string;
  title: string;
  address: string;
  consultationFee: string;
  specialization: string;
  weeklySchedule: WeeklyScheduleItem[];
};

export type DoctorProfile = {
  name: string;
  designation: string;
  phone: string;
  email: string;
  specializationChips: string[];
};

export interface IOnBoarding {
  activeDot: number;
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
  children: string;
  onPress: () => void;
  onPressSkip?: () => void;
}

export type AppointmentStatus = "confirmed" | "cancelled" | "completed";

export type VerifyCodeFormValues = {
  code: string;
};

export type ResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

export type PersonalInfoFormValues = {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  specialization: string[];
  qualification: string;
  experience: string;
};

export type TextFieldName = "fullName" | "qualification" | "experience";

export type ProfessionalDetailsFormValues = {
  specialization: string;
  yearsExperience: string;
  licenseNumber: string;
  clinicName: string;
};

export type LoginFormValues = {
  email: string;
  password: string;
};

export type ForgotPasswordFormValues = {
  email: string;
};

export interface IMessage {
  _id: string | number;
  text?: string;
  createdAt: Date;
  user: { _id: string | number; name?: string };
  image?: string;
  document?: string;
  documentName?: string;
}

export type Attachment = {
  uri: string;
  type?: string | null;
  name: string;
  kind: 'image' | 'document';
};

export interface IViewChat {
  route?: any;
  type?: 'individual' | 'group';
}

export type UpdateProfileFormValues = {
  fullName: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  address: string;
  qualification: string;
  experience: string;
  specializations: string[];
};

export type TermsSection = {
  id: string;
  title: string;
  icon: any;
  content: string[];
  expandedByDefault?: boolean;
};

export type PrivacySection = {
  id: string;
  title: string;
  icon: any;
  paragraphs: string[];
  bullets?: string[];
  contactRows?: { label: string; value: string }[];
};

export type Patient = {
  id: string;
  name: string;
  phone: string;
  appointmentTime: string;
  visits: number;
};

export type Tab = "History" | "Reports";

export type NotificationTab = "all" | "unread";
export type NotificationCategory = "appointment" | "message" | "payment" | "system";
export type NotificationSection = "today" | "yesterday" | "earlier";

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  timeLabel: string;
  category: NotificationCategory;
  unread: boolean;
  section: NotificationSection;
};

export type SectionHeaderRow = {
  id: string;
  type: "sectionHeader";
  title: string;
};

export type NotificationRow = {
  id: string;
  type: "notification";
  item: NotificationItem;
};

export type NotificationListRow = SectionHeaderRow | NotificationRow;

export type ChatTab = "Unread" | "Recent";

export type ChatItem = {
  id: string;
  doctorName: string;
  preview: string;
  time: string;
  unreadCount: number;
  read: boolean;
  isVoiceMessage?: boolean;
  avatarBg: string;
};

export type ChangePasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
};

export type AppointmentItem = {
  id: string;
  name: string;
  locationType: string;
  time: string;
  checked: boolean;
  dateISO: string;
  status: "cancelled" | "upcoming" | "completed";
  mode: "in-person" | "online";
};

export interface ISearchBar {
  placeholder?: string;
  onSearch?: (val: string) => void;
  onFilterPress?: () => void;
  rootStyle?: StyleProp<ViewStyle>;
  filter?: boolean;
}

export interface IDropDown {
  name?: string;
  items?: { label: string; value: string }[];
  placeholder?: string;
  onChangeValue?: (value: string | string[] | null) => void;
  value?: string | string[] | null;
  style?: StyleProp<ViewStyle>;
  label?: string;
  placeholderSize?: number;
  labelStyle?: object;
  required?: boolean;
  requiredStyle?: object;
  dropDownStyle?: StyleProp<ViewStyle>;
  mode?: 'MODAL' | 'DEFAULT' | 'FLATLIST' | 'SCROLLVIEW';
  leftIcon?: ImageSourcePropType;
  multiple?: boolean;
}

export interface IAppWrapper {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  disableBottomPadding?: boolean;
  bottomPadding?: number;
  paddingHorizontal?: number;
}

export type UseToggleResult = [boolean, Dispatch<SetStateAction<boolean>>, () => void, any];

export type DoseTime = "Morning" | "Afternoon" | "Evening";

export interface PrescriptionItem {
  id: number;
  medicineName: string;
  dose: number;
  duration: number;
  whenToTake: DoseTime[];
}

export interface PrescriptionRouteParams {
  prescriptions?: PrescriptionItem[];
  labTests?: { id?: number; testName: string }[];
}

export interface PrescriptionFormValues {
  prescriptions: PrescriptionItem[];
}

export interface IListEmptyComponent {
  text: string;
  style?: ViewStyle;
  size?: number;
  color?: string;
  weight?: 'bold' | 'semibold' | 'regular' | 'light';
}

export interface ICounterProps {
  value: number | string;
  onIncrement: () => void;
  onDecrement: () => void;
  minValue?: number;
}

export type MonthCalendarProps = {
  selectedDateISO: string;
  onSelectDateISO: (iso: string) => void;
  visibleMonthDate: Date;
  onChangeVisibleMonthDate: (date: Date) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
  countsByDate?: Record<string, number>;
  showToggleButton?: boolean;
};

export type CtrlProps = {
  active?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  iconColor: string;
  source: any;
  onPress: () => void;
  label?: string;
};
