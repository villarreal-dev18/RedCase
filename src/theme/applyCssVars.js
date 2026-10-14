import { colors, gradients } from './tokens';

export function applyCssVars() {
  const root = document.documentElement;

  Object.entries(colors).forEach(([key, value]) => {
    const name = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
    root.style.setProperty(`--rc-${name}`, value);
  });

  root.style.setProperty('--rc-gradient-brand', gradients.brand);
}