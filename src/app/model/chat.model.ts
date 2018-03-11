import { User } from './user.model';

export interface ChatRoom {
  name: string;
  messages: Array<ChatMessage>;
  members: Array<User>;
  hasUnreadMessage: boolean;
}

export interface ChatRoomData {
  rooms: Array<ChatRoom>;
}

export interface ChatMessage {
  sentBy: User;
  text: string;
}
