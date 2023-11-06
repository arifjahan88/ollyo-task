import { useState } from "react";
import { ImageData } from "./Data/ImageData";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Gallery = () => {
  const [show, setShow] = useState(null);
  const [itemsData, setItemsData] = useState(ImageData);
  const [checkedCount, setCheckedCount] = useState(0);

  //Checkbox Function Start here
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

  //Delete Function Start here
  const handledelete = () => {
    const updatedItemsData = itemsData.filter((item) => !item.checked);
    setItemsData(updatedItemsData);
    setCheckedCount(0);
  };

  //Drag and Drop Function Start here
  const handledraganddrop = (result) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const reorderedItems = [...itemsData];
      const [draggedItem] = reorderedItems.splice(result.source.index, 1);
      reorderedItems.splice(result.destination.index, 0, draggedItem);
      setItemsData(reorderedItems);
    } else {
      // Move an item from one grid to another
      const sourceGrid = itemsData[result.source.droppableId];
      const destinationGrid = itemsData[result.destination.droppableId];

      const sourceItems = [...sourceGrid.items];
      const destinationItems = [...destinationGrid.items];

      const [movedItem] = sourceItems.splice(result.source.index, 1);
      destinationItems.splice(result.destination.index, 0, movedItem);

      // Update the source and destination grids
      sourceGrid.items = sourceItems;
      destinationGrid.items = destinationItems;

      setItemsData({ ...itemsData });
    }
  };

  return (
    <section className="container mx-auto lg:px-20 md:px-10 px-5 mt-10">
      <div className="flex justify-between items-center border-b-2 mb-5">
        {checkedCount > 0 ? (
          <h2 className="text-2xl font-bold text-green-600 mb-3">{checkedCount} Files Selected</h2>
        ) : (
          <h2 className="text-2xl font-bold mb-3">{checkedCount} File Selected</h2>
        )}
        <div onClick={handledelete}>
          {checkedCount > 0 ? (
            <button className="border m-2 font-semibold text-red-600 border-red-600 rounded-xl p-2 px-4 hover:bg-red-500 hover:text-white duration-500 ">
              Delete Selected Files
            </button>
          ) : (
            <button className="border m-2 font-semibold text-red-600 border-red-600 rounded-xl p-2 px-4 hover:bg-red-500 hover:text-white duration-500 pointer-events-none opacity-40">
              Delete Selected File
            </button>
          )}
        </div>
      </div>
      <DragDropContext onDragEnd={handledraganddrop}>
        <Droppable droppableId="GRID">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="grid grid-cols-5 gap-5 justify-items-center">
                {itemsData.map((item, idx) => {
                  return (
                    <Draggable draggableId={item.dnd} key={item.id} index={idx}>
                      {(provided) => (
                        <div
                          onMouseEnter={() => {
                            setShow(item.id);
                          }}
                          onMouseLeave={() => {
                            setShow(null);
                          }}
                          className={`${
                            item.id == 1
                              ? "col-span-2 row-span-2 border rounded-lg relative"
                              : "border shadow-sm rounded-lg relative"
                          } hover:cursor-pointer`}
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          {show == item.id && (
                            <>
                              <div className="bg-black absolute w-full h-full rounded-lg opacity-30"></div>
                            </>
                          )}
                          {item.checked == true && (
                            <div className="bg-blue-200 absolute w-full h-full rounded-lg opacity-30"></div>
                          )}
                          <img
                            src={item.image}
                            className="rounded-lg w-full h-full"
                            alt="gallery"
                          />
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
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </section>
  );
};

export default Gallery;
