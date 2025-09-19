import { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import IconButton from "../components/UI/iconButton";
import { GlobalStyles } from "../constants/styles";

import { ExpnsesContext } from "../store/expense-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../util/http";

// スクリーンはApp.jsの中でナビゲーション登録をしているので、navigationプロパティが引数で使える。
function ManageExpense({route, navigation}) {

  const expensesCtx = useContext(ExpnsesContext);

  // 新規追加の時はparamsがない。route.paras.expsenIdだとそのときにこけてしまうので
  // route.params?としてnull許容をする(javascript構文)　→ 新規の時はundefinedが返ってくる。
  const editExpnseId = route.params?.expenseId;

  // 値をboolean変換してくれる。値がとれていればtrue、なければfalseに変換してくれる。
  // これもjavascript構文
  const isEditing = !!editExpnseId;

  const selectedExpense = expensesCtx.expenses.find((expense) => expense.id === editExpnseId);

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

  function confirmHandler(expenseData) {
    if(isEditing) {
      expensesCtx.updateExpense(editExpnseId, expenseData);
    } else {
      storeExpense(expenseData);
      // expensesCtx.addExpense(expenseData);
    }
    navigation.goBack(); //モーダルもこれで閉じる
  }

  return (
    <View style={styles.container}>
      {/*
        * 前にもどこかで書いたが、コンポーネント独自の引数で関数を渡す場合、ここで渡しているのは
        * 関数の定義のみ。実際の引数は呼び出したコンポーネント内で渡した関数を使う際に()で指定して使う。
        * なので、以下のonCancelとか、onSubmitで渡すのはこのクラス内で定義した関数定義（関数の名前）だけ 
       */}
      <ExpenseForm 
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        defaultValues={selectedExpense}
      />
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
  deleteContainer: {
    marginTop: 16,
    paddinTop: 8,
    borderTopWidth: 2,
    borderColor: GlobalStyles.colors.primary200,
    alignItems: 'center'
  }
});
