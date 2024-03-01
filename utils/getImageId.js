const getImageId = (URL)=>{
    const firstArr = URL.split('/');
    const  imageId = firstArr[firstArr.length - 1].split('.')[0]
    return imageId;
}

export default getImageId;