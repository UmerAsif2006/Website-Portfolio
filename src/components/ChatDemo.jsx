import ChatThread from "./ChatThread";
import { useChat } from "../hooks/useChat";
import { worksSection } from "../data/site";

export default function ChatDemo() {
  const chat = useChat({ greeting: worksSection.chatGreeting });
  return <ChatThread chat={chat} suggestions={worksSection.suggestions} label="Chat agent conversation" />;
}
