export default function calculatePosition(trigger, popover) {
  const triggerRect = trigger.getBoundingClientRect();
  const popoverRect = popover.getBoundingClientRect();

  const triggerWidth = triggerRect.width;
  const triggerHeight = triggerRect.height;
  const popoverWidth = popoverRect.width;

  const scrollTop = window.scrollY;
  const scrollLeft = window.scrollX;

  let top, left;

  top = triggerRect.top + scrollTop + triggerHeight -60;
  left = triggerRect.left + scrollLeft + (triggerWidth - popoverWidth) / 2-10;

  return {
    top: Math.round(top), // Округляем до целых пикселей
    left: Math.round(left) // для стабильного позиционирования
  };
}
