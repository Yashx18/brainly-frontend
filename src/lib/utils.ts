export const cn = (...classes: (undefined | string | null | false)[]) => {
  return classes.filter(Boolean).join(' ');
};
