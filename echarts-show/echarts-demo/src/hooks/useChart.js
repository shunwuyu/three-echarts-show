import { onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { throttle } from 'lodash-es';
import { useResize } from './useResize';

export function useChart(
  elRef,
  theme
) {
  let chartsInstenceRef = null;
  let resizeFn = resize;
  const debounceResize = throttle(resizeFn, 200);
  resizeFn = debounceResize;

  function init() {
    chartsInstenceRef = echarts.init(elRef.value, theme);
  }
  const setOptions = (options) => {
    init();
    nextTick(() => {
      chartsInstenceRef?.setOption(options);
    });
  };

  function resize() {
    if (!chartsInstenceRef) {
      return;
    }
    chartsInstenceRef?.resize();
  }
  useResize(resizeFn);
  onUnmounted(() => {
    if (!chartsInstenceRef) {
      return;
    }
    chartsInstenceRef.dispose();
    chartsInstenceRef = null;
  });
  return {
    setOptions,
    echarts,
  };
}