

export async function Sort(array: any) {

    const sortedArray = array.sort((a: any, b: any) => {
        if (a.isPromoted && !b.isPromoted) return -1;
        if (!a.isPromoted && b.isPromoted) return 1;
        
        const aScore = a.likes - a.dislikes;
        const bScore = b.likes - b.dislikes;
        
        return bScore - aScore;
      });

      return sortedArray;
}