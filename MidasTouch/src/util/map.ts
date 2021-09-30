
function setMap(key: string, value: any, key2?: string, value2?: any, key3?: string, value3?: any, key4?: string, value4?: any): Map<string, any> {
  let map = new Map([
    [key, value],
  ])

  if (key2) map.set(key2, value2);
  if (key3) map.set(key3, value3);
  if (key4) map.set(key4, value4);

  return map;
}

function appendMap(map: Map<string, any>, key: string, value: any, key2?: string, value2?: any, key3?: string, value3?: any, key4?: string, value4?: any): Map<string, any> {
  if(!map) map = new Map<string, any>();
  
  if (key) map.set(key, value);
  if (key2) map.set(key2, value2);
  if (key3) map.set(key3, value3);
  if (key4) map.set(key4, value4);

  return map;
}

export function getAllMap(value: any): Map<string, any> {
  return setMap('all', value);
}

export function getVerticalMap(value: any): Map<string, any> {
  return setMap('vertical', value);
}

export function getHorizontalMap(value: any): Map<string, any> {
  return setMap('horizontal', value);
}

export function getSymmetricMap(vertical: any, horizontal: any): Map<string, any> {
  return setMap('symmetric', setMap('vertical', vertical, 'horizontal', horizontal));
}

export function getOnlyMap(left: any, top: any, right: any, bottom: any): Map<string, any> {
  return setMap('only', setMap('left', left, 'top', top, 'right', right, 'bottom', bottom));
}