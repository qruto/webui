function isExternal(url) {
  const currentUrl = new URL(window.location.href);

  try {
    const targetUrl = new URL(url);

    return targetUrl.hostname !== currentUrl.hostname;
  } catch (error) {
    return false;
  }
}

export default function oneOf(values) {
  return function (value) {
    return values.includes(value);
  };
}
