
export const readInfiniteScrollProperty = async(skip)=>{
    try{
        const res = await fetch(
            `http://localhost:8800/property/infinite?skip=${skip}`,
            {
                method:"GET",
                headers:{
                    Accept : "application/json",
                    "Content-Type" : "application/json"
                },
            }
        );
        return await res.json();
    }catch(err){
        throw new Error(err)
    }
}