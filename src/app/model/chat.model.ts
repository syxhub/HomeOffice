import { User } from './user.model';

export interface ChatRoom {
  members: Array<User>;
  messages: Array<ChatMessage>;
}

export interface ChatRoomData {
  rooms: Array<ChatRoom>;
}

export interface ChatMessage {
  sentBy: string;
  sentAt: number;
  text: string;
}
