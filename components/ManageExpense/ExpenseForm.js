import { View, Text, StyleSheet, TextInput } from "react-native";
import Input from "./Input";
import { useState } from "react";

function ExpenseForm() {

    // 入力値自体を他の画面で引き回さないので、単独のuseStateでOK。
    // setAmountValueの保存先としてamountValueが紐づいた状態で返ってくる。
    // const [amountValue, setAmountValue] = useState('');

    // function amountChangeHandler(enteredText) {
    //     setAmountValue(enteredText);
    // }



    // 管理したいステート変数が複数ある場合のやり方
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: '',
    });

    function inputChangeHandler(inputIdentifier ,enteredValue) {
        // 変わってない他の変数はそのままで変えたいところだけ変えたいときは、
        // 以下のようにset関数の引数を関数形式でセットする。
        // [inputIdentifier]はjs構文のテクニックでダイナミックプロパティ（変数値をプロパティのキーとして設定）のやり方
        // これによって、inputのキーだけが異なって後は全部同じ場合の共通関数が出来上がる。
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            }
        });
    }


    return <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input
                label="Amount"
                textInputConfig={{
                    keyboardType: 'decimal-pad',
                    // 入力値（上で言うenteredValueはonChangeText経由で渡ってくるので、省略できる）
                    // それ以外は追加引数扱いになるので、以下のようにthisと一緒に値を渡す。
                    onChangeText: inputChangeHandler.bind(this, 'amount'),
                    value: inputValues.amount
                }}
                // 隣り合う要素にだけ空きスペースを全部使うflex:1を指定したい。
                // Descriptionにまで設定するとレイアウトが崩れたから
                style={styles.rowInput}
            />
            <Input
                label="Date"
                textInputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangeHandler.bind(this, 'date'),
                    value: inputValues.date
                }}
                // 隣り合う要素にだけ空きスペースを全部使うflex:1を指定したい。
                // Descriptionにまで設定するとレイアウトが崩れたから
                style={styles.rowInput}
            />
        </View>
        <Input
            label="Description" 
            textInputConfig={{
                multiLine: true,
                autoCorrect: false,         // 誤字もあえて修正しないようにする。
                autoCapitalize: 'none',     // どのような文書を打っても勝手に大文字変換したりしないようにする
                onChangeText: inputChangeHandler.bind(this, 'description'),
                value: inputValues.description
            }}
        />
    </View>
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    rowInput: {
        flex: 1,
    }
});