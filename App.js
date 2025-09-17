import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'


import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverview () {
  return (
    <BottomTabs.Navigator 
      screenOptions={{
        headerStyle : { backgroundColor: GlobalStyles.colors.primary500, },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500, },
        tabBarActiveTintColor: GlobalStyles.colors.accent500
      }}
    >
      <BottomTabs.Screen 
        name="RecentExpnses" 
        component={RecentExpenses}
        options={{
          title: 'Recent Expnses',
          tabBarLabel: 'Recent',
          // color, sizeは外部から渡しているが、これはReact NavigationのtabBarIconプロパティが画面の大きさ、アクティブ/非アクティブを判断して
          // 自動で設定してくれる。
          tabBarIcon: ({color, size}) => <Ionicons name="hourglass" size={size} color={color}/>
        }}
      />
      <BottomTabs.Screen 
        name="AllExpnses" 
        component={AllExpenses}
        options={{
          title: 'All Expnses',
          tabBarLabel: 'All',
          // color, sizeは外部から渡しているが、これはReact NavigationのtabBarIconプロパティが画面の大きさ、アクティブ/非アクティブを判断して
          // 自動で設定してくれる。
          tabBarIcon: ({color, size}) => <Ionicons name="calendar" size={size} color={color}/>
        }}
      />
    </BottomTabs.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        {/* StackNavigatorでTOPにタブ切り替えできるTabバーつきの画面を表示する。
          * 編集する時とか新規追加ではタブを表示させたくないし、ALL、RecentどちらからでもManageExpenseに行かせたいので、
          * StackNavigatorが親でタブナビゲータが子になる。
          * 
        */}
        <Stack.Navigator>
          <Stack.Screen 
            name="ExpenseOverview" 
            component={ExpenseOverview}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="MangaExpense" 
            component={ManageExpense}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


