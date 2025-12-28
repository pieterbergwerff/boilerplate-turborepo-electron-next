// import types
import type { BrowserWindow as BrowserWindowType } from 'electron';
import type Electron from 'electron';

type ElectronGetMenuFunction = (args: {
  win: BrowserWindowType | undefined;
}) => Electron.MenuItemConstructorOptions[];

const getMenuUtil: ElectronGetMenuFunction = ({
  win,
}: {
  win: BrowserWindowType | undefined;
}) => [
  { label: 'File', submenu: [{ role: 'quit' }] },
  { label: 'Edit', submenu: [{ role: 'copy' }, { role: 'paste' }] },
  {
    label: 'View',
    submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }],
  },
  {
    label: 'Theme',
    submenu: [
      {
        label: 'Light',
        click: () => win?.webContents.send('menu:theme', 'light'),
      },
      {
        label: 'Dark',
        click: () => win?.webContents.send('menu:theme', 'dark'),
      },
    ],
  },
];

export default getMenuUtil;
