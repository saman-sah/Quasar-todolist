<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
        />

        <q-toolbar-title class="absolute-center">
          To Do List
        </q-toolbar-title>

      </q-toolbar>
    </q-header>
    <!--End--- Header -->

    <!-- Footer -->
    <q-footer>
      <q-tabs>
        <q-route-tab 
        v-for="link in essentialLinks"
        :key="link.title"
        :to="link.link"
        :icon="link.icon" 
        :label="link.title" />
      </q-tabs>
    </q-footer>
    <!--End--- Footer -->

    <!-- Sidebar -->
    <q-drawer
      show-if-above
      bordered
      :width="230"
      :breakpoint="767"
      class="bg-dark text-accent"
    >
      <q-list>
        <q-item-label
          header
        >
          Navigation
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>
    <!--End--- Sidebar -->

    <!-- Page Content -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <!--End--- Page Content -->
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'ToDo',
    icon: 'list',
    link: '/'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {

    return {
      essentialLinks: linksList,
    }
  }
})
</script>

<style>
@media  screen and (min-width: 767px) {
  .q-footer {
    display: none;
  } 
}

</style>