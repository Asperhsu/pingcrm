<template>
  <button type="button" @click="show = true" ref="root">
    <slot />
    <teleport to="body">
      <div v-if="show">
        <div style="position: fixed; top: 0; right: 0; left: 0; bottom: 0; z-index: 99998; background: black; opacity: .2" @click="show = false" />
        <div ref="dropdown" style="position: absolute; z-index: 99999;" @click.stop="show = autoClose ? false : true">
          <slot name="dropdown" />
        </div>
      </div>
    </teleport>
  </button>
</template>

<script>
import { ref, watch, nextTick, onMounted } from 'vue'
import Popper from 'popper.js'

export default {
  props: {
    placement: {
      type: String,
      default: 'bottom-end',
    },
    boundary: {
      type: String,
      default: 'scrollParent',
    },
    autoClose: {
      type: Boolean,
      default: true,
    },
  },
  setup (props) {
    const root = ref(null);
    const dropdown = ref(null);
    const show = ref(false);
    let popper;

    watch(show, (show) => {
      if (show) {
        nextTick(function () {
          popper = new Popper(root.value, dropdown.value, {
            placement: props.placement,
            modifiers: {
              preventOverflow: { boundariesElement: props.boundary },
            },
          })
        });
      } else if (popper) {
        setTimeout(() => popper.destroy(), 100)
      }
    });

    onMounted(() => {
      document.addEventListener('keydown', e => {
        if (e.keyCode === 27) {
          show.value = false
        }
      })
    });

    return { root, dropdown, show };
  },
}
</script>
