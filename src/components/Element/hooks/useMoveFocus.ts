import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setActiveElementId } from "../../../redux/documentSlice";

// 方向键[上，下]移动
export const useMoveFocus = () => {
  const selectedDocId = useSelector(
    (state: RootState) => state.appData.selectedDocId
  );

  const elements = useSelector(
    (state: RootState) => state.document[selectedDocId].elements
  );

  const activeElementId = useSelector(
    (state: RootState) => state.document[selectedDocId].activeElementId
  );

  const dispatch = useDispatch();

  useEffect(() => {
    const activeIndex = elements.findIndex((el) => el.id === activeElementId);

    const moveFocus = (e: KeyboardEvent) => {
      if (e.code === "ArrowUp") {
        if (activeIndex > 0) {
          dispatch(
            setActiveElementId({
              docId: selectedDocId,
              elementId: elements[activeIndex - 1].id,
            })
          );
        }
      } else if (e.code === "ArrowDown") {
        if (activeIndex < elements.length - 1) {
          dispatch(
            setActiveElementId({
              docId: selectedDocId,
              elementId: elements[activeIndex + 1].id,
            })
          );
        }
      }
    };

    document.addEventListener("keydown", moveFocus);

    return () => {
      document.removeEventListener("keydown", moveFocus);
    };
  }, [activeElementId, elements, selectedDocId, dispatch]);
};
