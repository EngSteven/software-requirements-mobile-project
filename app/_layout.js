import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useCallback } from 'react'

const Layout = () => {
    const [fontsLoaded] = useFonts({
        SpaceGrotesk: require('../assets/fonts/SpaceGrotesk-Regular.ttf'),
        SpaceGroteskBold: require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
        SpaceGroteskMedium: require('../assets/fonts/SpaceGrotesk-Medium.ttf'),
        SpaceGroteskSemiBold: require('../assets/fonts/SpaceGrotesk-SemiBold.ttf'),
        SpaceGroteskLight: require('../assets/fonts/SpaceGrotesk-Light.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded){
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded])
    
    if(!fontsLoaded) return null;

    return (
        <Stack onLayout={onLayoutRootView} screenOptions={{headerShown: false}}/>
    ); 
}

export default Layout