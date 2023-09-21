import React from "react";

export default function TestUploadPic({ gallery, setGallery }) {
  const uploadImage = async (e) => {
    const files = [...e.target.files];
    console.log("file:", files);
    const makeArray = Array.from(files);
    setGallery((prevGallery) => [...prevGallery, ...makeArray]);
  };

  const DeleteImage = (index) => {
    const updateGallery = [...gallery];
    updateGallery.splice(index, 1);
    setGallery(updateGallery);
  };

  return (
    <>
      <article className="grid grid-cols-6 row-auto gap-4">
        {gallery.length > 0 &&
          gallery.map((item, index) => (
            <div key={index} className="relative">
              <img
                src={URL.createObjectURL(item)}
                alt={item.name}
                className="w-40 h-40 rounded-sm"
              />
              <button
                onClick={() => DeleteImage(index)}
                className="absolute top-0 right-0 px-2 text-sm bg-red-500 rounded-full"
              >
                x
              </button>
            </div>
          ))}
        <div
          onClick={() => document.getElementById("multi").click()}
          className="flex items-center justify-center w-40 h-40 bg-gray-300 rounded-sm cursor-pointer"
        >
          <p className="text-orange-500">Upload</p>
          <input
            type="file"
            name="multi"
            id="multi"
            accept="image/*"
            multiple
            className="hidden"
            onChange={uploadImage}
          />
        </div>
      </article>
    </>
  );
}
