<template>
  <div class="works">
    <div class="site-container">
      <h3 class="section-title">
        <span class="radius-underline">
          Works
        </span>
      </h3>
      <dl v-for="work in works" v-if="works" class="mt-8 text-center">
        <dt class="text-xl font-bold">
          {{work.title}}
        </dt>
        <dd class="pl-2">
          <ul class="works-list">
            <li v-for="item in work.urls" class="mt-4 md:flex md:items-center">
              <img :src="`/img/${item.id}.jpeg`" alt="{{item.title}}" width="200" height="150" class="works-image mx-auto md:w-1/2" />
              <a :href="item.url" target="_blank" rel="noopener noreferrer" class="text-indigo-500 underline underline-offset-4 decoration-dotted flex-1 mt-4 md:mt-0 block hover:text-indigo-300">{{item.title}}</a>
            </li>
          </ul>
        </dd>
        <ul class="mt-4">
          <li v-for="element in work.elements" class="inline-block bg-indigo-100 text-indigo-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
            {{ element }}
          </li>
        </ul>
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
.works-list > li {
  transform-style: preserve-3d;
  perspective: 70rem;
}
.works-image {
  transform: rotate3d(1.3, 1.8, -0.5, 45deg);
  box-shadow: -1rem 1rem 2rem rgb(0 0 0 / 30%);
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