<script setup lang="ts">
import {
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  DeviceTabletIcon,
  ExclamationCircleIcon,
  // GlobeAmericasIcon,
  // GlobeAsiaAustraliaIcon,
  // GlobeEuropeAfricaIcon,
  RectangleGroupIcon,
  Square2StackIcon,
} from '@heroicons/vue/24/outline'
import { CheckBadgeIcon } from '@heroicons/vue/24/solid'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CodeCopy from './CodeCopy.vue'
import CSSLogo from './CSSLogo.vue'
import MotionLogo from './MotionLogo.vue'
import ScrollDemo from './ScrollDemo.vue'
import TailwindLogo from './TailwindLogo.vue'
import VueLogo from './VueLogo.vue'
// import packageJson from '../../../packages/vue/package.json'

const globe = ref(1)

onMounted(() => {
  const interval = setInterval(() => {
    globe.value = globe.value === 3 ? 1 : globe.value + 1
  }, 2000)

  onUnmounted(() => {
    clearInterval(interval)
  })
})

const packageManager = ref('npm')

const foo = ref(1)

const commandMap = {
  npm: 'npx',
  yarn: 'npx',
  pnpm: 'pnpm dlx',
  bun: 'bunx --bun',
}

const launchCommand = computed(() => commandMap[packageManager.value])

