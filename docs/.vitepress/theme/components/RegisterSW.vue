<script setup lang="ts">
import { onBeforeMount, ref } from "vue";

const offlineReady = ref(false);
function onOfflineReady() {
	offlineReady.value = true;
}
async function close() {
	offlineReady.value = false;
}

onBeforeMount(async () => {
	const { registerSW } = await import("virtual:pwa-register");
	registerSW({
		immediate: true,
		onOfflineReady,
		onRegistered() {
			console.info("Service Worker registered");
		},
		onRegisterError(e) {
			console.error("Service Worker registration error!", e);
		},
	});
});
</script>

<template>
	<template v-if="offlineReady"> </template>
</template>
<!--
<template>
  <template v-if="offlineReady">
    <div
      class="pwa-toast"
      role="alertdialog"
      aria-labelledby="pwa-message"
    >
      <div id="pwa-message" class="mb-3">
        App ready to work offline
      </div>
      <button
        type="button"
        class="pwa-cancel"
        @click="close"
      >
        Close
      </button>
    </div>
  </template>
</template>
-->
