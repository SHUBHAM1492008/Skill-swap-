import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AppNavigator } from './src/navigation/AppNavigator';
import { navigationTheme } from './src/navigation/navigationTheme';
import { AppProviders } from './src/providers/AppProviders';
import { semanticColors } from './src/theme';

export default function App() {
  return (
    <AppProviders>
      <NavigationContainer theme={navigationTheme}>
        <StatusBar
          style="dark"
          backgroundColor={semanticColors.surfaces.canvas}
        />
        <AppNavigator />
      </NavigationContainer>
    </AppProviders>
  );
}
