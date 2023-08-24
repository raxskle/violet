import { useDispatch } from "react-redux";
import { addDocId } from "./appDataSlice";
import { nanoid } from "@reduxjs/toolkit";
import { addDocData } from "./documentSlice";

export const useAddDoc = () => {
  const dispatch = useDispatch();
  return () => {
    const id = nanoid();
    dispatch(addDocId({ docId: id }));
    dispatch(addDocData({ docId: id }));
  };
};
