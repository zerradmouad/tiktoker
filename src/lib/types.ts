export interface TikTokAPIResponse {
  code: number;
  msg: string;
  processed_time: number;
  data: {
    aweme_id: string;
    id: string;
    region: string;
    title: string;
    cover: string;
    origin_cover: string;
    duration: number;
    play: string;
    wmplay: string;
    hdplay: string;
    size: number;
    wm_size: number;
    hd_size: number;
    music: string;
    music_info: {
      id: string;
      title: string;
      play: string;
      cover: string;
      author: string;
      original: boolean;
      duration: number;
      album: string;
    };
    play_count: number;
    digg_count: number;
    comment_count: number;
    share_count: number;
    download_count: number;
    collect_count: number;
    create_time: number;
    author: {
      id: string;
      unique_id: string;
      nickname: string;
      avatar: string;
    };
  };
}

export interface TikTokData {
  apiResponse: TikTokAPIResponse['data'];
  refinedTitle: string;
}
