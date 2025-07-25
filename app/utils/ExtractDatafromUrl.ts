import youtubesearchapi, { GetVideoDetails } from "youtube-search-api";


export const ExtractDatafromUrl = async (YtID: string) =>  {
    //TODO: GIVING
    try{
        console.log(YtID)
        const res = await GetVideoDetails(YtID);

        console.log(res)
    
        const thumbnails = res.thumbnail.thumbnails;
        thumbnails.sort((a: { width: number }, b: { width: number }) => a.width < b.width ? -1 : 1);
    
        const title = res.title;
    
        return {thumbnails, title};
    }catch(error: any) {
      throw Error(error)
    }
  
}

export const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];
  
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
  
    return null;
  };
  
  export const getYouTubeThumbnail = (videoId: string, quality: 'default' | 'medium' | 'high' | 'maxres' = 'maxres'): string => {
    return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
  };
  
  export const getYouTubeEmbedUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
  };