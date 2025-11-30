import { useState } from 'react';
import { useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Copy, Download, ThumbsUp, ThumbsDown, Send } from 'lucide-react';
import { getClientMessages } from '@/fake/fake-data';
import { useQuery } from '@tanstack/react-query';

export default function ChatPage() {

  const { clientId } = useParams();

  const [input, setInput] = useState('');

  const { data: messages = [], isLoading} = useQuery({
    queryKey: ['messages', clientId],
    queryFn: () => getClientMessages(clientId ?? ''),
  })

  if (isLoading) {
    <div
      className="flex-1 flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-t-transparent border-primary animate-spin" />
        <div>
          <div className="text-sm font-medium">Cargando conversación...</div>
          <div className="mt-2 space-y-2">
            <div className="h-3 w-56 bg-muted/30 rounded animate-pulse" />
            <div className="h-3 w-40 bg-muted/30 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  }
 
  return (
    <div className="flex-1 flex flex-col">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center  p-4 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-primary shrink-0" />
          <h2 className="text-2xl font-bold">Welcome to NexTalk!</h2>
          <p className="text-sm text-muted-foreground max-w-md">
            This is your customer support chat. Here, you can communicate
            directly with our support agents to get assistance with your
            inquiries. Feel free to ask questions, report issues, or seek help
            regarding our services.
          </p>
        </div>
      )

      }
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className="w-full">
              {message.sender === 'agent' ? (
                // Agent message - left aligned
                <div className="flex gap-2 max-w-[80%]">
                  <div className="h-8 w-8 rounded-full bg-primary shrink-0" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">NexTalk</span>
                      <span className="text-sm text-muted-foreground">
                        {message.createdAt.toLocaleTimeString()}
                      </span>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // User message - right aligned
                <div className="flex flex-col items-end">
                  <div className="text-right mb-1">
                    <span className="text-sm font-medium mr-2">G5</span>
                    <span className="text-sm text-muted-foreground">
                      {message.createdAt.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="bg-black text-white p-3 rounded-lg max-w-[80%]">
                    <p className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Type a message as a customer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-11 h-11 resize-none py-3"
          />
          <Button className="h-11 px-4 flex items-center gap-2">
            <Send className="h-4 w-4" />
            <span>Send</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
