import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteElement } from "../../../redux/documentSlice";

// 如果内容为空
export const useTypeDeleteElement = (
  inputRef: React.RefObject<HTMLTextAreaElement>,
  docId: string,
  elementId: string
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const onDeleteElement = (e: KeyboardEvent) => {
      console.dir(inputRef.current?.selectionStart);
      if (e.code === "Backspace") {
        if (inputRef.current?.value == "") {
          dispatch(deleteElement({ docId: docId, elementId: elementId }));
        }
      }
    };

    document.addEventListener("keydown", onDeleteElement);

    return () => {
      document.removeEventListener("keydown", onDeleteElement);
    };
  }, []);
};
