import firebase from 'firebase'

//firebaseの初期化に必要なパラメータをオブジェクト形式で定義
const config = {
  projectId: process.env.FIREBASE_PROJECT_ID
}

//ifで２重で初期化されないようにする
if (!firebase.apps.length) {
  //firebaseの初期化
  firebase.initializeApp(config)
}

//他の場所から使えるよう指定
export default firebase
