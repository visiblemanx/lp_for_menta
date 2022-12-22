<template>
  <div class="site-container">
    <div v-if="user">
      <div class="p-6 flex justify-center">
        <button class="rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 uppercase font-bold tracking-widest transition duration-200 ease-in-out transform hover:scale-110" @click="logout">ログアウト</button>
      </div>
    </div>
    <div v-else>
      <div class="md:text-center text-sm">
        <p>
          Works, Careers の閲覧には顧客情報が含まれており 閲覧にはログインと権限が必要です
        </p>
      </div>
      <!--
      <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <ul class="flex flex-wrap -mb-px">
          <li class="mr-2">
            <a href="#google" @click="setTab" class="inline-block p-4 rounded-t-lg border-b-2" :class="{'border-indigo-600 text-indigo-600': currentTabName == 'google', 'border-transparent hover:text-gray-600 hover:border-gray-300': currentTabName != 'google'}">Googleログイン</a>
          </li>
          <li class="mr-2">
            <a href="#signUp" @click="setTab" class="inline-block p-4 rounded-t-lg border-b-2" :class="{'border-indigo-600 text-indigo-600': currentTabName == 'signUp', 'border-transparent hover:text-gray-600 hover:border-gray-300': currentTabName != 'signUp'}">新規登録</a>
          </li>
          <li class="mr-2">
            <a href="#login" @click="setTab" class="inline-block p-4 rounded-t-lg border-b-2" :class="{'border-blue-600 text-blue-600': currentTabName == 'login', 'border-transparent hover:text-gray-600 hover:border-gray-300': currentTabName != 'login'}">ログイン</a>
          </li>
        </ul>
      </div>
      -->
      <div class="flex justify-center mt-4 p-4" v-if="currentTabName == 'google'">
        <button type="button" @click="googleLogin" class="rounded-full nm-flat-gray-200 hover:nm-flat-gray-200-lg leading-5 px-8 py-4 font-bold tracking-widest transition duration-200 ease-in-out transform hover:scale-110 flex items-center">
        <svg class="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
        Sign in with Google
      </button>
      </div>
      <form @submit.prevent="signUpSubmit" method="post" v-if="currentTabName == 'signUp'">
        <div class="bg-white shadow-md rounded p-6 md:px-8">
          <div class="p-4 text-center text-sm">{{message.signUp}}</div>
          <div class="flex items-center">
            <label class="block text-gray-700 text-sm font-bold w-40" for="email">
              メールアドレス
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500': error.code === 'auth/email-already-in-use'}" id="email" type="email" placeholder="" v-model="form.email" required>
          </div>
          <p class="text-red-500 text-xs italic mt-2 text-center" v-if="error.code === 'auth/email-already-in-use'">すでに存在するメールアドレスです</p>
          <div class="mt-4 flex items-center">
            <label class="block text-gray-700 text-sm font-bold w-40" for="password">
              パスワード
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500': error.code === 'auth/weak-password'}" id="password" type="password" placeholder="" v-model="form.password" required>
          </div>
          <p class="text-red-500 text-xs italic mt-2 text-center" v-if="error.code === 'auth/weak-password'">弱いパスワードです</p>
          <div class="flex mt-4 items-center justify-center">
            <button class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              新規登録
            </button>
          </div>
        </div>
      </form>
      <form @submit.prevent="loginSubmit" method="post" v-if="currentTabName == 'login'">
        <div class="bg-white shadow-md rounded p-6 md:px-8">
          <div class="p-4 text-center">{{message.login}}</div>
          <div class="flex items-center">
            <label class="block text-gray-700 text-sm font-bold w-40" for="email">
              メールアドレス
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500': error.code === 'auth/user-not-found'}" id="email" type="email" placeholder="" v-model="form.email" required>
          </div>
          <p class="text-red-500 text-xs italic mt-2 text-center" v-if="error.code === 'auth/user-not-found'">ユーザーが見つかりません</p>
          <div class="mt-4 flex items-center">
            <label class="block text-gray-700 text-sm font-bold w-40" for="password">
              パスワード
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" :class="{'border-red-500': error.code === 'auth/wrong-password'}" id="password" type="password" placeholder="" v-model="form.password" required>
          </div>
          <p class="text-red-500 text-xs italic mt-2 text-center" v-if="error.code === 'auth/wrong-password'">パスワードが間違っています</p>
          <div class="flex mt-4 items-center justify-center">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              ログイン
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Firebase from '../firebase.js'
import { fbUserState, fbWorksState, fbCareersState } from '../store';
import { useStore } from '@nanostores/vue';
import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export default {
  data: () => ({
    form: {
      email: '',
      password: '',
    },
    user: useStore(fbUserState),
    works: useStore(fbWorksState),
    careers: useStore(fbCareersState),
    error: {
      code: null,
      message: null
    },
    currentTabName: 'google',
    message: {
      signUp: '確認メールをメールアドレス宛に送らせて頂きます',
      login: null
    }
  }),
  async mounted () {
    await Firebase.initialize();
  },
  methods: {
    init () {
      this.error.code = null;
      this.error.message = null;
      this.message.signUp = null;
      this.message.login = null;
    },
    async signUpSubmit () {
      await createUserWithEmailAndPassword(Firebase.auth, this.form.email, this.form.password)
        .then((userCredential) => {
          console.log({userCredential});
          this.sendEmail(userCredential.user);
          this.init();
        })
        .catch((error) => {
          this.error.code = error.code;
          this.error.message = error.message;
          console.log({error});
        });
      return false;
    },
    async loginSubmit () {
      await signInWithEmailAndPassword(Firebase.auth, this.form.email, this.form.password)
        .then((userCredential) => {
          if (userCredential.user.emailVerified) {
            Firebase.initialize();
            this.message = null;
          } else {
            this.message = `${userCredential.user.email}は認証が完了していません`;
          }
          this.init();
        })
        .catch((error) => {
          this.error.code = error.code;
          this.error.message = error.message;
          this.message = null;
          console.log({error});
        });
      return false;
    },
    async sendEmail (currentUser) {
      try {
        await sendEmailVerification(currentUser);
        this.message.signUp = 'メールを送りました';
      } catch (e) {
        console.error(e)
        this.message.signUp = 'メールを送れませんでした。。。';
      }
    },
    async googleLogin () {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(Firebase.auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
    setTab (e) {
      e.preventDefault();
      console.log(e.currentTarget.href.split('#'))
      this.currentTabName = e.currentTarget.href.split('#')[1];
    },
    logout () {
      signOut(Firebase.auth)
        .then(() => {
          console.log("Sign-out successful.");
          fbUserState.set(false);
          fbWorksState.set(false);
          fbCareersState.set(false);
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }
}
</script>