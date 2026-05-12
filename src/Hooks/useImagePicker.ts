import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Asset,
  ImageLibraryOptions,
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import useToggle from './useToggle';
import { Platform } from 'react-native';
import { PERMISSIONS, RESULTS, request } from 'react-native-permissions';

const useImagePicker = () => {
  const [image, setImage] = useState<Asset | null>(null);
  const [isPickerOpen, setPicker, togglePicker] = useToggle();
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);

  const imageUri = useMemo(() => {
    const raw = image?.uri ?? null;
    if (!raw) return null;
    if (Platform.OS === 'android' && !raw.startsWith('file://')) {
      // Some android URIs come back as file paths without scheme
      return raw.startsWith('/') ? `file://${raw}` : raw;
    }
    return raw;
  }, [image?.uri]);

  const requestCameraPermission = useCallback(async () => {
    const res = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    const granted = res === RESULTS.GRANTED;
    setHasCameraPermission(granted);
    return granted;
  }, []);

  const requestGalleryPermission = useCallback(async () => {
    const permission =
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : (PERMISSIONS.ANDROID.READ_MEDIA_IMAGES ??
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (!permission) {
      console.log(
        'Gallery permission constant is undefined for this platform/version.',
      );
      setHasGalleryPermission(false);
      return false;
    }
    const res = await request(permission);
    const granted = res === RESULTS.GRANTED;
    setHasGalleryPermission(granted);
    return granted;
  }, []);

  useEffect(() => {
    // Pre-request camera permission for smoother UX
    requestCameraPermission().catch(err =>
      console.log('Camera Permission Error ======>' + err),
    );
  }, []);

  const handleCamera = async () => {
    // Close our modal deterministically (avoid toggle timing issues)
    setPicker(false);
    try {
      const granted = hasCameraPermission || (await requestCameraPermission());
      if (!granted) return;

      // Let the modal dismiss before showing native UI
      await new Promise<void>(resolve => setTimeout(resolve, 250));

      const options: CameraOptions = {
        mediaType: 'photo',
        saveToPhotos: true,
        quality: 0.9,
      };

      const res = await launchCamera(options);
      if (res.didCancel) return;
      if (res.errorCode) {
        console.log('launchCamera error ======>', res.errorCode, res.errorMessage);
        return;
      }
      const asset = res.assets?.[0];
      if (asset) setImage(asset);
    } catch (e) {
      console.log('launchCamera exception ======>', e);
    }
  };

  const handleGallery = async () => {
    // Close our modal deterministically (avoid toggle timing issues)
    setPicker(false);
    try {
      const granted =
        hasGalleryPermission || (await requestGalleryPermission());
      if (!granted) return;

      // Let the modal dismiss before showing native UI
      await new Promise<void>(resolve => setTimeout(resolve, 250));

      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: 1,
        quality: 0.9,
      };

      const res = await launchImageLibrary(options);
      if (res.didCancel) return;
      if (res.errorCode) {
        console.log(
          'launchImageLibrary error ======>',
          res.errorCode,
          res.errorMessage,
        );
        return;
      }
      const asset = res.assets?.[0];
      if (asset) setImage(asset);
    } catch (e) {
      console.log('launchImageLibrary exception ======>', e);
    }
  };

  return {
    image,
    imageUri,
    setImage,
    isPickerOpen,
    togglePicker,
    handleCamera,
    handleGallery,
    setPicker,
  };
};

export default useImagePicker;
