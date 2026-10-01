import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader } from './src/components/AppHeader';
import { CameraScreen } from './src/screens/CameraScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { InspectionDetailsScreen } from './src/screens/InspectionDetailsScreen';
import { InspectionFormScreen } from './src/screens/InspectionFormScreen';
import { InspectionReviewScreen } from './src/screens/InspectionReviewScreen';
import { RecordsScreen } from './src/screens/RecordsScreen';
import { TravelScreen } from './src/screens/TravelScreen';
import { InspectionProvider } from './src/state/InspectionProvider';
import { colors } from './src/theme/colors';
import type { InspectStackParamList, RecordsStackParamList, RootTabParamList } from './src/types';

const Tab = createBottomTabNavigator<RootTabParamList>();
const InspectStack = createNativeStackNavigator<InspectStackParamList>();
const RecordsStack = createNativeStackNavigator<RecordsStackParamList>();

function InspectNavigator() {
  return (
    <InspectStack.Navigator screenOptions={{ headerShown: false }}>
      <InspectStack.Screen name="InspectionForm" component={InspectionFormScreen} />
      <InspectStack.Screen name="InspectionReview" component={InspectionReviewScreen} />
    </InspectStack.Navigator>
  );
}

function RecordsNavigator() {
  return (
    <RecordsStack.Navigator screenOptions={{ headerShown: false }}>
      <RecordsStack.Screen name="RecordsList" component={RecordsScreen} />
      <RecordsStack.Screen name="InspectionDetails" component={InspectionDetailsScreen} />
    </RecordsStack.Navigator>
  );
}

function RootNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="MarketTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.forest,
        tabBarInactiveTintColor: colors.inkSubtle,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          if (route.name === 'MarketTab') {
            iconName = 'storefront-outline';
          } else if (route.name === 'InspectTab') {
            iconName = 'clipboard-outline';
          } else if (route.name === 'CameraTab') {
            iconName = 'camera-outline';
          } else if (route.name === 'TravelTab') {
            iconName = 'navigate-outline';
          } else {
            iconName = 'folder-open-outline';
          }

          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="MarketTab"
        component={HomeScreen}
        options={{ title: 'Market' }}
      />
      <Tab.Screen
        name="InspectTab"
        component={InspectNavigator}
        options={{ title: 'Inspect' }}
      />
      <Tab.Screen
        name="CameraTab"
        component={CameraScreen}
        options={{ title: 'Camera' }}
      />
      <Tab.Screen
        name="TravelTab"
        component={TravelScreen}
        options={{ title: 'Travel' }}
      />
      <Tab.Screen
        name="RecordsTab"
        component={RecordsNavigator}
        options={{ title: 'Records' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <InspectionProvider>
        <View style={styles.appShell}>
          <SafeAreaView edges={['top']} style={styles.safeArea}>
            <StatusBar style="light" />
            <AppHeader />
          </SafeAreaView>

          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </View>
      </InspectionProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  appShell: {
    flex: 1,
    backgroundColor: '#e9dfcf',
  },
  safeArea: {
    backgroundColor: colors.forest,
  },
  tabBar: {
    backgroundColor: colors.paperElevated,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 74,
    paddingBottom: 10,
    paddingTop: 8,
    elevation: 8,
  },
  tabBarItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
});
