<template>
  <router-view />
</template>

<script>
export default {
  created() {
    // serviceWorker registration
    if ("serviceWorker" in navigator) {
      addEventListener("load", async () => await navigator.serviceWorker.register("/worker.js") )
    }

    const subscribe = async () => {
      const serviceWorker = await navigator.serviceWorker.ready
      const subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BHaIUmZ3coOQZLjrHqyJEUGPAPfkL9iLg1gUtsKgXOWeVBM4ojU_PvQAhrbZXuymhyEyQxl-5QR_34FbO3flYlI",
      })
      //this subscription send to the server with other info about the user
      // console.log(JSON.stringify(subscription))
    }
    subscribe()
  },
}
</script>
