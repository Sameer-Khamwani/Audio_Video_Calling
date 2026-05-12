
import { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import {
  SafeAreaProvider
} from 'react-native-safe-area-context';
import MainNavigation from './src/Navigation/MainNavigation';
import colors from './src/Utils/theme';
import Toast from 'react-native-toast-message';



function App() {


  useEffect(() => {
    const init = async () => {
      // Perform your initialization tasks here
    };

    init().finally(() => {
      setTimeout(async () => {
        await BootSplash.hide({ fade: true });
        console.log('BootSplash has been hidden successfully after 3 seconds');
      }, 3000); // 3 seconds delay
    });
  }, []);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: colors.primaryBackground }}>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={'transparent'}
          translucent={true}
        />
        <MainNavigation />
        <Toast />
      </View>
    </SafeAreaProvider>
  );
}


export default App;