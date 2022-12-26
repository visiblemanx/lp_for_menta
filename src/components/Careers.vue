<template>
  <div class="site-container">
    <h3 class="section-title">
      <span class="radius-underline fade-in">
        Careers
      </span>
    </h3>
    <div v-if="careers">
      <ol class="relative border-l border-indigo-200">
        <li class="py-4 pl-4 md:pl-8" v-for="career in careers">
          <div class="absolute w-3 h-3 bg-indigo-200 rounded-full mt-1.5 -left-1.5 border border-indigo-300"></div>
          <time class="mb-1 text-sm font-normal leading-none text-gray-500">
            {{career.started_at}} 〜 {{career.ended_at}}
          </time>
          <p v-if="career.url === '終了'" class="text-gray-600 mt-2">
            <span class="text-lg font-semibold">{{career.title}}</span>（サービス終了）
          </p>
          <h3 class="text-lg font-semibold text-gray-600 mt-2" v-else>
            <a :href="career.url" target="_blank" rel="noopener noreferrer">{{career.title}}</a>
          </h3>
          <ul class="mb-4 text-base font-normal text-gray-600 mt-4 list-disc pl-4">
            <li v-for="item in career.items" class="mt-2">
              {{item}}
            </li>
          </ul>
        </li>
      </ol>
    </div>
    <p class="text-center" v-else>
      <span v-if="user">
        権限がありません。
      </span>
      <span v-else>
        要ログイン
      </span>
    </p>
  </div>
</template>

<style>

</style>

<script>
import { fbUserState, fbCareersState } from '../store';
import { useStore } from '@nanostores/vue';

export default {
  data: () => ({
    user: useStore(fbUserState),
    careers: useStore(fbCareersState)
  })
}
</script>