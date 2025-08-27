"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowDownToLine, Link, Loader2, Clipboard } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { getTikTokData } from '@/app/actions';
import type { TikTokData } from '@/lib/types';
import { formatBytes } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid TikTok URL.' }),
});

export default function Home() {
  const [result, setResult] = useState<TikTokData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const data = await getTikTokData(values.url);
      setResult(data);
    } catch (error: any) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to fetch TikTok data. Please check the URL and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      form.setValue('url', text);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to read from clipboard.',
      });
    }
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-16">
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          Tiktoker
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Download TikTok videos, photos, and music without watermarks.
        </p>
      </section>

      <Card className="mt-8 shadow-lg">
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <FormControl>
                        <Input
                          placeholder="Paste TikTok link here..."
                          className="pl-10 pr-24 h-12 text-base"
                          {...field}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-9 px-3"
                        onClick={handlePaste}
                      >
                        <Clipboard className="h-4 w-4 mr-2" />
                        Paste
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 text-base font-bold" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Fetching...
                  </>
                ) : (
                  <>
                    <ArrowDownToLine className="mr-2 h-5 w-5" />
                    Download
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {result && (
        <Card className="mt-8 animate-in fade-in slide-in-from-top-10 duration-500">
          <CardHeader>
             <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={result.apiResponse.author.avatar} alt={result.apiResponse.author.nickname} />
                <AvatarFallback>{result.apiResponse.author.nickname.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{result.apiResponse.author.nickname}</CardTitle>
                <CardDescription>@{result.apiResponse.author.unique_id}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm italic">"{result.refinedTitle}"</p>
            
            <div className="rounded-lg overflow-hidden border">
              <video
                controls
                poster={result.apiResponse.cover}
                className="w-full aspect-auto bg-black"
                preload="metadata"
                playsInline
              >
                <source src={result.apiResponse.play} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full h-12 text-base font-bold bg-accent text-accent-foreground hover:bg-accent/90">
                  <ArrowDownToLine className="mr-2 h-5 w-5" />
                  Download Options
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
                {result.apiResponse.hdplay && (
                  <DropdownMenuItem asChild>
                    <a href={result.apiResponse.hdplay} download={`tiktoker_hd_${result.apiResponse.id}.mp4`}>Video (HD) {result.apiResponse.hd_size && ` - ${formatBytes(result.apiResponse.hd_size)}`}</a>
                  </DropdownMenuItem>
                )}
                {result.apiResponse.play && (
                  <DropdownMenuItem asChild>
                     <a href={result.apiResponse.play} download={`tiktoker_nowm_${result.apiResponse.id}.mp4`}>Video (No Watermark) {result.apiResponse.size && ` - ${formatBytes(result.apiResponse.size)}`}</a>
                  </DropdownMenuItem>
                )}
                {result.apiResponse.wmplay && (
                  <DropdownMenuItem asChild>
                     <a href={result.apiResponse.wmplay} download={`tiktoker_wm_${result.apiResponse.id}.mp4`}>Video (With Watermark) {result.apiResponse.wm_size && ` - ${formatBytes(result.apiResponse.wm_size)}`}</a>
                  </DropdownMenuItem>
                )}
                 <Separator />
                {result.apiResponse.music && (
                  <DropdownMenuItem asChild>
                     <a href={result.apiResponse.music} download={`tiktoker_audio_${result.apiResponse.id}.mp3`}>Audio Only (MP3)</a>
                  </DropdownMenuItem>
                )}
                {result.apiResponse.origin_cover && (
                  <DropdownMenuItem asChild>
                     <a href={result.apiResponse.origin_cover} download={`tiktoker_cover_${result.apiResponse.id}.jpeg`}>Cover Image (JPG)</a>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

          </CardContent>
        </Card>
      )}
    </div>
  );
}
