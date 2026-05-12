
// import { useSelector } from 'react-redux';
// import { selectLoggedIn, selectPrimaryColor } from '../Redux/Slice/UserSlice';

// Default colors (used before login)
const defaultColors = {
  primary: '#3D8DF5',
  darkPrimary: '#826320',
  black: 'black',
  blue: '#1C5CDB',
  border: '#C2C2C2',
  lightBorder: '#E8E8E8',
  gray: '#666666',
  white: 'white',
  lightText: '#666666',
  ModalBLur: '#00000070',
  cardColor: '#835929',
  buttonSecondary: '#DBB35B',
  primaryBackground: '#F9FAFB',
  green: '#24b256ff',
  red: '#DF0E0E',
  search: '#F1F1F1',
  optionsColor: '#FFDAAB',
  darkButton: '#291E00',
  lightGray: '#acacacff',
  timeCardColor: '#F5F9FE',
  lightBlue: '#3487F41A',
  lightRed: '#ED1D1D26',
  lightGreen: '#1DC96426',
  lightPrimary: '#3487F426',
  chatCardColor: '#E8ECFC',
  lightProfile: '#FDE5EE'
};

// Function to get colors with dynamic primary color
export const getColors = (primaryColor: string | null, isLoggedIn: boolean) => {
  // If user is not logged in or no primary color provided, use default colors
  if (!isLoggedIn || !primaryColor) {
    return defaultColors;
  }

  // Return colors with dynamic primary color
  return {
    ...defaultColors,
    primary: `#${primaryColor}`,
  };
};

// Function to convert hex color to rgba with opacity
const hexToRgba = (hex: string, opacity: number): string => {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse RGB values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

// Hook to get dynamic colors based on login state and API response
export const useColors = () => {
  // const isLoggedIn = useSelector(selectLoggedIn);
  // const primaryColor = useSelector(selectPrimaryColor);

  // const colors = getColors(primaryColor, isLoggedIn);

  // Add light shade of primary color (15% opacity)
  // Handle both hex colors with # and without, and named colors like 'black'
  let lightPrimary: string;
  // if (primaryColor && isLoggedIn) {
  const hexColor = defaultColors.primary.startsWith('#') ? defaultColors.primary : `#${defaultColors.primary}`;
  // Check if it's a valid hex color (not a named color like 'black')
  if (hexColor.length === 7 && /^#[0-9A-Fa-f]{6}$/.test(hexColor)) {
    lightPrimary = hexToRgba(hexColor, 0.15);
  } else {
    // For named colors, use rgba with low opacity
    lightPrimary = 'rgba(0, 0, 0, 0.15)'; // Default to black with opacity
  }
  // } else {
  //   // Default light shade for black
  //   lightPrimary = 'rgba(0, 0, 0, 0.15)';
  // }

  return {
    ...defaultColors,
    lightPrimary,
  };
};

// Export default colors for backward compatibility (used before login)
export const colors = defaultColors;
export default colors;
