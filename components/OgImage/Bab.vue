<script setup lang="ts">
  defineProps<{
    title?: string
    description?: string
    version?: string
  }>()
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '70px 90px',
      backgroundColor: '#0a0a0a',
      backgroundImage: `
        radial-gradient(ellipse 120% 60% at 50% -10%, rgba(208, 157, 247, 0.12) 0%, transparent 70%),
        radial-gradient(ellipse 80% 60% at 85% 90%, rgba(229, 181, 254, 0.08) 0%, transparent 65%),
        radial-gradient(ellipse 70% 50% at 10% 60%, rgba(184, 125, 232, 0.05) 0%, transparent 60%),
        linear-gradient(rgba(208, 157, 247, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(208, 157, 247, 0.03) 1px, transparent 1px)
      `
        .replace(/\s+/g, ' ')
        .trim(),
      backgroundSize: '100% 100%, 100% 100%, 100% 100%, 50px 50px, 50px 50px',
      fontFamily: 'Montserrat, Inter, sans-serif',
    }"
  >
    <div :style="{ display: 'flex', flexDirection: 'column', gap: '24px' }">
      <div v-if="version" :style="{ display: 'flex' }">
        <span
          :style="{
            fontSize: '24px',
            fontWeight: 500,
            color: '#e5b5fe',
            backgroundColor: 'rgba(208, 157, 247, 0.15)',
            border: '1px solid rgba(208, 157, 247, 0.3)',
            borderRadius: '9999px',
            padding: '9px 21px',
          }"
        >
          {{ version }}
        </span>
      </div>

      <div :style="{ display: 'flex', alignItems: 'center' }">
        <svg width="120" height="120" viewBox="0 0 1334 1292" :style="{ flexShrink: 0 }">
          <polygon points="668,0 0,1027 668,1292" fill="#e5b5fe" />
          <polygon points="668,0 668,1292 1334,1026" fill="#d09df7" />
        </svg>
        <span
          :style="{
            fontSize: '128px',
            fontWeight: 700,
            color: '#e5b5fe',
            letterSpacing: '-4px',
            lineHeight: 1,
            marginLeft: '20px',
          }"
        >
          Bab
        </span>
      </div>

      <div
        :style="{
          fontSize: '48px',
          fontWeight: 600,
          color: '#fafafa',
          lineHeight: 1.2,
          marginTop: '8px',
        }"
      >
        {{ title || 'Modern Task Runner' }}
      </div>

      <div
        :style="{
          fontSize: '30px',
          fontWeight: 400,
          color: 'rgba(250, 250, 250, 0.6)',
          lineHeight: 1.4,
          maxWidth: '900px',
        }"
      >
        {{
          description ||
          'Zero-dependency, cross-platform task runner with simple YAML configuration.'
        }}
      </div>
    </div>
  </div>
</template>
