<template>
  <div class="works">
    <div class="container">
      <h3>Works</h3>
      <dl v-for="work in works" v-if="works">
        <dt>
          <a :href="work.url" target="_blank" rel="noopener noreferrer">{{work.title}}</a>
        </dt>
        <dd>
          <ul>
            <li v-for="item in work.urls">
              <a :href="item.url" target="_blank" rel="noopener noreferrer">{{item.title}}</a>
            </li>
          </ul>
        </dd>
      </dl>
      <p class="text-center" v-else>
        要ログイン
      </p>
    </div>
  </div>
</template>

<style>
.works {
  background-color: #fff;
}
</style>

<script>
import { fbWorksState } from '../store';
import { useStore } from '@nanostores/vue';

export default {
  data: () => ({
    works: useStore(fbWorksState)
  })
}
</script>