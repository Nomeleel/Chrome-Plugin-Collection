const CHROME_SETTING_NOTIFICATION = 'chrome://settings/content/notifications';
const RELOAD_INTERVAL = 1000 * 60 * 5;

window.onload = async () => {
  let dynamicChannel: HTMLAnchorElement = document.querySelector('div.channel-icons > a:nth-child(1)');

  if (!dynamicChannel) return;

  let isGranted = () => Notification.permission === 'granted';

  if (!isGranted()) await requestPermission();

  let badge = document.querySelector('i.channel-notify');

  if (badge) {
    let img: HTMLImageElement = document.querySelector('div.channel-icons > a > div > picture > img');
    if (isGranted()) {
      let notification = new Notification(`鸡汤来喽!!!`, { body: `点击直达`, icon: img.src });
      notification.onclick = () => {
        dynamicChannel.click();
      }
    }
  } else {
    let channel = document.querySelector('div.channel-icons');
    if (isGranted()) {
      channel.insertBefore(document.createTextNode('动态订阅中啦'), dynamicChannel);
    } else {
      let button = document.createElement('a');
      button.appendChild(document.createTextNode('开启通知权限'));
      button.onclick = async () => {
        await requestPermission();
        if (isGranted()) location.reload()
      };
      channel.insertBefore(button, dynamicChannel);
    }

    setTimeout(() => location.reload(), RELOAD_INTERVAL);
  }
}

async function requestPermission() {
  switch (Notification.permission) {
    case 'denied':
      prompt('通知已被禁止，请复制以下地址，从地址栏打开设置面板后尝试手动开启', CHROME_SETTING_NOTIFICATION);
      break;
    case 'default':
      await Notification.requestPermission();
      break;
    default:
      break;
  }
}