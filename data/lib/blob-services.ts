const url = "";

const blobURL = "";

export const fetchBlob = async (params: FormData) => {
    const response = await fetch(url + "", {
        method: "POST", 
        body: params
    });

    if(response.ok){
        const fileName = params.get("fileName") as string;

        const uploadedFileURL = `${blobURL}/${fileName}`

        return uploadedFileURL;
    } else{
        return null;
    }
}