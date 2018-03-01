import { User } from './user.model';

export interface ChatRoom {
  id: string;
  name: string;
  messages: Array<ChatMessage>;
  members: Array<User>;
  hasUnreadMessage: boolean;
}

export interface ChatMessage {
  id: string;
  sender: User;
  text: string;
}
