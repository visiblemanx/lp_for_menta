<template>
  <div class="works js-section" id="works">
    <div class="site-container">
      <h3 class="section-title">
        <span class="radius-underline fade-in">
          Works
        </span>
      </h3>
      <dl v-for="work in works" v-if="works" class="mt-12 text-center">
        <dt>
          <span class="works-title text-xl">
            {{work.title}}
          </span>
        </dt>
        <dd class="pl-2">
          <ul class="works-list">
            <li v-for="item in work.urls" class="mt-4 md:flex md:items-center">
              <img :src="`/img/${item.id}.jpeg`" alt="{{item.title}}" width="200" height="150" class="works-image mx-auto md:w-1/2" />
              <a :href="item.url" target="_blank" rel="noopener noreferrer">{{item.title}}</a>
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
        <span v-if="user">
          権限がありません。
        </span>
        <span v-else>
          要ログイン
        </span>
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
  transform: rotate3d(2.3, 0.8, -0.5, 45deg);
  box-shadow: -1rem 1rem 2rem rgb(0 0 0 / 30%);
}
.works-title {
  position: relative;
  display: inline-block;
  font-weight: bold;
  padding: .5rem 1rem;
  border-top: solid 1px #c9ccd1;
  border-bottom: solid 1px #c9ccd1;
}
.works-title:after {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  left: 0;
  right: 0;
  bottom: -0.5rem;
  margin-inline: auto;
  transform: rotate(45deg);
  border-right: solid 1px #c9ccd1;
  border-bottom: solid 1px #c9ccd1;
}
</style>

<script>
import { fbUserState, fbWorksState } from '../store';
import { useStore } from '@nanostores/vue';

export default {
  data: () => ({
    user: useStore(fbUserState),
    works: useStore(fbWorksState)
  })
}
</script>