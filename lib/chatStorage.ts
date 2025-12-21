export const saveMessage = (roomId: string, messages: any[]) => {
  localStorage.setItem(`chat_${roomId}`, JSON.stringify(messages));
};

export const loadMessages = (roomId: string) => {
  const raw = localStorage.getItem(`chat_${roomId}`);
  return raw ? JSON.parse(raw) : [];
};
