"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowDownToLine, Link, Loader2, Clipboard, Video, AudioWaveform, Camera, ShieldCheck, UserCheck, Zap, MonitorPlay, Copy, Download } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { getTikTokData } from '@/app/actions';
import type { TikTokData } from '@/lib/types';
import { formatBytes } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  url: z.string().url({ message: 'Please enter a valid TikTok URL.' }),
});

type DownloadStates = {
  [key: string]: boolean;
};

export default function Home() {
  const [result, setResult] = useState<TikTokData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloading, setDownloading] = useState<DownloadStates>({});
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });
  
  const handleDownload = async (url: string, filename: string) => {
    setDownloading(prev => ({ ...prev, [filename]: true }));
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(objectUrl);
      document.body.removeChild(a);
    } catch (error) {
       console.error('Download error:', error);
       toast({
        variant: 'destructive',
        title: 'Download Failed',
        description: 'Could not download the file. Please try again.',
      });
    } finally {
      setDownloading(prev => ({ ...prev, [filename]: false }));
    }
  };

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
  
  const features = [
    {
      icon: <ShieldCheck className="h-10 w-10 text-primary" />,
      title: "100% Free",
      text: "No hidden fees, subscriptions, or limits. Download unlimited videos without paying a cent.",
    },
    {
      icon: <UserCheck className="h-10 w-10 text-primary" />,
      title: "No Registration",
      text: "Skip the hassle of creating accounts or logging in. Instant access with no personal data required.",
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Lightning Fast",
      text: "Our optimized servers process your requests instantly, delivering videos in seconds, not minutes.",
    },
    {
      icon: <MonitorPlay className="h-10 w-10 text-primary" />,
      title: "HD Quality",
      text: "Download videos in the highest quality available, preserving the original resolution and clarity.",
    },
  ];

  const howItWorksSteps = [
    {
      icon: <Copy className="h-10 w-10 text-primary" />,
      title: "Copy URL",
      text: "Find the TikTok video you want and copy its URL from the address bar or share menu.",
    },
    {
      icon: <Clipboard className="h-10 w-10 text-primary" />,
      title: "Paste URL",
      text: "Paste the copied URL into our downloader input field at the top of this page.",
    },
    {
      icon: <Download className="h-10 w-10 text-primary" />,
      title: "Download",
      text: "Click the download button and your video will be saved directly to your device.",
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
      <section className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">
          Tiktoker
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Download TikTok videos, photos, and music without watermarks.
        </p>
      </section>

      <Card className="mt-8 shadow-lg max-w-2xl mx-auto">
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
        <Card className="mt-8 animate-in fade-in slide-in-from-top-10 duration-500 max-w-md mx-auto">
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
                className="w-full aspect-[9/16] bg-black"
                preload="metadata"
                playsInline
              >
                <source src={result.apiResponse.play} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {result.apiResponse.hdplay && (
                <Button variant="outline" size="sm" className="h-auto py-2 justify-start" onClick={() => handleDownload(result.apiResponse.hdplay, `tiktoker_hd_${result.apiResponse.id}.mp4`)} disabled={downloading[`tiktoker_hd_${result.apiResponse.id}.mp4`]}>
                  {downloading[`tiktoker_hd_${result.apiResponse.id}.mp4`] ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Video className="mr-3 h-5 w-5 text-primary" />}
                  <div>
                    <div className="font-semibold text-sm">Video (HD)</div>
                    <div className="text-xs text-muted-foreground">{result.apiResponse.hd_size && `${formatBytes(result.apiResponse.hd_size)}`}</div>
                  </div>
                  {!downloading[`tiktoker_hd_${result.apiResponse.id}.mp4`] && <ArrowDownToLine className="ml-auto h-4 w-4 text-muted-foreground" />}
                </Button>
              )}
              {result.apiResponse.play && (
                <Button variant="outline" size="sm" className="h-auto py-2 justify-start" onClick={() => handleDownload(result.apiResponse.play, `tiktoker_nowm_${result.apiResponse.id}.mp4`)} disabled={downloading[`tiktoker_nowm_${result.apiResponse.id}.mp4`]}>
                  {downloading[`tiktoker_nowm_${result.apiResponse.id}.mp4`] ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Video className="mr-3 h-5 w-5 text-primary" />}
                  <div>
                    <div className="font-semibold text-sm">Video (No Watermark)</div>
                    <div className="text-xs text-muted-foreground">{result.apiResponse.size && `${formatBytes(result.apiResponse.size)}`}</div>
                  </div>
                   {!downloading[`tiktoker_nowm_${result.apiResponse.id}.mp4`] && <ArrowDownToLine className="ml-auto h-4 w-4 text-muted-foreground" />}
                </Button>
              )}
              {result.apiResponse.wmplay && (
                <Button variant="outline" size="sm" className="h-auto py-2 justify-start" onClick={() => handleDownload(result.apiResponse.wmplay, `tiktoker_wm_${result.apiResponse.id}.mp4`)} disabled={downloading[`tiktoker_wm_${result.apiResponse.id}.mp4`]}>
                  {downloading[`tiktoker_wm_${result.apiResponse.id}.mp4`] ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Video className="mr-3 h-5 w-5 text-primary" />}
                  <div>
                    <div className="font-semibold text-sm">Video (Watermark)</div>
                    <div className="text-xs text-muted-foreground">{result.apiResponse.wm_size && `${formatBytes(result.apiResponse.wm_size)}`}</div>
                  </div>
                   {!downloading[`tiktoker_wm_${result.apiResponse.id}.mp4`] && <ArrowDownToLine className="ml-auto h-4 w-4 text-muted-foreground" />}
                </Button>
              )}
              {result.apiResponse.music && (
                <Button variant="outline" size="sm" className="h-auto py-2 justify-start" onClick={() => handleDownload(result.apiResponse.music, `tiktoker_audio_${result.apiResponse.id}.mp3`)} disabled={downloading[`tiktoker_audio_${result.apiResponse.id}.mp3`]}>
                  {downloading[`tiktoker_audio_${result.apiResponse.id}.mp3`] ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <AudioWaveform className="mr-3 h-5 w-5 text-primary" />}
                  <div>
                    <div className="font-semibold text-sm">Audio Only (MP3)</div>
                    <div className="text-xs text-muted-foreground">Music Track</div>
                  </div>
                   {!downloading[`tiktoker_audio_${result.apiResponse.id}.mp3`] && <ArrowDownToLine className="ml-auto h-4 w-4 text-muted-foreground" />}
                </Button>
              )}
              {result.apiResponse.origin_cover && (
                <Button variant="outline" size="sm" className="h-auto py-2 justify-start" onClick={() => handleDownload(result.apiResponse.origin_cover, `tiktoker_cover_${result.apiResponse.id}.jpeg`)} disabled={downloading[`tiktoker_cover_${result.apiResponse.id}.jpeg`]}>
                  {downloading[`tiktoker_cover_${result.apiResponse.id}.jpeg`] ? <Loader2 className="mr-3 h-5 w-5 animate-spin" /> : <Camera className="mr-3 h-5 w-5 text-primary" />}
                  <div>
                    <div className="font-semibold text-sm">Cover Image (JPG)</div>
                    <div className="text-xs text-muted-foreground">Thumbnail</div>
                  </div>
                   {!downloading[`tiktoker_cover_${result.apiResponse.id}.jpeg`] && <ArrowDownToLine className="ml-auto h-4 w-4 text-muted-foreground" />}
                </Button>
              )}
            </div>

          </CardContent>
        </Card>
      )}

      <section className="mt-16 md:mt-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How It Works</h2>
          <p className="mt-2 text-lg text-muted-foreground">Download TikTok videos in three simple steps.</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {howItWorksSteps.map((step, index) => (
            <Card key={index} className="bg-card/50 dark:bg-card/20 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center flex flex-col items-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  {step.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">{step.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16 md:mt-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Why Choose Us</h2>
          <p className="mt-2 text-lg text-muted-foreground">Powerful Features</p>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 dark:bg-card/20 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6 text-center flex flex-col items-center">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">{feature.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

    </div>
  );
}

    