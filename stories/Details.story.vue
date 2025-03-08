<script setup lang="ts">
import { AnimatePresence, Motion } from 'motion-v'
import { ref } from 'vue'

// import { MinusIcon, PlusIcon } from '@heroicons/vue/20/solid'

const open = ref(false)
const visible = ref(false)

async function toggle() {
  if (!open.value) {
    open.value = true
    visible.value = true

    return
  }

  visible.value = false
}
</script>

<template>
  <Story title="details element">
    <Variant title="motion js">
      <details
        :open="open"
        class="focus-visible:outline-2 max-w-md focus-visible:outline-yellow-500"
        ref="details"
      >
        <summary
          ref="summary"
          :class="[
            '[&::-webkit-details-marker]:hidden list-none'
          ]"
          class="cursor-default flex items-center justify-between focus-visible:outline-2 focus-visible:outline-red-500"
          @click.prevent="toggle"
        >
          summary
          <span class="in-open:rotate-180 transition">↓</span>
        </summary>
        <AnimatePresence @exit-complete="open = false">
          <Motion
            v-show="visible"
            as="div"
            :initial="{ height: 0, opacity: 0 }"
            :animate="{ height: 'auto', opacity: 1 }"
            :exit="{ height: 0, opacity: 0 }"
            :transition="{ duration: 0.2 }"
            class="overflow-hidden"
          >
            No line break, paragraphs are too tight Excepteur id velit quis fugiat adipiscing nulla.
            Aut id anim incididunt dolor ullamco ex veniam. Pariatur quis ad deserunt consequat qui.
            Fugiat Lorem quis non amet laboris enim consequat magna eiusmod pariatur esse laboris.
            Cupidatat proident culpa eu dolor ut veniam pariatur elit culpa elit dolore sunt et ea.
            Sit do eiusmod velit. Aliquip fugiat mollit ea adipiscing velit consectetur sit irure
            labore. Anim laboris ipsum ipsum. # Extra line break, too much space Excepteur id velit
            quis fugiat adipiscing nulla. Aut id anim incididunt dolor ullamco ex veniam. Pariatur
            quis ad deserunt consequat qui. Fugiat Lorem quis non amet laboris enim consequat magna
            eiusmod pariatur esse laboris. Cupidatat proident culpa eu dolor ut veniam pariatur elit
            culpa elit dolore sunt et ea. Sit do eiusmod velit. Aliquip fugiat mollit ea adipiscing
            velit consectetur sit irure labore. Anim laboris ipsum ipsum.
          </Motion>
        </AnimatePresence>
      </details>
    </Variant>
    <Variant title="motion css">
      <details
        class="focus-visible:outline-2 max-w-md focus-visible:outline-yellow-500"
        ref="details"
        :class="[
          '[interpolate-size:allow-keywords]',
          '[&::details-content]:overflow-hidden',
          '[&::details-content]:opacity-0',
          '[&::details-content]:[block-size:0]',
          '[&::details-content]:transition-[block-size,opacity,content-visibility]',
          '[&::details-content]:transition-discrete',
          '[&::details-content]:ease-out',
          '[&::details-content]:duration-200',
          'open:[&::details-content]:[block-size:auto]',
          'open:[&::details-content]:opacity-100',
        ]"
      >
        <summary
          ref="summary"
          class="cursor-default flex items-center justify-between focus-visible:outline-2 focus-visible:outline-red-500"
          :class="[
            '[&::-webkit-details-marker]:hidden list-none'
          ]"
        >
          summary
          <span class="in-open:rotate-180 transition">↓</span>
        </summary>
        No line break, paragraphs are too tight Excepteur id velit quis fugiat adipiscing nulla. Aut
        id anim incididunt dolor ullamco ex veniam. Pariatur quis ad deserunt consequat qui. Fugiat
        Lorem quis non amet laboris enim consequat magna eiusmod pariatur esse laboris. Cupidatat
        proident culpa eu dolor ut veniam pariatur elit culpa elit dolore sunt et ea. Sit do eiusmod
        velit. Aliquip fugiat mollit ea adipiscing velit consectetur sit irure labore. Anim laboris
        ipsum ipsum. # Extra line break, too much space Excepteur id velit quis fugiat adipiscing
        nulla. Aut id anim incididunt dolor ullamco ex veniam. Pariatur quis ad deserunt consequat
        qui. Fugiat Lorem quis non amet laboris enim consequat magna eiusmod pariatur esse laboris.
        Cupidatat proident culpa eu dolor ut veniam pariatur elit culpa elit dolore sunt et ea. Sit
        do eiusmod velit. Aliquip fugiat mollit ea adipiscing velit consectetur sit irure labore.
        Anim laboris ipsum ipsum.
      </details>
    </Variant>
  </Story>
</template>
