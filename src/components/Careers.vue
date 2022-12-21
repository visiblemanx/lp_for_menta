<template>
  <div class="site-container">
    <h3>Careers</h3>
    <dl v-for="career in careers" v-if="careers">
      <dt>
        <span v-if="career.url === '終了'">{{career.title}}</span>
        <a :href="career.url" target="_blank" rel="noopener noreferrer" v-else>{{career.title}}</a>
      </dt>
      <dd>
        <div>
          {{career.started_at}} 〜 {{career.ended_at}}
        </div>
        <ul>
          <li v-for="item in career.items">
            {{item}}
          </li>
        </ul>
      </dd>
    </dl>
    <p class="text-center" v-else>
      要ログイン
    </p>
  </div>
</template>

<style>

</style>

<script>
import { fbCareersState } from '../store';
import { useStore } from '@nanostores/vue';

export default {
  data: () => ({
    careers: useStore(fbCareersState)
  })
}
</script>