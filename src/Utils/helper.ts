import { Dimensions, PixelRatio, Platform, StatusBar } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const widthBaseScale: number = SCREEN_WIDTH / 430;
const heightBaseScale: number = SCREEN_HEIGHT / 932;

function normalize(size: number, based: 'width' | 'height' = 'width'): number {
    const newSize = based === 'height' ? size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export const heightPixel = (size: number): number => {
    return normalize(size, 'height');
};

export const widthPixel = (size: number): number => {
    return normalize(size, 'width');
};

export const font = (size: number): number => {
    return heightPixel(size);
};

export const STATUSBAR_HEIGHT =
    (Platform.OS === 'ios'
        ? initialWindowMetrics?.insets.top
        : StatusBar.currentHeight) || 0;
export const BOTTOMBAR_HEIGHT = heightPixel(66);

export const vh = (SCREEN_HEIGHT - STATUSBAR_HEIGHT) * 0.01;
export const vw = SCREEN_WIDTH * 0.01;

export const HEADER_HEIGHT = vh * 9 + STATUSBAR_HEIGHT;
export const PAGE_WIDTH = vw * 100;