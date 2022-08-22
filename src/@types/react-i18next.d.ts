import 'react-i18next';
import { resources } from '../locates';

declare module 'react-i18next' {
  type DefaultResources = typeof resources['en-US'];
  interface Resources extends DefaultResources {}
}