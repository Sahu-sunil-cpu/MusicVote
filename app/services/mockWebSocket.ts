import { Song } from '../types';

export const mockWebSocket = () => {
  let connected = false;
  let onConnect: (() => void) | null = null;
  let onDisconnect: (() => void) | null = null;
  let onSongAdded: ((song: Song) => void) | null = null;
  let onSongUpdated: ((song: Song) => void) | null = null;

  const connect = () => {
    setTimeout(() => {
      connected = true;
      onConnect?.();
    }, 1000);
  };

  const disconnect = () => {
    connected = false;
    onDisconnect?.();
  };

  const emit = (event: string, data: any) => {
    if (!connected) return;
    
    switch (event) {
      case 'song:added':
        onSongAdded?.(data);
        break;
      case 'song:updated':
        onSongUpdated?.(data);
        break;
    }
  };

  return {
    connect,
    disconnect,
    emit,
    get connected() { return connected; },
    //@ts-ignore
    set onConnect(handler) { onConnect = handler; },
        //@ts-ignore

    set onDisconnect(handler) { onDisconnect = handler; },
       //@ts-ignore

    set onSongAdded(handler) { onSongAdded = handler; },
    //@ts-ignore

    set onSongUpdated(handler) { onSongUpdated = handler; },
  };
};