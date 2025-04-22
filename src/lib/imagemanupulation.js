export async function deleteOldImage(oldImgageUrl){

    const imageUrlArray = oldImgageUrl.split('/');
    console.log(imageUrlArray[imageUrlArray.length-1])
    const imageName = imageUrlArray[imageUrlArray.length-2]+"/"+imageUrlArray[imageUrlArray.length-1]
 
    const image_public_id = imageName.split('.')[0] 
    try {
      let deleteResult = await deleteImage(image_public_id);
      console.log("image delete data", deleteResult);
   } catch (error) {
    console.log(error)
   }
   }