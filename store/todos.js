//firebaseとvuexfireをimport
import firebase from '~/plugins/firebase'
import { firestoreAction } from 'vuexfire'

//firebaseのdbを定義
const db = firebase.firestore()
const todosRef = db.collection('todos')

//todoリストを管理するstateの定義
export const state = () => ({
  todos: []
})

//actionを定義
export const actions = {
  //initは初期化
  init: firestoreAction(({ bindFirestoreRef }) => {
    bindFirestoreRef('todos', todosRef)
  }),
  //addはtodoの追加
  add: firestoreAction((context, name) => {
    //ifは未入力のチェック
    if (name.trim()) {
      todosRef.add({
        name: name,
        done: false,//タスクの完了(true)or未完了(false)
        //created タスクの入力時間をサーバから取得し記録する
        created: firebase.firestore.FieldValue.serverTimestamp()
      })
    }
  }),
  //removeはtodoの削除
  remove: firestoreAction((context, id) => {
    todosRef.doc(id).delete()
  }),
  //toggleはチェックボックス操作時の処理 firebasedbのdoneの状態切替
  toggle: firestoreAction((context, todo) => {
    console.log(todosRef)//test
    todosRef.doc(todo.id).update({
      done: !todo.done// doneの反転処理
    })
  })
}
