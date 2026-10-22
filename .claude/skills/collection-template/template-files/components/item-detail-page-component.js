import { getItem } from '../data.js';

export default {
  name: 'item-detail-page-component',
  setup() {
    const route = VueRouter.useRoute();
    const state = Vue.reactive({
      isLoading: true,
      error: '',
    });
    const selectedItem = Vue.ref(null);

    // Load the item whenever the id in the URL changes.
    Vue.watch(
      () => route.params.id,
      (id) => {
        state.isLoading = true;
        state.error = '';
        getItem(id)
          .then((item) => {
            selectedItem.value = item;
          })
          .catch(() => {
            state.error = 'There was a problem loading this item.';
            selectedItem.value = null;
          })
          .finally(() => {
            state.isLoading = false;
          });
      },
      { immediate: true },
    );

    return {
      state,
      selectedItem,
    };
  },
  template: /* html */ `
    <section class="container py-4">
      <router-link to="/items" class="btn btn-link ps-0 mb-3">← Back to collection</router-link>

      <div v-if="state.isLoading" class="alert alert-secondary" role="status">
        Loading item details...
      </div>

      <div v-else-if="state.error" class="alert alert-danger" role="alert">
        {{ state.error }}
      </div>

      <div v-else-if="!selectedItem" class="alert alert-warning" role="alert">
        Item not found.
      </div>

      <article v-else class="card shadow-sm border-0 overflow-hidden">
        <img
          v-if="selectedItem.image_url"
          :src="selectedItem.image_url"
          :alt="selectedItem.name"
          class="item-detail-image w-100 object-fit-cover" />
        <div
          v-else
          class="item-detail-image w-100 d-flex align-items-center justify-content-center bg-light text-muted">
          No image available
        </div>

        <div class="card-body p-4">
          <div class="d-flex align-items-center gap-2 mb-2">
            <h1 class="h3 mb-0">{{ selectedItem.name }}</h1>
            <span class="badge text-bg-primary">{{ selectedItem.category || 'General' }}</span>
          </div>

          <p class="lead mb-3">{{ selectedItem.description || 'No description available.' }}</p>
          <p class="mb-0"><strong>Location:</strong> {{ selectedItem.location || 'N/A' }}</p>
          <p class="text-muted mt-2 mb-0"><strong>Item ID:</strong> {{ selectedItem.id }}</p>
        </div>
      </article>
    </section>
  `,
};
