export const parseWebSocketMessage = async (event: MessageEvent) => {
  const eventMessageIsBlob = event.data instanceof Blob;

  if (eventMessageIsBlob) {
    const text = await event.data.text();
    return await JSON.parse(text);
  }

  return await JSON.parse(event.data);
};
