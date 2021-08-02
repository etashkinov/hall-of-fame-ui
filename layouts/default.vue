<template>
  <v-app>
    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

    <dashboard-core-settings />
  </v-app>
</template>

<script>
  import DashboardCoreView from '~/components/core/View'
  import DashboardCoreAppBar from '~/components/core/AppBar'
  import DashboardCoreDrawer from '~/components/core/Drawer'
  import DashboardCoreSettings from '~/components/core/Settings'

  export default {
    name: 'Index',

    components: {
      DashboardCoreAppBar,
      DashboardCoreDrawer,
      DashboardCoreSettings,
      DashboardCoreView,
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
