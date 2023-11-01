import { useState } from "react";
import { ImageData } from "./Data/ImageData";

const Gallery = () => {
  const [show, setShow] = useState(null);
  const [itemsData, setItemsData] = useState(ImageData);
  const [checkedCount, setCheckedCount] = useState(0);

  const handleCheckboxChange = (id) => {
    const updatedItemsData = itemsData.map((item) => {
      if (item.id === id) {
        item.checked = !item.checked;
      }
      return item;
    });

    const newCheckedCount = updatedItemsData.filter((item) => item.checked).length;
    setItemsData(updatedItemsData);
    setCheckedCount(newCheckedCount);
  };

  const handledelete = () => {
    const updatedItemsData = itemsData.filter((item) => !item.checked);
    setItemsData(updatedItemsData);
    setCheckedCount(0);
  };

  return (
    <section className="container mx-auto lg:px-20 md:px-10 px-5 mt-10">
      <div className="flex justify-between border-b-2 mb-5">
        {<h2 className="text-2xl font-semibold mb-3">{checkedCount} Files Selected</h2>}
        <div onClick={handledelete}>
          <h2 className="text-xl font-bold text-red-600 cursor-pointer hover:underline">
            Delete Selected Files
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-5 gap-5 justify-items-center">
        {itemsData.map((item) => {
          return (
            <div
              onMouseEnter={() => {
                setShow(item.id);
              }}
              onMouseLeave={() => {
                setShow(null);
              }}
              key={item.id}
              className={`${
                item.id == 1
                  ? "col-span-2 row-span-2 border-2 rounded-lg relative"
                  : "border-2 rounded-lg relative"
              } hover:cursor-pointer`}
            >
              {show == item.id && (
                <>
                  <div className="bg-black absolute w-full h-full rounded-lg opacity-30"></div>
                </>
              )}
              {item.checked == true && (
                <div className="bg-blue-200 absolute w-full h-full rounded-lg opacity-30"></div>
              )}
              <img src={item.image} className="rounded-lg w-full h-full" alt="gallery" />
              <div>
                <input
                  className="absolute top-5 left-5 scale-150"
                  type="checkbox"
                  name="checkbox"
                  checked={item.checked}
                  onChange={() => handleCheckboxChange(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Gallery;
