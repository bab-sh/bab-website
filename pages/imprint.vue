<template>
  <main class="bg-background min-h-screen py-24">
    <div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <NuxtLink
        to="/"
        class="text-muted-foreground mb-8 inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
      >
        <Icon name="lucide:arrow-left" class="h-4 w-4" />
        Back to Home
      </NuxtLink>

      <h1 class="mb-12 text-4xl font-bold text-white">Imprint</h1>

      <div class="space-y-10">
        <section>
          <h2 class="mb-4 text-xl font-semibold text-white">Information according to § 5 TMG</h2>
          <p class="text-muted-foreground">Sebastian Stepper</p>
        </section>

        <section>
          <h2 class="mb-4 text-xl font-semibold text-white">Contact</h2>
          <p class="text-muted-foreground">
            Email:
            <a href="mailto:info@bab.sh" class="text-bab-light transition-colors hover:text-white">
              info@bab.sh
            </a>
          </p>
        </section>

        <section>
          <h2 class="mb-4 text-xl font-semibold text-white">Disclaimer</h2>
          <p class="text-muted-foreground mb-4">
            This is a non-commercial open source project. The software is provided "as is", without
            warranty of any kind, express or implied.
          </p>

          <h3 class="mb-2 text-lg font-medium text-white">Liability for Content</h3>
          <p class="text-muted-foreground mb-4">
            The contents of this website have been created with the utmost care. However, I cannot
            guarantee the accuracy, completeness, or timeliness of the content. As a service
            provider, I am responsible for my own content on these pages according to general laws.
            However, I am not obligated to monitor transmitted or stored third-party information or
            to investigate circumstances that indicate illegal activity.
          </p>

          <h3 class="mb-2 text-lg font-medium text-white">Liability for Links</h3>
          <p class="text-muted-foreground">
            This website contains links to external third-party websites over whose content I have
            no influence. Therefore, I cannot assume any liability for this external content. The
            respective provider or operator of the linked pages is always responsible for the
            content of the linked pages. The linked pages were checked for possible legal violations
            at the time of linking. Illegal content was not recognizable at the time of linking.
          </p>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'Imprint',
    description: 'Legal information and contact details for the bab project.',
  })
</script>
