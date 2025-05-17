
import React, { useEffect, useState } from 'react';
import { useUser } from '@/context/UserContext';
import { supabase } from '@/integrations/supabase/client';
import { Card } from "@/components/ui/card";
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface ScrapeRecord {
  id: number;
  urls: string[];
  image_count: number;
  created_at: string;
  metadata: any;
}

const ScrapeHistory = () => {
  const { user } = useUser();
  const [history, setHistory] = useState<ScrapeRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user) return;

    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('scrape_history')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        setHistory(data || []);
      } catch (error) {
        console.error('Error fetching scrape history:', error);
        toast.error('Failed to load scrape history');
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();

    // Set up real-time subscription
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'scrape_history'
        },
        async (payload) => {
          if (payload.new && payload.new.user_id === user.id) {
            setHistory(prev => [payload.new as ScrapeRecord, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <Loader className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-gray-500">No scraping history yet.</p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b">
        <p className="text-md">Scrape History</p>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>URLs</TableHead>
              <TableHead className="text-right">Images Found</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {history.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  {new Date(record.created_at).toLocaleString()}
                </TableCell>
                <TableCell>
                  <div className="max-h-20 overflow-y-auto">
                    {record.urls.map((url, idx) => (
                      <div key={idx} className="truncate max-w-xs">
                        {url}
                      </div>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">{record.image_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default ScrapeHistory;
