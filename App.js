import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'
import ExpnsesContextProvider from './store/expense-context';


import ManageExpense from './screens/ManageExpense';
import RecentExpenses from './screens/RecentExpenses';
import AllExpenses from './screens/AllExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/iconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpenseOverview () {
  return (
    <BottomTabs.Navigator 
      screenOptions={({ navigation }) => ({ 
        headerStyle : { backgroundColor: GlobalStyles.colors.primary500, },
        headerTintColor: 'white',
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500, },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({tintColor}) => <IconButton 
          icon={"add"}
          size={24}
          color={tintColor} //上記で設定したtintColorを設定してくれる
          onPress={() => {
            navigation.navigate('ManageExpense');
          }}
        />
      })}
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
      <ExpnsesContextProvider>
        <NavigationContainer>
          {/* StackNavigatorでTOPにタブ切り替えできるTabバーつきの画面を表示する。
            * 編集する時とか新規追加ではタブを表示させたくないし、ALL、RecentどちらからでもManageExpenseに行かせたいので、
            * StackNavigatorが親でタブナビゲータが子になる。
            * 
          */}
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen 
              name="ExpenseOverview" 
              component={ExpenseOverview}
              options={{headerShown: false}}
            />
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpense}
              options={{
                // title: 'Manage Expense' // 新規追加モードと編集モードの2つがあるからここでは設定しない
                presentation: 'modal', //どのように画面を表示するかのモードが選べる
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpnsesContextProvider>
    </>
  );
}


