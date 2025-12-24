// import components
import { Icon } from '@packages/ui/molecules/Icon';
import { PageMeta } from '@packages/ui/atoms/PageMeta';

/**
 * Settings page showing example IPC calls.
 * @returns {React.JSX.Element} Settings UI with actions
 */
export default function SettingsPage(): React.JSX.Element {
  return (
    <>
      <PageMeta title="Settings" />
      <div className="grid grid-cols-[260px_1fr] h-full w-full overflow-hidden text-black">
        <aside className="border-r border-gray-200 bg-[rgb(238,238,238)] h-full overflow-y-auto">
          <nav className="py-1 text-sm text-gray-900">
            <button className="w-full text-left">
              <div className="row bg-[rgb(225,233,244)]">
                <div className="flex items-center gap-3">
                  <Icon type="default" />
                  <span className="font-medium text-[rgb(0,102,204)]">
                    General
                  </span>
                </div>
              </div>
            </button>

            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Wi-Fi</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Bluetooth</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Network</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Appearance</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Notifications</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Sound</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Focus</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Screen Time</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Privacy &amp; Security</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Desktop &amp; Dock</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Displays</span>
              </div>
            </div>
            <div className="row">
              <div className="flex items-center gap-3">
                <Icon type="default" />
                <span className="text-gray-900">Battery</span>
              </div>
            </div>
          </nav>
        </aside>

        <section className="bg-[rgb(246,246,246)] h-full w-full overflow-y-auto">
          <header className="flex items-center gap-3 px-6 py-5">
            <Icon type="mac-settings" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">General</h2>
              <p className="text-xs text-gray-600">
                Manage your settings for macOS.
              </p>
            </div>
          </header>
          <div className="subtle-divider"></div>

          <ul className="text-sm">
            <li className="row">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded bg-black/10"></span>
                <span>About</span>
              </div>
              <span aria-hidden="true" className="text-black/30">
                ›
              </span>
            </li>
            <li className="row">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded bg-black/10"></span>
                <span>Software Update</span>
              </div>
              <span aria-hidden="true" className="text-black/30">
                ›
              </span>
            </li>
            <li className="row">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded bg-black/10"></span>
                <span>Storage</span>
              </div>
              <span aria-hidden="true" className="text-black/30">
                ›
              </span>
            </li>
            <li className="row">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded bg-black/10"></span>
                <span>AirDrop &amp; Handoff</span>
              </div>
              <span aria-hidden="true" className="text-black/30">
                ›
              </span>
            </li>
            <li className="row">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded bg-black/10"></span>
                <span>Login Items</span>
              </div>
              <span aria-hidden="true" className="text-black/30">
                ›
              </span>
            </li>
            <li className="row">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded bg-black/10"></span>
                <span>Language &amp; Region</span>
              </div>
              <span aria-hidden="true" className="text-black/30">
                ›
              </span>
            </li>
            <li className="row">
              <div className="flex items-center gap-3">
                <span className="h-5 w-5 rounded bg-black/10"></span>
                <span>Time Machine</span>
              </div>
              <span aria-hidden="true" className="text-black/30">
                ›
              </span>
            </li>
            <li className="row">
              <a href="/" className="flex items-center gap-3">
                <span className="h-5 w-5 rounded bg-black/10"></span>
                <span>Return to dashboard</span>
              </a>
              <span aria-hidden="true" className="text-black/30">
                ›
              </span>
            </li>
          </ul>
        </section>
      </div>
    </>
  );

  /* WINDOWS */
  /*
  <div class="grid grid-cols-[240px_1fr]">
            <!-- Left rail -->
            <aside class="bg-[rgb(247,247,247)] border-r border-black/10 text-sm">
              <nav class="py-2">
                <!-- Selected -->
                <div class="px-4 py-2 font-medium rounded-lg mx-2 my-1 bg-blue-600/10 text-blue-700">System</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Bluetooth &amp; devices</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Network &amp; internet</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Personalization</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Apps</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Accounts</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Time &amp; language</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Gaming</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Accessibility</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Privacy &amp; security</div>
                <div class="px-4 py-2 mx-2 my-1 rounded-lg hover:bg-black/5">Windows Update</div>
              </nav>
            </aside>

            <!-- Content -->
            <section class="bg-white">
              <header class="px-6 pt-5">
                <h2 class="text-2xl font-semibold tracking-tight">System</h2>
              </header>

              <!-- Device + meta -->
              <div class="px-6 py-4 flex items-center gap-6 flex-wrap">
                <div class="flex items-center gap-4">
                  <div class="h-12 w-20 rounded-md bg-black/10"></div>
                  <div>
                    <div class="text-sm font-medium">Sergey T</div>
                    <button class="text-xs text-blue-600 hover:underline">Rename</button>
                  </div>
                </div>
                <div class="ml-auto flex items-center gap-4 text-xs">
                  <span class="chip border-black/20 bg-black/5">Microsoft 365</span>
                  <span class="chip border-black/20 bg-black/5">OneDrive</span>
                  <span class="chip border-green-200 bg-green-50 text-green-700">Windows Update</span>
                </div>
              </div>

              <!-- Setting cards -->
              <div class="px-6 pb-6 grid sm:grid-cols-2 gap-3 text-sm">
                <!-- Card -->
                <a class="rounded-xl border border-black/10 p-4 hover:bg-black/5 flex gap-3 items-start" href="#">
                  <div class="h-8 w-8 rounded-md bg-black/10"></div>
                  <div>
                    <div class="font-medium">Display</div>
                    <div class="text-black/60 text-xs">Monitors, brightness, night light, display profile</div>
                  </div>
                </a>

                <a class="rounded-xl border border-black/10 p-4 hover:bg-black/5 flex gap-3 items-start" href="#">
                  <div class="h-8 w-8 rounded-md bg-black/10"></div>
                  <div>
                    <div class="font-medium">Sound</div>
                    <div class="text-black/60 text-xs">Volume levels, output, input, sound devices</div>
                  </div>
                </a>

                <a class="rounded-xl border border-black/10 p-4 hover:bg-black/5 flex gap-3 items-start" href="#">
                  <div class="h-8 w-8 rounded-md bg-black/10"></div>
                  <div>
                    <div class="font-medium">Notifications</div>
                    <div class="text-black/60 text-xs">Alerts from apps and system</div>
                  </div>
                </a>

                <a class="rounded-xl border border-black/10 p-4 hover:bg-black/5 flex gap-3 items-start" href="#">
                  <div class="h-8 w-8 rounded-md bg-black/10"></div>
                  <div>
                    <div class="font-medium">Focus assist</div>
                    <div class="text-black/60 text-xs">Notifications, automatic rules</div>
                  </div>
                </a>

                <a class="rounded-xl border border-black/10 p-4 hover:bg-black/5 flex gap-3 items-start" href="#">
                  <div class="h-8 w-8 rounded-md bg-black/10"></div>
                  <div>
                    <div class="font-medium">Power &amp; battery</div>
                    <div class="text-black/60 text-xs">Sleep, battery usage, battery saver</div>
                  </div>
                </a>

                <a class="rounded-xl border border-black/10 p-4 hover:bg-black/5 flex gap-3 items-start" href="#">
                  <div class="h-8 w-8 rounded-md bg-black/10"></div>
                  <div>
                    <div class="font-medium">Storage</div>
                    <div class="text-black/60 text-xs">Storage spaces, cleanup recommendations</div>
                  </div>
                </a>

                <a class="rounded-xl border border-black/10 p-4 hover:bg-black/5 flex gap-3 items-start" href="#">
                  <div class="h-8 w-8 rounded-md bg-black/10"></div>
                  <div>
                    <div class="font-medium">Nearby sharing</div>
                    <div class="text-black/60 text-xs">Discoverability, received files location</div>
                  </div>
                </a>
              </div>
            </section>
          </div>
  */

  /*
  return (
    <div>
      <h1>Settings</h1>

      <section style={{ marginBottom: 16 }}>
        <h2>Current</h2>
        <pre>{JSON.stringify({ settings, info }, null, 2)}</pre>
      </section>

      <section style={{ marginBottom: 16 }}>
        <h2>Theme</h2>
        <Button
          onClick={() => onToggle('light')}
          disabled={settings?.theme === 'light'}
        >
          Light
        </Button>{' '}
        <Button
          onClick={() => onToggle('dark')}
          disabled={settings?.theme === 'dark'}
        >
          Dark
        </Button>
      </section>

      <section>
        <h2>Open Dialog</h2>
        <Button onClick={onOpenDialog}>Choose file…</Button>
        {dialogRes && <pre>{JSON.stringify(dialogRes, null, 2)}</pre>}
      </section>
    </div>
  );
  */
}
