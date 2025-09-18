import { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../components/UI/iconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpnsesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

// スクリーンはApp.jsの中でナビゲーション登録をしているので、navigationプロパティが引数で使える。
function ManageExpense({route, navigation}) {

  const expensesCtx = useContext(ExpnsesContext);

  // 新規追加の時はparamsがない。route.paras.expsenIdだとそのときにこけてしまうので
  // route.params?としてnull許容をする(javascript構文)　→ 新規の時はundefinedが返ってくる。
  const editExpnseId = route.params?.expenseId;

  // 値をboolean変換してくれる。値がとれていればtrue、なければfalseに変換してくれる。
  // これもjavascript構文
  const isEditing = !!editExpnseId;

  // userLayoutEffectの第二引数はnavigationと内部で条件判断に使われている変数
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense!' : 'Add Expense!',
    });
  }, [navigation, isEditing]); 

  function deleteExpsenseHandler() {
    expensesCtx.deleteExpeense(editExpnseId);
    navigation.goBack(); //モーダルもこれで閉じる
  }

  function cancelHandler() {
    navigation.goBack(); //モーダルもこれで閉じる
  }

  function confirmHandler() {
    if(isEditing) {
      expensesCtx.updateExpense(
        editExpnseId,
        {
          description: "test", 
          amount: '10.00', 
          date: new Date()
        }
      );
    } else {
      expensesCtx.addExpense(
        {
          description: "test", 
          amount: '10.00', 
          date: new Date()
        }
      );
    }
    navigation.goBack(); //モーダルもこれで閉じる
  }

  return (
    <View style={styles.container}>
      <ExpenseForm />
      {/* 以下のViewは横並びのスタイルを適用するためのView */}
      <View style={styles.buttons}>
        <Button mode='flat' onPress={cancelHandler} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={confirmHandler} style={styles.button}>
          {isEditing ? 'update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpsenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8
  },
  deleteContainer: {
    marginTop: 16,
    paddinTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