async function subscribe(event: Event) {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)
  const email = formData.get('email')

  await fetch('/@/sanctum/csrf-cookie', { credentials: 'same-origin' })
  const tokenCookie = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='))
  const xsrfToken = tokenCookie?.split('=')[1]
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (xsrfToken) {
    headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken)
  }

  try {
    const response = await fetch(`/@${new URL(form.action).pathname}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email }),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    alert('Subscription successful!')
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error)
    alert('Subscription failed. Please try again.')
  }
}
</script>
<template>
  <header class="py-8 text-center">
    <div class="flex items-center justify-center pr-2.5">
      <!-- <GlobeAmericasIcon
        v-show="globe === 1"
        class="h-12 w-12 text-yellow-500 dark:text-zinc-600"
      />
      <GlobeEuropeAfricaIcon
        v-show="globe === 2"
        class="h-12 w-12 text-yellow-500 dark:text-zinc-600"
      />
      <GlobeAsiaAustraliaIcon
        v-show="globe === 3"
        class="h-12 w-12 text-yellow-500 dark:text-zinc-600"
      /> -->
      <div class="flex size-14 items-center justify-center">
        <ComputerDesktopIcon
          v-show="globe === 1"
          class="h-14 w-14 text-zinc-400 dark:text-zinc-600"
        />
        <DeviceTabletIcon v-show="globe === 2" class="h-12 w-12 text-zinc-400 dark:text-zinc-600" />
        <DevicePhoneMobileIcon
          v-show="globe === 3"
          class="h-10 w-10 text-zinc-400 dark:text-zinc-600"
        />
      </div>
      <RectangleGroupIcon
        class="h-10 w-10 text-zinc-400 dark:text-zinc-600"
        :class="foo === 1 ? 'block' : 'hidden'"
      />
    </div>
    <h1 class="font-display mt-4 text-5xl font-bold dark:text-zinc-100">Web UI</h1>
    <p class="mx-auto mt-6 max-w-xl px-4 text-xl text-zinc-500">
      Well-abstracted <strong class="text-zinc-500 dark:text-zinc-200">code patterns</strong> that
      leverage the latest capabilities of the
      <strong class="text-zinc-500 dark:text-zinc-300">web-platform</strong>.
    </p>
    <section class="mt-8 text-center">
      <header class="flex flex-col items-center justify-center gap-2">
        <span class="group relative top-px inline-flex items-end text-xl font-bold text-zinc-500">
          <VueLogo class="w-16 text-zinc-500" /><span class="-ml-2 text-green-800">ue</span>
        </span>
        exclusive component library
      </header>
      <div class="mx-auto max-w-md">
        <div class="mt-8 flex gap-8">
          <div class="flex">
            <TailwindLogo class="w-12" />
            <span>
              styled via&nbsp;<a
                class="underline"
                href="https://tailwindcss.com"
                target="_blank"
                rel="noreferrer"
                >tailwindcss.com</a
              >
            </span>
          </div>
          <div class="flex">
            <MotionLogo class="w-11" />
            <span>
              animated with&nbsp;<a
                class="underline"
                href="https://motion.dev"
                target="_blank"
                rel="noreferrer"
                >motion.dev</a
              >
            </span>
          </div>
        </div>

        <div class="mt-8">
          <div class="flex items-end justify-center gap-2">
            <CSSLogo class="w-10" />
            <span>
              uses&nbsp;<a
                class="underline"
                href="https://developer.chrome.com/blog/new-in-web-ui-io-2024"
                target="_blank"
                rel="noreferrer"
                >most modern CSS features</a
              >
            </span>

          </div>
          <ul>
              <li>✓ View Transitions API</li>
              <li>✓ Scroll-driven Animations</li>
              <li>✓ Anchor Positioning</li>
            </ul>
        </div>
      </div>
    </section>
    <section class="mt-12">
      <form
        action="/subscribe"
        class="flex items-center justify-center gap-2"
        @submit.prevent="subscribe"
      >
        <input
          class="peer w-1/3 rounded-full border border-zinc-300 bg-zinc-200 px-5 transition-[width] focus-visible:w-1/2 dark:border-zinc-700 dark:bg-zinc-900"
          name="email"
          type="email"
          required
          placeholder="notify by email..."
        />
        <button
          class="invisible rounded-full px-2 py-1 text-yellow-500 peer-required:invisible peer-valid:visible dark:border-zinc-700 dark:hover:bg-zinc-700"
          type="submit"
        >
          ☆
        </button>
      </form>
    </section>
    <div class="mt-4">
      <label class="text-zinc-500" for="package-manager">I'm using</label>
      <select
        v-model="packageManager"
        id="package-manager"
        class="border-none bg-transparent pr-8 pl-6 outline-none focus:outline-2 focus:outline-yellow-500"
      >
        <option selected>npm</option>
        <option>yarn</option>
        <option>pnpm</option>
        <option>bun</option>
      </select>
    </div>
    <CodeCopy
      class="mt-2 inline-flex items-center rounded-2xl border border-zinc-200 bg-white font-mono text-fuchsia-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-fuchsia-400"
    >
      <template #default
        ><div class="py-3 pr-2 pl-8">{{ launchCommand }} webui.dev use</div></template
      >
      <template #icon="{ status }">
        <div
          class="relative flex h-full items-center pr-5 pl-3 text-zinc-400 empty:hidden"
          :class="status === 'copied' ? 'motion-preset-confetti' : undefined"
        >
          <Square2StackIcon class="size-5" v-if="status === 'waiting'" />
          <CheckBadgeIcon
            class="motion-preset-confetti size-5 text-green-500 dark:text-green-400"
            v-if="status === 'copied'"
          />
          <ExclamationCircleIcon class="size-5 text-red-500" v-if="status === 'fail'" />
        </div>
      </template>
    </CodeCopy>
  </header>
  <main class="isolate mx-auto max-w-screen-md px-4">
    <p class="mt-10 text-center font-bold text-zinc-700 dark:text-zinc-300">this is page</p>
    <div class="mt-14">
      <ScrollDemo />
    </div>

    <!-- <section class="w-full">
      <header class="pl-4 text-xl text-zinc-800 dark:text-zinc-400">
        <code class="dark:text-orange-400">&lt;Action&gt;</code>
        <span class="pl-1 text-sm"
          >based on the
          <a
            target="_blank"
            class="text-sm underline hover:text-zinc-600 dark:text-zinc-200"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button"
          >
            <code>&lt;button&gt;</code></a
          >
          or
          <a
            target="_blank"
            class="text-sm underline hover:text-zinc-600 dark:text-zinc-300"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a"
          >
            <code>&lt;a&gt;</code></a
          >
          element, depending on <CodeComponent class="text-zinc-300">href</CodeComponent> attribute.
        </span>
      </header>
      <div class="mt-4 text-center">
        <Button class="mx-auto">press me</Button>
      </div>
    </section>
    <section class="mt-10 w-full">
      <header class="pl-4 text-lg text-zinc-800 dark:text-zinc-400">
        <code class="dark:text-indigo-400">&lt;Details&gt;</code>
        <span class="text-sm">
          based on the native
          <a
            target="_blank"
            class="text-sm underline hover:text-zinc-600 dark:text-zinc-200"
            href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details"
            >&lt;details&gt;</a
          >
          element</span
        >
      </header>
      <DetailsExample class="mt-2" />
    </section>
    <section class="mt-10 w-full max-w-full">
      <ResponsiveDemo component="dialog" name="&lt;DialogModal&gt;" />
    </section> -->
  </main>
  <footer class="py-6 text-center text-zinc-500">
    by
    <a class="underline" target="_blank" href="https://qruto.to">qruto</a>
  </footer>
</template>

<style>
.resizer {
  position: relative;
  bottom: 50%;
  left: 0;
  height: 12rem;
  /* width: 100%; */
  resize: horizontal;
  overflow: hidden;
  /* min-height: var(--min-height-20);
  max-height: calc(100cqh - (var(--gap-2) + var(--min-heigh-20))); */
  transform-origin: 100% 100%;
  scale: 4 1;
  translate: 28px 1.5rem;
  background: green;
  z-index: 9999;
  clip-path: inset(calc(100% - 14px) 0 0 calc(100% - 14px));
  /* Important to hide it */
  opacity: 0;
}
</style>
