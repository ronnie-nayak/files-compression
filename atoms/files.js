
import { atom } from "recoil";

export const filesState = atom({
  key: 'files',
  default: [],
});

export const sessionState = atom({
  key: 'session',
  default: ''
})
