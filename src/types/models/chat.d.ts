interface Chat {
  _id: string;
  creator: User;
  user: User;
  is_approved: boolean;
  messages: Message[];
}
