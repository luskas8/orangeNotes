import 'react-i18next';
import { resources } from '../locates';

declare module 'react-i18next' {
  type DefaultResources = typeof resources;
  interface Resources extends DefaultResources {}
}
