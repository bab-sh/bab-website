<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1334 1292" :class="props.class">
    <defs>
      <linearGradient id="glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e5b5fe" />
        <stop offset="100%" stop-color="#d09df7" />
      </linearGradient>
      <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="20" result="coloredBlur" />
        <feMerge>
          <feMergeNode in="coloredBlur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
    <g :filter="props.glow ? 'url(#glow)' : undefined">
      <polygon points="668,0 0,1027 668,1292" fill="#e5b5fe" />
      <polygon points="668,0 668,1292 1334,1026" fill="#d09df7" />
    </g>
  </svg>
</template>

<script setup lang="ts">
  const props = defineProps<{
    class?: string
    glow?: boolean
  }>()
</script>
