<template>
  <div>
    <!-- ユーザー名を一覧表示 -->
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- todo.createdはfirebaseから取得するのに時間がかかるので、取得前は表示しない取得後表示する -->
        <span v-if='todo.created'>
          <!-- 状態管理 v-bind:checkedでチェックするとtrue/falseにバイディング -->
          <!-- @changeでチェックボックスの変更を検知するとtoggle methodsを実行 -->
          <input
            type="checkbox"
            v-bind:checked="todo.done"
            @change="toggle(todo)"
          >
          <!-- 項目ごとに個別に表示 -->
          <!-- :classで値(todo.done)がtrueならdoneのclassを付与 falseなら付与しない -->
          <span v-bind:class="{ done: todo.done }">
            <!-- toDate()にするとタイムスタンプの表記がわかりやすく変更される -->
            {{ todo.name }} {{ todo.created.toDate()}}        </span>
          <!-- db削除ボタン -->
          <button v-on:click="remove(todo.id)">X</button>
        </span>

      </li>
    </ul>
    <div class="form">
      <!-- submitでadd methodを実行 .preventでsubmitしても画面遷移しないように指定 -->
      <form v-on:submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  //dataで一時的にユーザー名と完了・未完了の状態を管理
  data: function() {
    return {
      name:'',
      done: false
    }
  },
  //createdのタイミングでfirebaseの初期化
  created: function () {
    this.$store.dispatch('todos/init')
  },
  methods: {
    add(){
      //追加firebaseへユーザー登録
      this.$store.dispatch('todos/add', this.name)
      //ユーザー登録完了したらdataのnameを初期値に戻す
      this.name = ''
    },
    //引数のidはfirebaseのIDを意味する
    remove(id){
      this.$store.dispatch('todos/remove', id)
    },
    toggle(todo){
      this.$store.dispatch('todos/toggle', todo)
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.todos
    },
  }
}
</script>

<style scoped>
/* doneがtrueなら線をひく */
li > span > span.done {
  text-decoration: line-through;
}
</style>
