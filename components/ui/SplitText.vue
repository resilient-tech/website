<template>
  <component :is="tag" class="split">
    <template v-for="(word, i) in words">
      <span :key="i" class="w"><component :is="word.em ? 'em' : 'span'" :style="{ '--i': i }">{{ word.text }}</component></span>{{ ' ' }}
    </template>
  </component>
</template>

<script>
// words wrapped in *stars* render in italics
function splitWords(text) {
  let inEmphasis = false
  return text.split(/\s+/).map((raw) => {
    if (raw.startsWith('*')) inEmphasis = true
    const word = { text: raw.replace(/\*/g, ''), em: inEmphasis }
    if (raw.endsWith('*')) inEmphasis = false
    return word
  })
}

export default {
  props: {
    text: { type: String, required: true },
    tag: { type: String, default: 'h2' },
  },
  computed: {
    words() {
      return splitWords(this.text)
    },
  },
}
</script>
