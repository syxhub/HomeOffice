import { User } from './user.model';

export interface ChatRoom {
  name: string;
  messages: Array<ChatMessage>;
  members: Array<User>;
  hasUnreadMessage: boolean;
}

export interface ChatMessage {
  sender: User;
  text: string;
}
