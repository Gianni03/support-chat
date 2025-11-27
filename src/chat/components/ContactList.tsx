import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getClients } from '@/fake/fake-data';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router';

export const ContactList = () => {

  const { data: clients, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getClients(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })


  return (
    <ScrollArea className="h-[calc(100vh-64px)]">
      <div className="space-y-4 p-4">
        <div className="space-y-1">
          <h3 className="px-2 text-sm font-semibold">Contacts</h3>
          <div className="space-y-1">

            {isLoading && 
            <>
            <div className='animate-pulse h-4 bg-gray-400 rounded'></div>
            <div className='animate-pulse h-4 bg-gray-300 rounded'></div>
            <div className='animate-pulse h-4 bg-gray-200 rounded'></div>
            <div className='animate-pulse h-4 bg-gray-100 rounded'></div>
            <div className='animate-pulse h-4 bg-gray-400 rounded'></div>
            <div className='animate-pulse h-4 bg-gray-300 rounded'></div>
            <div className='animate-pulse h-4 bg-gray-200 rounded'></div>
            <div className='animate-pulse h-4 bg-gray-100 rounded'></div>
            </>
            }

            {
              clients?.map((client) => (
                <NavLink
                  key={client.id}
                  to={`/chat/${client.id}`}
                  className={({ isActive }) =>
                    `flex items-center px-2 py-1 rounded hover:bg-accent hover:text-accent-foreground ${
                      isActive ? 'bg-accent text-accent-foreground font-medium' : 'text-secondary'
                    }`
                  }
                >
                  <div className="h-6 w-6 rounded-full bg-gray-300 mr-2 shrink-0 flex items-center justify-center text-white text-xs">
                    {client.name.charAt(0)}
                  </div>
                  <span className="text-gray-600">{client.name}</span>
                </NavLink>
              ))} 
            
      
           
           
          </div>
        </div>
        <div className="pt-4 border-t mt-4">
          <h3 className="px-2 text-sm font-semibold mb-1">Recent</h3>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-gray-500 mr-2 shrink-0 flex items-center justify-center text-white text-xs">
              TM
            </div>
            Thomas Miller
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <div className="h-6 w-6 rounded-full bg-red-500 mr-2 shrink-0 flex items-center justify-center text-white text-xs">
              SB
            </div>
            Sarah Brown
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};
